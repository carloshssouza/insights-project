

def build_dashboard(products, portfolio, close):
    return {
        "products": {
            "series": [
                {"name": "Cumulative Return", "values": products.cumulative_returns().to_dict(orient="records")},
                {"name": "Drawdown", "values": products.drawdown().to_dict(orient="records")},
                {"name": "Wealth Index", "values": products.wealth_index().to_dict(orient="records")},
                {"name": "Return", "values": products.returns().to_dict(orient="records")},
                {"name": "Correlation", "values": products.correlation().to_dict(orient="records")},
            ],
            "simple": []
        },
        "portfolio": {
            "series": [
                {"name": "Cumulative Return", "values": portfolio.cumulative_returns().to_dict(orient="records")},
                {"name": "Wealth Index", "values": portfolio.wealth_index().to_dict(orient="records")},
                {"name": "Return", "values": portfolio.returns().to_dict(orient="records")},
                {"name": "Drawdown", "values": portfolio.drawdown().to_dict(orient="records")},
                {"name": "Drawdown", "values": portfolio.drawdown().to_dict(orient="records")},
            ],
            "simple": [
                {"name": "Total Return", "value": portfolio.total_returns()},
                {"name": "Volatility", "value": portfolio.volatility()},
                {"name": "Maximum Drawdown", "value": portfolio.min()},
                {"name": "Annualized Return", "value": portfolio.annualized_returns()},
                {"name": "Annualized Volatility", "value": portfolio.annualized_volatility()},
                {"name": "Sharpe", "value": portfolio.sharpe()},
            ]
        },
    }