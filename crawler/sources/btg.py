import requests


categories = {
    "347": ("Ações", "stock_rt_builder"),
    "348": ("Fundos Imobiliários", "stock_rt_builder")
}


def parse_products(products: list, category) -> list:
    _products = list()
    for product in products:
        info = product.get("acf", {})
        alvo = info.get("preco_alvo")
        if alvo == "Em revisão":
            continue
        _product = {
            "Nome": info.get("nome_da_empresa", ""),
            "category": category[0],
            "category_builder": category[1],
            "ticker": info.get("nome_do_papel", ""),
            "Informações": f"https://www.btgpactualdigital.com{product.get('link', '')}",
            "Recomendação": info.get("avaliacao_btg_pactual", ""),
            "Preço Alvo": alvo if alvo else "0",
            "segmento": info.get("segmento", ""),
            "data_de_publicacao": info.get("data_de_publicacao", ""),
            "analise": info.get("analise", ""),
            "arquivo": f"https://www.btgpactualdigital.com{info.get('download_de_arquivo', '')}",
            "source": "BTG Pactual Digital"
        }
        _products.append(_product)
    return _products


def category_btg(path):
    url = f"https://www.btgpactualdigital.com/wp-json/wp/v2/area_de_analises?per_page=10&categorias_de_analise={path}"
    products = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}).json()
    _products = parse_products(products, categories[path])
    return _products


def full_btg():
    products = list()
    for path, category in categories.items():
        products.extend(category_btg(path))
    return products
