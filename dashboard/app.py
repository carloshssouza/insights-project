from charts import line_scatter, indicators, area_chart, bar_chart, correlation_matrix, efficient_frontier_plot
import streamlit as st
import pandas as pd
import requests
import ast

st.set_page_config(layout='wide')


def dashboard(results):
    st.title("Portfolio Management")
    portfolio = results["portfolio"]
    products = results["products"]
    close = pd.DataFrame(get_metric(products["series"], "Close Prices"))
    cum_ret = pd.DataFrame(get_metric(products["series"], "Cumulative Return"))
    products_dd = pd.DataFrame(get_metric(products["series"], "Drawdown"))
    portfolio_corr = pd.DataFrame(get_metric(products["series"], "Correlation"))
    products_wi = pd.DataFrame(get_metric(products["series"], "Wealth Index"))
    products_ret = pd.DataFrame(get_metric(products["series"], "Daily Returns"))

    portfolio_ret = pd.DataFrame(get_metric(portfolio["series"], "Daily Returns").items(),
                                 columns=["date", "Portfolio"]).set_index("date")
    portfolio_cum_ret = pd.DataFrame(get_metric(portfolio["series"], "Cumulative Return").items(),
                                 columns=["date", "Portfolio"]).set_index("date")
    portfolio_dd = pd.DataFrame(get_metric(portfolio["series"], "Drawdown").items(),
                                 columns=["date", "Portfolio"]).set_index("date")
    portfolio_wi = pd.DataFrame(get_metric(portfolio["series"], "Wealth Index").items(),
                                 columns=["date", "Portfolio"]).set_index("date")

    portfolio_total_rets = get_simple_metric(portfolio["simple"], "Total Return")
    portfolio_vol = get_simple_metric(portfolio["simple"], "Volatility")
    portfolio_annualized_rets = get_simple_metric(portfolio["simple"], "Annualized Return")
    portfolio_annualized_vol = get_simple_metric(portfolio["simple"], "Annualized Volatility")
    portfolio_max_dd = get_simple_metric(portfolio["simple"], "Maximum Drawdown")
    portfolio_shp = get_simple_metric(portfolio["simple"], "Sharpe")

    portfolio_ef = get_metric(portfolio["series"], "Efficient Frontier")
    portfolio_ef["Efficient Frontier (EF)"] = pd.DataFrame(portfolio_ef["Efficient Frontier (EF)"])
    portfolio_ef["Capital Market Line (CML)"] = pd.DataFrame(portfolio_ef["Capital Market Line (CML)"])
    portfolio_ef["Equally Weighted (EW)"] = pd.DataFrame(portfolio_ef["Equally Weighted (EW)"])
    st.markdown("<hr>", unsafe_allow_html=True)
    st.header("Basic Portfolio Time Series Measures")
    g_cols = st.beta_columns(2)
    g_cols[0].plotly_chart(line_scatter(close, close.columns, "Close Prices"), use_container_width=True)
    g_cols[1].plotly_chart(line_scatter(cum_ret*100, cum_ret.columns, "Cumulative Returns"), use_container_width=True)
    g_cols[0].plotly_chart(bar_chart(portfolio_ret*100, [0], "Portfolio Daily Returns"), use_container_width=True)
    g_cols[1].plotly_chart(line_scatter(portfolio_cum_ret*100, [0], "Portfolio Cumulative Returns"), use_container_width=True)
    g_cols[0].plotly_chart(area_chart(portfolio_dd*100, [0], "Portfolio Drawdown"), use_container_width=True)
    g_cols[1].plotly_chart(area_chart(products_dd*100, products_dd.columns, "Assets Drawdown"), use_container_width=True)
    g_cols[0].plotly_chart(correlation_matrix(portfolio_corr), use_container_width=True)
    g_cols[0].plotly_chart(line_scatter(portfolio_wi, [0], "Portfolio Wealth Index"), use_container_width=True)
    g_cols[1].plotly_chart(line_scatter(products_wi, products_wi.columns, "Assets Wealth Index"), use_container_width=True)
    g_cols[1].plotly_chart(bar_chart(products_ret*100, products_ret.columns, "Products Daily Returns"), use_container_width=True)

    st.markdown("<hr>", unsafe_allow_html=True)
    st.header("Basic Portfolio Macro Measures")
    info_cols = st.beta_columns(6)
    info_cols[0].plotly_chart(indicators(portfolio_total_rets, title="Total Return"), use_container_width=True)
    info_cols[1].plotly_chart(indicators(portfolio_vol, title="Volatility"), use_container_width=True)
    info_cols[2].plotly_chart(indicators(portfolio_annualized_rets, title="Annualized Return"), use_container_width=True)
    info_cols[3].plotly_chart(indicators(portfolio_annualized_vol, title="Annualized Volatility"), use_container_width=True)
    info_cols[4].plotly_chart(indicators(portfolio_max_dd, title="Maximum Drawdown"), use_container_width=True)
    info_cols[5].plotly_chart(indicators(portfolio_shp, title="Sharpe", suffix=""), use_container_width=True)

    st.markdown("<hr>", unsafe_allow_html=True)
    st.header("Markowitz Portfolio Analysis")
    st.plotly_chart(efficient_frontier_plot(portfolio_ef), use_container_width=True)

    for k, v in portfolio_ef.items():
        if isinstance(v, list):
            comp = [f"{ticker}: {round(weight * 100, 2)}%" for ticker, weight in zip(_ids, v)]
            st.markdown(f"**{k} -** {comp}")


def get_simple_metric(obj, name):
    return float(next((sub for sub in obj if sub["name"] == name), None)["value"])


def get_metric(obj, name):
    return ast.literal_eval(next((sub for sub in obj if sub["name"] == name), None)["values"])


def dashboard_compose():
    if query_params:
        body = {"id": int(query_params["id"]),
                "start_date": query_params["startDate"],
                "end_date": query_params["endDate"]}
        st.write(body)
        results = requests.post("http://localhost:5004/portfolio/metrics", json=body).json()
        if results:
            dashboard(results)
        else:
            st.error("Portfolio not found")
    else:
        st.warning("Input information is required!")


query_params = {k: v[0] for k, v in st.experimental_get_query_params().items()}
st.write(query_params)
dashboard_compose()