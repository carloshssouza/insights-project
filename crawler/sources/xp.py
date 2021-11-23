import requests
from bs4 import BeautifulSoup, Tag


categories = {
    "ativos_coe": ("COE", "coe_builder"),
    "ativos_acoes_fund": ("Ações", "stock_rt_builder"),
    "ativos_fund_imob": ("Fundos Imobiliários", "stock_rt_builder"),
    "renda_fixa_ativos_credito_privado,renda_fixa_ativos_bancarios,renda_fixa_ativos_tesouro_direto": ("Renda Fixa", "fixed_income_builder"),
    "ativos_fund_invest": ("Fundos de Investimento", "investment_fund_builder"),
    "ativos_prev_privada": ("Previdência Privada", "pension_fund_builder")
}


def category_xp(target: str) -> list:
    url = f"https://conteudos.xpi.com.br/wp-json/xpinsights/v2/filtrar-conteudo?filter-function=xpinsights_default_" \
          f"destaques_ativos_filter&destaque={target}&box=Produtos&multiauthors=true"
    page = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})

    soup = BeautifulSoup(page.json()["html"], 'html.parser')
    products = soup.find_all("div", {"class": "box-produtos"})

    _products = []
    for product in products:
        _product = {}
        for dado in product.ul:
            if isinstance(dado, Tag):
                data = dado.text.replace("  ", "").strip().split("\n")
                parsed_data = list(filter(None, data))
                _product[parsed_data[0]] = parsed_data[1]
            else:
                continue
        _product["ticker"] = product.h4.text if categories[target][0] != "Fundos Imobiliários" \
            else product.h4.text.split("-")[1].strip()
        _product["Nome"] = f"{_product['ticker']}"
        _product["Informações"] = product.a["href"]
        _product["category_builder"] = categories[target][1]
        _product["category"] = categories[target][0]
        _product["source"] = "XP Investimentos"
        _products.append(_product)
    return _products


def full_xp() -> list:
    products = list()
    for path, category in categories.items():
        products.extend(category_xp(path))
    return products
