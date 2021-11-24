import redis

_email = {
        "name": "Lucas Blazzi",
        "email": "lucasblazzi@hotmail.com",
        "amount": 51231,
        "products": [{
            "id": "ITSA4.SA", "proportion": 0.51, "amount": 10000
        }]
    }



_message =     {
        "name": "S\u00e3o Carlos",
        "link": "https://www.btgpactualdigital.com/blog/area_de_analises/18622",
        "publication_date": "2021-11-14",
        "category": "A\u00e7\u00f5es",
        "source": "BTG Pactual Digital",
        "ticker": "SCAR3",
        "target_price": 4200.0,
        "segment": "Propriedades",
        "recommendation": "NEUTRO",
        "description": "<strong>Resultado 3T21</strong><br />\r\n<br />\r\n<strong>O FFO foi de R$ 17 milh\u00f5es (-13% a/a), em linha com nossas expectativas</strong><br />\r\n<br />\r\nComo esperado, a S\u00e3o Carlos reportou resultados fracos no 3T21, ficando em linha com nossas estimativas. A receita l\u00edquida totalizou R$ 61 milh\u00f5es (+ 2% a/a; 2% abaixo de nossas proje\u00e7\u00f5es), uma vez que as adi\u00e7\u00f5es de ABL compensaram a maior vac\u00e2ncia no segmento de escrit\u00f3rios. O Ebitda ajustado ficou em R$ 43 milh\u00f5es (-8% a/a; em linha com nossa proje\u00e7\u00e3o) com uma margem de 67% (-770 bps a/a; +130 bps acima de n\u00f3s). O FFO totalizou R$ 17 milh\u00f5es (-13% a/a; correspondendo \u00e0s nossas expectativas) e o LPA foi de R$ 0,30/a\u00e7\u00e3o (exatamente nossa proje\u00e7\u00e3o).<br />\r\n<br />\r\n<strong>Escrit\u00f3rios enfrentam maior vac\u00e2ncia; Best Center continua aumentando as vendas</strong><br />\r\n<br />\r\nVimos resultados mistos nos segmentos de escrit\u00f3rios e varejo (Best Center), mais uma vez, uma vez que: (i) os escrit\u00f3rios registraram um aumento na taxa de vac\u00e2ncia de 410 bps t/t para 26,7%, refletindo o t\u00e9rmino de alugu\u00e9is em alguns edif\u00edcios no Rio; e (ii) Best Center apresentou crescimento de SSS de +9,3% a/a e SSR de +20,0% a/a, enquanto reduzia sua taxa de vac\u00e2ncia para 8,9% (-440 bps a/a; -120 bps t/t). Por outro lado, a empresa est\u00e1 programada para executar os trabalhos de retrofit na propriedade multifamiliar GO850 recentemente adquirida.<br />\r\n<br />\r\n<strong>A S\u00e3o Carlos tem atuado em fus\u00f5es e aquisi\u00e7\u00f5es</strong><br />\r\n<br />\r\nA S\u00e3o Carlos tem se envolvido em muitas fus\u00f5es e aquisi\u00e7\u00f5es no setor recentemente, incluindo outros segmentos al\u00e9m de edif\u00edcios de escrit\u00f3rios: (i) em julho, a S\u00e3o Carlos comprou um im\u00f3vel multifamiliar; e (ii) em agosto, adquiriu um grande portf\u00f3lio de varejo. Essas fus\u00f5es e aquisi\u00e7\u00f5es t\u00eam sido cumulativas para a empresa e marcam sua entrada em novos mercados, que consideramos positivos para a empresa.<br />\r\n<br />\r\n<strong>O 3T21 foi quase sem intercorr\u00eancias; Classifica\u00e7\u00e3o neutra (22x P/FFO 2022E)</strong><br />\r\n<br />\r\nEm nossa opini\u00e3o, os resultados trimestrais ficaram em linha com as expectativas (o Ebitda e o FFO ajustados foram semelhantes \u00e0s nossas proje\u00e7\u00f5es e a vac\u00e2ncia de escrit\u00f3rios manteve-se elevada, conforme o esperado). Portanto, esperamos uma rea\u00e7\u00e3o neutra do mercado aos resultados do 3T21 e mantemos nosso rating Neutro sobre as a\u00e7\u00f5es devido \u00e0 falta de din\u00e2mica de curto prazo (baixa demanda por escrit\u00f3rios e aumento das taxas de juros) e os m\u00faltiplos de avalia\u00e7\u00e3o um tanto elevados (negociando a 22x P/FFO 2022E).",
        "dividend_yield": 0.9333755373954773,
        "mean_daily_return": -0.006919365841895342,
        "mean_daily_volume": 10781.8564453125,
        "forecast12m": 0.41999998688697815,
        "return12m": -6.688549518585205,
        "price": 36.5
    }

def sender():
    # emails = list()
    client = redis.Redis(host="localhost", port=6379)
    # cur = b'0'
    x = client.get("user:lucasblazzi@hotmail.com")
    print(x)
    # keys = client.scan(cur, match='user:*')
    # if keys:
    #     print(keys)
    #     emails.append(keys[0].decode().split(":")[-1])
    # print(emails)
    # client.xadd("products", _message)
    # print(client.xread({"products": '$'}, count=1, block=0))


# sender()
import json
from json import JSONEncoder
def sender_email():
    client = redis.Redis(host="localhost", port=6379)
    for k, v in _email.items():
        if isinstance(v, list):
            _email[k] = str(v)
    client.xadd("portfolio", _email)

sender()