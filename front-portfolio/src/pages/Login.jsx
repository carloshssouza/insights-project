import React from 'react';
import './Login.css'

import logo from "../assets/3.png";
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { render } from '@testing-library/react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  cadastro(event) {
    console.log('./advisor/create');
  }

  handleSubmit(event) {
    const result = `"email": "${this.state.email}", "password": "${this.state.password}"`;

    alert(`JSON: ${result}`);
    event.preventDefault();
  }

  render() {
    return (
      <>
        <Row className="main">
          <Col xs="4" className="side-content">
            <img src={logo} alt="Logo" className="logo" />
          </Col>
          <Col xs="8" className="main-content">
            <h1>LOGIN</h1>
            <Form inline onSubmit={this.handleSubmit.bind(this)}>
              <div className="input-section">
                <FormGroup>
                  <Label
                    for="email"
                    hidden
                  >
                    Email
                  </Label>
                  <Col xs={6}>
                    <Input
                      id="email"
                      name="email"
                      placeholder="EMAIL"
                      type="email"
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </Col>
                </FormGroup>
                {' '}
                <FormGroup>
                  <Label
                    for="password"
                    hidden
                  >
                    Email
                  </Label>
                  <Col xs={6}>
                    <Input
                      id="password"
                      name="password"
                      placeholder="SENHA"
                      type="password"
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </Col>
                </FormGroup>
              </div>
              {' '}
              <Button>
                Entrar
              </Button>
              {' '}
              <a href="./advisor/create">
                <Button type="button" onClick={this.cadastro()}>
                  Cadastrar
                </Button>
              </a>
            </Form>
          </Col>
        </Row>
      </>
    );
  };
}

export default Login;
