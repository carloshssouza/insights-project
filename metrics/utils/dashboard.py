

def build_dashboard(products, portfolio, close):
    return {
        "products": {
            "series": [
                {"name": "Close Prices", "values": str(close.to_dict())},
                {"name": "Cumulative Return", "values": str(products.cumulative_returns().to_dict())},
                {"name": "Drawdown", "values": str(products.drawdown().to_dict())},
                {"name": "Wealth Index", "values": str(products.wealth_index().to_dict())},
                {"name": "Daily Returns", "values": str(products.returns().to_dict())},
                {"name": "Correlation", "values": str(products.correlation().to_dict())},
            ],
            "simple": []
        },
        "portfolio": {
            "series": [
                {"name": "Cumulative Return", "values": str(portfolio.cumulative_returns().to_dict())},
                {"name": "Efficient Frontier", "values": str(portfolio.efficient_frontier())},
                {"name": "Wealth Index", "values": str(portfolio.wealth_index().to_dict())},
                {"name": "Daily Returns", "values": str(portfolio.returns().to_dict())},
                {"name": "Drawdown", "values": str(portfolio.drawdown().to_dict())},
            ],
            "simple": [
                {"name": "Total Return", "value": portfolio.total_returns().iloc[-1]},
                {"name": "Volatility", "value": portfolio.volatility()},
                {"name": "Maximum Drawdown", "value": portfolio.drawdown().min()},
                {"name": "Annualized Return", "value": portfolio.annualized_returns().iloc[-1]},
                {"name": "Annualized Volatility", "value": portfolio.annualized_volatility()},
                {"name": "Sharpe", "value": portfolio.sharpe().iloc[-1]},
            ]
        },
    }