import re
from datetime import date
from re import sub


class Product:
    def __init__(self, product):
        self.product = product

    @property
    def compose_product(self):
        builder = self.product["category_builder"]
        base = {
            "category_builder": builder,
            "name": str(self.product.get("Nome", "")),
            "link": str(self.product.get("Informações", "")),
            "publication_date": date.today().strftime("%Y-%m-%d"),
            "category": str(self.product.get("category")),
            "source": str(self.product.get("source"))
        }
        return getattr(self, builder)(base)

    def coe_builder(self, base):
        coe = {
            "strategy": str(self.product.get("Estratégia")),
            "deadline": int(re.findall(r'\d+', self.product.get("Reserve até", "0"))[0]),
            "classification": str(self.product.get("Classificação", "")),
            "description": str(self.product.get("Rentabilidade", "")),
        }
        return base | coe

    def stock_rt_builder(self, base):
        target_price = sub(r'[^\d,]', '', self.product.get("Preço Alvo", "-1"))
        stock = {
            "ticker": str(self.product.get("ticker", "")),
            "target_price": float(target_price.replace(",", ".")) if isinstance(target_price, str)
                                                                     and target_price != "N/D" else -1,
            "segment": str(self.product.get("segmento", "")),
            "recommendation": str(self.product.get("Recomendação", "").upper()),
            "description": str(self.product.get("analise", "")),
        }
        return base | stock

    def fixed_income_builder(self, base):
        fixed_income = self.product
        return base | fixed_income

    def investment_fund_builder(self, base):
        min_app = sub(r'[^\d,]', '', self.product.get("Aplic. Mín.", "-1"))
        month_ret = sub(r'[^\d,]', '', self.product.get("Rent. Mês", "-1"))
        investment_fund = {
            "min_application": float(min_app.replace(".", "").replace(",", ".")) if min_app and min_app != "N/D" else -1,
            "adm_tax": float(sub(r'[^\d.]', '', self.product.get("Taxa Adm. (a.a.)").replace(",", "."))),
            "redemption": self.product.get("Cotização de Resgate"),
            "classification": str(self.product.get("Classificação XP")),
            "month_return": float(month_ret.replace(",", ".")) if month_ret and month_ret != "N/D" else -1,
        }
        return base | investment_fund

    def pension_fund_builder(self, base):
        month_ret = self.product.get("Rent. Mês").replace(",", ".")
        adm_tax = sub(r'[^\d,]', '', self.product.get("Taxa Adm.", "-1"))
        min_app = sub(r'[^\d,]', '', self.product.get("Aplic. Mín.", "-1"))
        pension_fund = {
            "min_application": float(min_app.replace(".", "").replace(",", ".")) if min_app and min_app != "N/D" else -1,
            "adm_tax": float(adm_tax.replace(",", ".")) if adm_tax and adm_tax != "N/D" else -1,
            "month_return": float(sub(r'[^\d,]', '', month_ret)) if month_ret and month_ret != "N/D" else -1,
        }
        return base | pension_fund

