export default function verificationForm(form, stocks, realStateFunds, coe, investimentFunds, pensionFunds) {
    if (!form.stocks.segment) delete form.stocks.segment;
    if (!form.stocks.recommendation) delete form.stocks.recommendation;
    if (!form.stocks.return12m_min) delete form.stocks.return12m_min;
    if (!form.stocks.return12m_max) delete form.stocks.return12m_max;
    if (!form.stocks.dividend_yield_min) delete form.stocks.dividend_yield_min;
    if (!form.stocks.dividend_yield_max) delete form.stocks.dividend_yield_max;
    if (!form.stocks.price_min) delete form.stocks.price_min;
    if (!form.stocks.price_max) delete form.stocks.price_max;
    
    if (!form.realStateFunds.segment) delete form.realStateFunds.segment;
    if (!form.realStateFunds.return12m_min)
      delete form.realStateFunds.return12m_min;
    if (!form.realStateFunds.return12m_max)
      delete form.realStateFunds.return12m_max;
    if (!form.realStateFunds.dividend_yield_min)
      delete form.realStateFunds.dividend_yield_min;
    if (!form.realStateFunds.dividend_yield_max)
      delete form.realStateFunds.dividend_yield_max;
    if (!form.realStateFunds.price_min) delete form.realStateFunds.price_min;
    if (!form.realStateFunds.price_max) delete form.stocks.price_max;
    
    if (!form.coe.strategy) delete form.coe.strategy;
    if (!form.coe.classification) delete form.coe.classification;
    if (!form.coe.deadline_min) delete form.coe.deadline_min;
    if (!form.coe.deadline_max) delete form.coe.deadlinemax;
    
    if (!form.investimentFunds.min_application_min)
      delete form.investimentFunds.min_application_min;
    if (!form.investimentFunds.min_application_max)
      delete form.investimentFunds.min_application_max;
    if (!form.investimentFunds.adm_tax_min)
      delete form.investimentFunds.adm_tax_min;
    if (!form.investimentFunds.adm_tax_max)
      delete form.investimentFunds.adm_tax_max;
    if (!form.investimentFunds.classification)
      delete form.investimentFunds.classification;
    if (!form.investimentFunds.month_return_min)
      delete form.investimentFunds.month_return_min;
    if (!form.investimentFunds.month_return_max)
      delete form.investimentFunds.month_return_max;
    
    if (!form.pensionFunds.min_application_min)
      delete form.pensionFunds.min_application_min;
    if (!form.pensionFunds.min_application_max)
      delete form.pensionFunds.min_application_max;
    if (!form.pensionFunds.adm_tax_min) delete form.pensionFunds.adm_tax_min;
    if (!form.pensionFunds.adm_tax_max) delete form.pensionFunds.adm_tax_max;
    if (!form.pensionFunds.month_return_min)
      delete form.pensionFunds.month_return_min;
    if (!form.pensionFunds.month_return_max)
      delete form.pensionFunds.month_return_max;
    
    if (!stocks) delete form.stocks;
    if (!realStateFunds) delete form.realStateFunds;
    if (!coe) delete form.coe;
    if (!investimentFunds) delete form.investimentFunds;
    if (!pensionFunds) delete form.pensionFunds;
}