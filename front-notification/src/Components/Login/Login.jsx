import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    navigate('/');
  }

  return (
    <div className="div-login">
      <h1 className="title-login">
        Dicas<span className="span-title-login">Investi</span>
      </h1>
      <form className="form-login" onSubmit={onSubmit}>
        <label className="label-login" for="user">
          Usuário:
        </label>
        <input
          className="input-login"
          type="text"
          id="user"
          required
          placeholder="Usuário"
        />
        <label className="label-login" for="password">
          Senha:
        </label>
        <input
          className="input-login"
          type="password"
          id="password"
          required
          placeholder="Senha"
        />
        <button className="button-login">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
