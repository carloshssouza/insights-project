import React, { useState } from 'react';
import './styles.css';
import '../../App.css';
import Select from 'react-select';
import verificationForm from '../../funcHolders';

const MainPage = () => {
  const [stocks, setStocks] = useState(false);
  const [realStateFunds, setRealStateFunds] = useState(false);
  const [coe, setCoe] = useState(false);
  const [investmentFunds, setinvestmentFunds] = useState(false);
  const [pensionFunds, setPensionFunds] = useState(false);

  const [email, setEmail] = useState(null);

  const [response, setResponse] = useState('');

  function handleChangeStocks({ target }) {
    if (target.checked) {
      setStocks(true);
    } else {
      setStocks(false);
    }
  }

  function handleChangeRealStateFunds({ target }) {
    if (target.checked) {
      setRealStateFunds(true);
    } else {
      setRealStateFunds(false);
    }
  }

  function handleChangeCoe({ target }) {
    if (target.checked) {
      setCoe(true);
    } else {
      setCoe(false);
    }
  }

  function handleChangeinvestmentFunds({ target }) {
    if (target.checked) {
      setinvestmentFunds(true);
    } else {
      setinvestmentFunds(false);
    }
  }

  function handleChangePensionFunds({ target }) {
    if (target.checked) {
      setPensionFunds(true);
    } else {
      setPensionFunds(false);
    }
  }

  //stocks
  const [segment, setSegment] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [twelvemin, setTwelvemin] = useState(null);
  const [twelvemax, setTwelvemax] = useState(null);
  const [dividendYieldmin, setDividendYieldmin] = useState(null);
  const [dividendYieldmax, setDividendYieldmax] = useState(null);
  const [pricemin, setPricemin] = useState(null);
  const [pricemax, setPricemax] = useState(null);

  //real state founds
  const [segmentRSF, setSegmentRSF] = useState(null);
  const [twelveminRSF, setTwelveminRSF] = useState(null);
  const [twelvemaxRSF, setTwelvemaxRSF] = useState(null);
  const [dividendYieldminRSF, setDividendYieldminRSF] = useState(null);
  const [dividendYieldmaxRSF, setDividendYieldmaxRSF] = useState(null);
  const [priceminRSF, setPriceminRSF] = useState(null);
  const [pricemaxRSF, setPricemaxRSF] = useState(null);

  //coe
  const [strategy, setStrategy] = useState(null);
  const [classification, setClassification] = useState(null);
  const [deadlinemin, setDeadlinemin] = useState(null);
  const [deadlinemax, setDeadlinemax] = useState(null);

  //investiment funds
  const [applicationminIF, setApplicationminIF] = useState(null);
  const [applicationmaxIF, setApplicationmaxIF] = useState(null);
  const [admTaxminIF, setAdmTaxminIF] = useState(null);
  const [admTaxmaxIF, setAdmTaxmaxIF] = useState(null);
  const [monthReturnminIF, setMonthReturnminIF] = useState(null);
  const [monthReturnmaxIF, setMonthReturnmaxIF] = useState(null);
  const [classificationIF, setClassificationIF] = useState(null);

  //pension funds
  const [applicationminPF, setApplicationminPF] = useState(null);
  const [applicationmaxPF, setApplicationmaxPF] = useState(null);
  const [admTaxminPF, setAdmTaxminPF] = useState(null);
  const [admTaxmaxPF, setAdmTaxmaxPF] = useState(null);
  const [monthReturnminPF, setMonthReturnminPF] = useState(null);
  const [monthReturnmaxPF, setMonthReturnmaxPF] = useState(null);

  //object
  const form = {
    email: email,
    stocks: {
      segment: segment,
      recommendation: recommendation,
      return12m_min: twelvemin,
      return12m_max: twelvemax,
      dividend_yield_min: dividendYieldmin,
      dividend_yield_max: dividendYieldmax,
      price_min: pricemin,
      price_max: pricemax,
    },
    realStateFunds: {
      segment: segmentRSF,
      return12m_min: twelveminRSF,
      return12m_max: twelvemaxRSF,
      dividend_yield_min: dividendYieldminRSF,
      dividend_yield_max: dividendYieldmaxRSF,
      price_min: priceminRSF,
      price_max: pricemaxRSF,
    },
    coe: {
      strategy: strategy,
      classification: classification,
      deadline_min: deadlinemin,
      deadline_max: deadlinemax,
    },
    investmentFunds: {
      min_application_min: applicationminIF,
      min_application_max: applicationmaxIF,
      adm_tax_min: admTaxminIF,
      adm_tax_max: admTaxmaxIF,
      classification: classificationIF,
      month_return_min: monthReturnminIF,
      month_return_max: monthReturnmaxIF,
    },
    pensionFunds: {
      min_application_min: applicationminPF,
      min_application_max: applicationmaxPF,
      adm_tax_min: admTaxminPF,
      adm_tax_max: admTaxmaxPF,
      month_return_min: monthReturnminPF,
      month_return_max: monthReturnmaxPF,
    },
  };

  verificationForm(
    form,
    stocks,
    realStateFunds,
    coe,
    investmentFunds,
    pensionFunds
  );

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);

    fetch('http://localhost:8000/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((json) => setResponse(json.message));
  }

  const segmentStocks = [
    { value: 'Propriedades', label: 'Propriedades' },
    { value: 'Telecom & Tech', label: 'Tecnologia' },
    { value: 'Agronegócio', label: 'Agronegócio' },
    { value: 'Saúde', label: 'Saúde' },
    { value: 'Serviços Básicos', label: 'Serviços Básicos' },
    { value: 'Construção Civil', label: 'Construção Civil' },
    { value: 'Varejo', label: 'Varejo' },
    { value: 'Papel & Celulose', label: 'Papel & Celulose' },
    { value: 'Transporte & Logística', label: 'Transporte & Logística' },
  ];

  const recommendationStocks = [
    { value: 'COMPRA', label: 'Compra' },
    { value: 'VENDA', label: 'Venda' },
    { value: 'NEUTRO', label: 'Neutro' },
  ];

  const segmentRSFRSF = [
    { value: 'Lajes Corporativas', label: 'Lajes Corporativas' },
    {
      value: 'Títulos e Valores Mobiliários',
      label: 'Títulos e Valores Mobiliários',
    },
    { value: 'Logístico', label: 'Logístico' },
    { value: 'Shoppings', label: 'Shoppings' },
    { value: 'Híbrido', label: 'Híbrido' },
    { value: 'Outros', label: 'Outros' },
  ];

  const strategyCOE = [
    { value: 'Participação', label: 'Participação' },
    { value: 'Autocallable', label: 'Autocallable' },
  ];

  const classificationCOE = [
    { value: 'Rating AAA(bra)', label: 'Rating AAA(bra)' },
    { value: 'Rating AA(bra)', label: 'Rating AA(bra)' },
    { value: 'Rating A(bra)', label: 'Rating A(bra)' },
  ];

  const classificationIFIF = [
    { value: 'Multiestratégia', label: 'Multiestratégia' },
    { value: 'Crédito High Grade', label: 'Crédito High Grade' },
    { value: 'Quantitativo', label: 'Quantitativo' },
    {
      value: 'Renda Variável Long Only Livre',
      label: 'Renda Variável Long Only Livre',
    },
    { value: 'Macro Média Vol', label: 'Macro Média Vol' },
    { value: 'Macro Alta Vol', label: 'Macro Alta Vol' },
    { value: 'Crédito High Yield', label: 'Crédito High Yield' },
    {
      value: 'Debêntures Incentivadas Não Hedgeado',
      label: 'Debêntures Incentivadas Não Hedgeado',
    },
  ];

  return (
    <div className="div-main-page">
      <form className="form-main-page animeLeft" onSubmit={handleSubmit}>
        <h1 className="title-main-page">Registrar Informações</h1>

        <label for="email">
          <span className="span-main-page">Digite seu email:</span>
        </label>
        <input
          className="input-main-page"
          type="email"
          required
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <span className="span-main-page">Opções de investimento:</span>
        <label className="label-checkbox-main-page">
          <input
            className="checkbox-main-page"
            type="checkbox"
            onChange={handleChangeStocks}
          />
          <span className="checkbox-main-page">Ações</span>
        </label>

        {stocks && (
          <div className="div-true-main-page animeLeft">
            <span className="input-true-main-page">Segmento</span>
            <Select
              isMulti
              name="segment"
              options={segmentStocks}
              value={segment}
              classNamePrefix="select"
              onChange={setSegment}
            />

            <span className="input-true-main-page">Recomendação</span>
            <Select
              isMulti
              name="recommendation"
              options={recommendationStocks}
              value={recommendation}
              classNamePrefix="select"
              onChange={setRecommendation}
            />

            <label htmlFor="twelvemin">
              <span className="input-true-main-page">
                Retorno Mínimo (12 meses)
              </span>
            </label>
            <input
              id="twelvemin"
              name="twelvemin"
              type="number"
              value={twelvemin}
              onChange={(event) => setTwelvemin(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="twelvemax">
              <span className="input-true-main-page">
                Retorno Máximo (12 meses)
              </span>
            </label>
            <input
              id="twelvemax"
              name="twelvemax"
              type="number"
              value={twelvemax}
              onChange={(event) => setTwelvemax(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="dividendYieldmin">
              <span className="input-true-main-page">Dividendo Mínimo (%)</span>
            </label>
            <input
              id="dividendYieldmin"
              name="dividendYieldmin"
              type="number"
              value={dividendYieldmin}
              onChange={(event) => setDividendYieldmin(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="dividendYieldmax">
              <span className="input-true-main-page">Dividendo Máximo (%)</span>
            </label>
            <input
              id="dividendYieldmax"
              name="dividendYieldmax"
              type="number"
              value={dividendYieldmax}
              onChange={(event) => setDividendYieldmax(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="pricemin">
              <span className="input-true-main-page">Preço Mínimo</span>
            </label>
            <input
              id="pricemin"
              name="pricemin"
              type="number"
              value={pricemin}
              onChange={(event) => setPricemin(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

          </div>
        )}

        <label className="label-checkbox-main-page">
          <input
            className="checkbox-main-page"
            type="checkbox"
            onChange={handleChangeRealStateFunds}
          />
          <span className="checkbox-main-page">Fundos Imobiliários</span>
        </label>

        {realStateFunds && (
          <div className="div-true-main-page animeLeft">
            <span className="input-true-main-page">Segmento</span>
            <Select
              isMulti
              name="segmentRSF"
              options={segmentRSFRSF}
              value={segmentRSF}
              classNamePrefix="select"
              onChange={setSegmentRSF}
            />

            <label htmlFor="twelveminRSF">
              <span className="input-true-main-page">
                Retorno Mínimo (12 meses)
              </span>
            </label>
            <input
              id="twelveminRSF"
              name="twelveminRSF"
              type="number"
              value={twelveminRSF}
              onChange={(event) => setTwelveminRSF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="twelvemaxRSF">
              <span className="input-true-main-page">
                Retorno Máximo (12 meses)
              </span>
            </label>
            <input
              id="twelvemaxRSF"
              name="twelvemaxRSF"
              type="number"
              value={twelvemaxRSF}
              onChange={(event) => setTwelvemaxRSF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="dividendYieldminRSF">
              <span className="input-true-main-page">Dividendo Mínimo (%)</span>
            </label>
            <input
              id="dividendYieldminRSF"
              name="dividendYieldminRSF"
              type="number"
              value={dividendYieldminRSF}
              onChange={(event) => setDividendYieldminRSF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="dividendYieldmaxRSF">
              <span className="input-true-main-page">Dividendo Máximo (%)</span>
            </label>
            <input
              id="dividendYieldmaxRSF"
              name="dividendYieldmaxRSF"
              type="number"
              value={dividendYieldmaxRSF}
              onChange={(event) => setDividendYieldmaxRSF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="priceminRSF">
              <span className="input-true-main-page">Preço Mínimo</span>
            </label>
            <input
              id="priceminRSF"
              name="priceminRSF"
              type="number"
              value={priceminRSF}
              onChange={(event) => setPriceminRSF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="pricemaxRSF">
              <span className="input-true-main-page">Preço Máximo</span>
            </label>
            <input
              id="pricemaxRSF"
              name="pricemaxRSF"
              type="number"
              value={pricemaxRSF}
              onChange={(event) => setPricemaxRSF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />
          </div>
        )}

        <label className="label-checkbox-main-page">
          <input
            className="checkbox-main-page"
            type="checkbox"
            onChange={handleChangeCoe}
          />
          <span className="checkbox-main-page">COE</span>
        </label>

        {coe && (
          <div className="div-true-main-page animeLeft">
            <span className="input-true-main-page">Estratégia</span>
            <Select
              isMulti
              name="strategy"
              options={strategyCOE}
              value={strategy}
              classNamePrefix="select"
              onChange={setStrategy}
            />

            <span className="input-true-main-page">Classificação</span>
            <Select
              isMulti
              name="classification"
              options={classificationCOE}
              value={classification}
              classNamePrefix="select"
              onChange={setClassification}
              step="0.1"
            />

            <label htmlFor="deadlinemin">
              <span className="input-true-main-page">Prazo Mínimo (meses)</span>
            </label>
            <input
              id="deadlinemin"
              name="deadlinemin"
              type="number"
              value={deadlinemin}
              onChange={(event) => setDeadlinemin(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="deadlinemax">
              <span className="input-true-main-page">Prazo Máximo (meses)</span>
            </label>
            <input
              id="deadlinemax"
              name="deadlinemax"
              type="number"
              value={deadlinemax}
              onChange={(event) => setDeadlinemax(event.target.value)}
              className="input-main-page"
              step="0.1"
            />
          </div>
        )}

        <label className="label-checkbox-main-page">
          <input
            className="checkbox-main-page"
            type="checkbox"
            onChange={handleChangeinvestmentFunds}
          />
          <span className="checkbox-main-page">Fundos de Investimento</span>
        </label>

        {investmentFunds && (
          <div className="div-true-main-page animeLeft">
            <span className="input-true-main-page">Classificação</span>
            <Select
              isMulti
              name="classificationIF"
              options={classificationIFIF}
              value={classificationIF}
              classNamePrefix="select"
              onChange={setClassificationIF}
            />

            <label htmlFor="monthReturnminIF">
              <span className="input-true-main-page">Retorno Mínimo (mês)</span>
            </label>
            <input
              id="monthReturnminIF"
              name="monthReturnminIF"
              type="number"
              value={monthReturnminIF}
              onChange={(event) => setMonthReturnminIF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="monthReturnmaxIF">
              <span className="input-true-main-page">Retorno Máximo (mês)</span>
            </label>
            <input
              id="monthReturnmaxIF"
              name="monthReturnmaxIF"
              type="number"
              value={monthReturnmaxIF}
              onChange={(event) => setMonthReturnmaxIF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="applicationminIF">
              <span className="input-true-main-page">Aplicação Mínima</span>
            </label>
            <input
              id="applicationminIF"
              name="applicationminIF"
              type="number"
              value={applicationminIF}
              onChange={(event) => setApplicationminIF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="applicationmaxIF">
              <span className="input-true-main-page">Aplicação Máxima</span>
            </label>
            <input
              id="applicationmaxIF"
              name="applicationmaxIF"
              type="number"
              value={applicationmaxIF}
              onChange={(event) => setApplicationmaxIF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="admTaxminIF">
              <span className="input-true-main-page">
                Taxa de Administração Mínima
              </span>
            </label>
            <input
              id="admTaxminIF"
              name="admTaxminIF"
              type="number"
              value={admTaxminIF}
              onChange={(event) => setAdmTaxminIF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="admTaxmaxIF">
              <span className="input-true-main-page">
                Taxa de Administração Máxima
              </span>
            </label>
            <input
              id="admTaxmaxIF"
              name="admTaxmaxIF"
              type="number"
              value={admTaxmaxIF}
              onChange={(event) => setAdmTaxmaxIF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />
          </div>
        )}

        <label className="label-checkbox-main-page">
          <input
            className="checkbox-main-page"
            type="checkbox"
            onChange={handleChangePensionFunds}
          />
          <span className="checkbox-main-page">Fundos de Previdência</span>
        </label>

        {pensionFunds && (
          <div className="div-true-main-page animeLeft">
            <label htmlFor="monthReturnminPF">
              <span className="input-true-main-page">Retorno Mínimo (mês)</span>
            </label>
            <input
              id="monthReturnminPF"
              name="monthReturnminPF"
              type="number"
              value={monthReturnminPF}
              onChange={(event) => setMonthReturnminPF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="monthReturnmaxPF">
              <span className="input-true-main-page">Retorno Máximo (mês)</span>
            </label>
            <input
              id="monthReturnmaxPF"
              name="monthReturnmaxPF"
              type="number"
              value={monthReturnmaxPF}
              onChange={(event) => setMonthReturnmaxPF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="applicationminPF">
              <span className="input-true-main-page">Aplicação Mínima</span>
            </label>
            <input
              id="applicationminPF"
              name="applicationminPF"
              type="number"
              value={applicationminPF}
              onChange={(event) => setApplicationminPF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="applicationmaxPF">
              <span className="input-true-main-page">Aplicação Máxima</span>
            </label>
            <input
              id="applicationmaxPF"
              name="applicationmaxPF"
              type="number"
              value={applicationmaxPF}
              onChange={(event) => setApplicationmaxPF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="admTaxminPF">
              <span className="input-true-main-page">
                Taxa de Administração Mínima
              </span>
            </label>
            <input
              id="admTaxminPF"
              name="admTaxminPF"
              type="number"
              value={admTaxminPF}
              onChange={(event) => setAdmTaxminPF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />

            <label htmlFor="admTaxmaxPF">
              <span className="input-true-main-page">
                Taxa de Administração Máxima
              </span>
            </label>
            <input
              id="admTaxmaxPF"
              name="admTaxmaxPF"
              type="number"
              value={admTaxmaxPF}
              onChange={(event) => setAdmTaxmaxPF(event.target.value)}
              className="input-main-page"
              step="0.1"
            />
          </div>
        )}

        <button className="button-main-page">Enviar</button>

        {response && <h4 className="response-main-page">{response}!</h4>}
      </form>
    </div>
  );
};

export default MainPage;
