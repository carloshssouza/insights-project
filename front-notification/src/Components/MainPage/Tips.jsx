import React, { useState, useEffect } from 'react';
import teste from './teste.json';

const Tips = () => {
  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState(false);

  const [objectServer, setObjectServer] = useState(teste);
  // const serverURL = `ws://localhost:8001/stream/products?email=${email}`;
  //
  // const socket = socketIOClient(serverURL);
  //
  // socket.on('*', (obj) => {
  //   setObjectServer(obj);
  // });

  useEffect(() => {
    console.log(objectServer);
  }, [objectServer]);

  // useEffect(() => {
  //   console.log(email);
  //   fetch('http://localhost:8000/recommendation', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({email: email}),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => setObjectServer(json));
  // }, [email]);
  useEffect(() => {
    if (email) {
      let url = `ws://localhost:8001/stream/products?email=${email}`
      const connection = new WebSocket(url)
      connection.onmessage = e => {
        console.log(e.data)
        setObjectServer(JSON.parse(e.data))
      }
  }  }, [email])


  function handleSubmit(event) {
    event.preventDefault();
    setStatus(true);
    setEmail(event.target[0].value);
    fetch('http://localhost:8000/recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: event.target[0].value}),
    })
      .then((response) => response.json())
      .then((json) => setObjectServer(json.message))
  }


  return (
    <div className="div-tips">
      {!status && (
        <form className="form-main-page animeLeft" onSubmit={handleSubmit}>
          <h1 className="title-main-page">Registrar Informações</h1>

          <label for="email">
            <span className="span-main-page">
              Confime seu email para receber informações do produto:
            </span>
          </label>
          <input
            className="input-main-page"
            type="email"
            required
            id="email"
            value={email}
          />
          <button className="button-main-page">Enviar</button>
        </form>
      )}

      <div className="container-card-div-tips">
        {status &&
          objectServer.map((item) => (
            <div className="animeLeft">
              <div className="div-card-tips">
                <h1 className="h1-tips">{item.name}</h1>
                <h4 className="h4-tips">
                  <a href={item.link}>→ {item.source}</a>
                </h4>

                {item.segment && (
                  <h5 className="h5-tips" style={{ marginTop: '-10px' }}>
                    {item.segment}
                  </h5>
                )}
                {item.strategy && (
                  <h5 className="h5-tips" style={{ marginTop: '-10px' }}>
                    {item.strategy}
                  </h5>
                )}
                {item.ticker && <h3 className="h3-tips">{item.ticker}</h3>}
                {item.classification && (
                  <h3 className="h3-tips">{item.classification}</h3>
                )}

                <div className="div-number-tips">
                  {item.price && (
                    <p className="number-tips">
                      <span className="span-tips">R$: </span>
                      {item.price?.toFixed(2)}
                    </p>
                  )}
                  {item.deadline && (
                    <p className="number-tips">
                      <span className="span-tips">Prazo Final: </span>
                      {item.deadline}{' '}
                      <span style={{ fontSize: '1.2rem', paddingLeft: '3px' }}>
                        d(s)
                      </span>
                    </p>
                  )}
                  {item.redemption && (
                    <p className="number-tips-medium">
                      <span className="span-tips">Redenção: </span>
                      {item.redemption}
                    </p>
                  )}
                </div>

                <div className="div-info-tips">
                  {item.dividend_yield && (
                    <p>
                      <strong>Rendimento Div.:</strong>{' '}
                      {item.dividend_yield.toFixed(2)}
                    </p>
                  )}
                  {item.mean_daily_return && (
                    <p>
                      <strong>Ret. médio diário:</strong>{' '}
                      {item.mean_daily_return.toFixed(2)}
                    </p>
                  )}
                  {item.mean_daily_volume && (
                    <p>
                      <strong>Vol. médio diário:</strong>{' '}
                      {item.mean_daily_volume.toFixed(2)}
                    </p>
                  )}
                  {item.forecast12m && (
                    <p>
                      <strong>Previsão 12m:</strong>{' '}
                      {item.forecast12m.toFixed(2)}
                    </p>
                  )}
                  {item.return12m && (
                    <p>
                      <strong>Retorno 12m:</strong> {item.return12m.toFixed(2)}
                    </p>
                  )}
                  {item.min_application && (
                    <p>
                      <strong>Aplicação min.:</strong>{' '}
                      {item.min_application.toFixed(2)}
                    </p>
                  )}
                  {item.month_return && (
                    <p>
                      <strong>Retorno por mês:</strong>{' '}
                      {item.month_return.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tips;