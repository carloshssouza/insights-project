import plotly.graph_objects as go
import pandas as pd
import plotly.express as px
import plotly.figure_factory as ff


def line_scatter(df, cols, title):
    fig = go.Figure()
    if isinstance(df, pd.Series):
        df = df.to_frame()

    for i, col in enumerate(cols):
        fig.add_trace(go.Scatter(x=df.index, y=df[col],
                                 mode='lines',
                                 name=col,
                                 marker_color=px.colors.sequential.Viridis[i]))

    fig.update_layout(
        hovermode="x unified",
        height=500,
        title=f"<b>{title}</b>",
        title_x=0.5
    )
    return fig


def area_chart(df, cols, title):
    fig = go.Figure()
    if isinstance(df, pd.Series):
        df = df.to_frame()

    for i, col in enumerate(cols):
        fig.add_trace(go.Scatter(x=df.index, y=df[col],
                                 mode='lines',
                                 name=col,
                                 fill='tozeroy',
                                 marker_color=px.colors.sequential.Viridis[i]))

    fig.update_layout(
        hovermode="x unified",
        height=500,
        title=f"<b>{title}</b>",
        title_x=0.5
    )
    return fig


def bar_chart(df, cols, title):
    fig = go.Figure()
    if isinstance(df, pd.Series):
        df = df.to_frame()

    for i, col in enumerate(cols):
        fig.add_trace(go.Bar(x=df.index, y=df[col],
                             name=col,
                             marker_color=px.colors.sequential.Viridis[i]))

    fig.update_layout(
        height=500,
        title=f"<b>{title}</b>",
        title_x=0.5
    )
    return fig


def indicators(df, col=0, title="", suffix="%"):
    fig = go.Figure()
    multiplier = 100 if suffix == "%" else 1
    format_val = ".2f" if suffix == "%" else ".4f"
    if isinstance(df, pd.DataFrame):
        value = df[col].values[0] * multiplier
    elif isinstance(df, pd.Series):
        value = df[col] * multiplier
    else:
        value = df * multiplier

    fig.add_trace(go.Indicator(
        mode="number",
        number={
            "font": {"size": 40},
            "suffix": suffix,
            "valueformat": format_val
        },
        value=value,
        title={"text": f"<span style='font-size:1.8em;color:black'><b>{title}</b></span>"}
    ))
    fig.update_layout(
        height=300,
    )
    return fig


def correlation_matrix(df, title="Asset Correlation"):
    values = df.round(2).values.tolist()[::-1]
    cols = df.columns.tolist()
    fig = ff.create_annotated_heatmap(values, x=cols, y=cols[::-1], annotation_text=values, colorscale='Viridis')

    fig.update_layout(
        height=500,
        title=f"<b>{title}</b>",
        title_x=0.5,
    )
    return fig


def efficient_frontier_plot(data):
    fig = go.Figure()
    idx = 0
    colors = ["#3CAEA3", "#20639B", "#FDBA21", "#E63946"]
    for name, df in data.items():
        if isinstance(df, pd.DataFrame):
            df = df * 100
            marker_size = 10 if df.shape[0] < 2 else 5
            fig.add_trace(go.Scatter(x=df["Volatility"], y=df["Returns"],
                                     mode='lines+markers',
                                     marker=dict(size=marker_size, color=colors[idx]),
                                     name=name,
                                     hovertemplate=
                                     '<b>Volatility (%): </b> %{x:.4f}' +
                                     '<br><b>Return (%): </b> %{y:.4f}<extra></extra>'
                                     ))
            idx += 1

    fig.update_layout(
        hovermode="y unified",
        height=600,
        title="<b>Markowitz Efficient Frontier</b>",
        title_x=0.5,
        xaxis_title="Volatility",
        yaxis_title="Return"
    )
    fig.update_yaxes(rangemode="tozero")
    fig.update_xaxes(rangemode="tozero")
    return fig