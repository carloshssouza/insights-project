

def build_dashboard(products, portfolio, close):
    return {
        "products": {
            "series": [
                {"Cumulative Return": products.cumulative_returns().to_dict(orient="records")},
                {"Drawdown": products.drawdown().to_dict(orient="records")},
                {"Wealth Index": products.wealth_index().to_dict(orient="records")},
                {"Return": products.returns().to_dict(orient="records")},
                {"Correlation": products.correlation().to_dict(orient="records")},
            ],
            "simple": []
        },
        "portfolio": {
            "series": [
                {"Cumulative Return": portfolio.cumulative_returns().to_dict(orient="records")},
                {"Wealth Index": portfolio.wealth_index().to_dict(orient="records")},
                {"Return": portfolio.returns().to_dict(orient="records")},
                {"Drawdown": portfolio.drawdown().to_dict(orient="records")},
                {"Drawdown": portfolio.drawdown().to_dict(orient="records")},
            ],
            "simple": [
                {"Total Return": portfolio.total_returns()},
                {"Volatility": portfolio.volatility()},
                {"Maximum Drawdown": portfolio.min()},
                {"Annualized Return": portfolio.annualized_returns()},
                {"Annualized Volatility": portfolio.annualized_volatility()},
                {"Sharpe": portfolio.sharpe()},
            ]
        },
    }