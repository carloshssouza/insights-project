import React from 'react';
import '../client/create.css'

import account_circle from "../../assets/ic_account_circle_white_48dp.png"
import logo from "../../assets/3.png";

import { Form, FormGroup, Label, Col, Input, Button, Row } from 'reactstrap';
import { BsFillPersonPlusFill, BsFillPersonFill, BsFillHouseFill, BsBoxArrowInRight } from "react-icons/bs";
import axios from "axios";

class CreateAdvisor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cpf: '',
            username: '',
            email: '',
            password: '',
            cel: '',
            address: '',
            city: '',
            state: '',
            complement: '',
            zip_code: '',
            obs: '',
            birth: '',
            salary: 12341.42,
            work_code: 412561,
            cvm_code: ''
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

    handleSubmit(event) {
        const result = JSON.stringify({
            "name": this.state.name,
            "cpf": this.state.cpf,
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password,
            "cel": this.state.cel,
            "address": this.state.address,
            "city": this.state.city,
            "state": this.state.state,
            "status": 1,
            "complement": this.state.complement,
            "zip_code": this.state.zip_code,
            "obs": this.state.obs,
            "birth": this.state.birth,
            "salary": this.state.salary,
            "work_code": this.state.work_code,
            "cvm_code": this.state.cvm_code
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5002/advisor/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: result
        };
        axios(config)
            .then(function (response) {
                alert('Advisor criado!\n' + JSON.stringify(response.data));
                window.location.replace('http://localhost:5500/');
            })
            .catch(function (error) {
                alert(error);
            });
        // alert(`JSON: ${result}`);
        event.preventDefault();
    }

    render() {
        return (
            <>
                {/* Retangle-2 = Sidebar */}
                <div className="Rectangle-2">
                    <img src={logo} alt="Logo" width={300} />
                    <hr />
                    <Row>
                        <Col xs="1"></Col>
                        <Col>
                            <a href="../">
                                <div className="side-bar"><BsBoxArrowInRight size={40} />
                                    &nbsp;&nbsp;&nbsp;Login</div>
                            </a>
                        </Col>
                    </Row>
                    <hr />
                </div>

                <div className="Rectangle-1">
                    <div className='title'>
                        <img src={account_circle} alt="Profile Icon" />
                        <h1>Criar Assessor</h1>
                    </div>
                    <div className='main-form'>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup row>
                                <Label
                                    for="name"
                                    sm={3}
                                >
                                    Nome
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Seu nome"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="cpf"
                                    sm={3}
                                >
                                    CPF
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="cpf"
                                        name="cpf"
                                        placeholder="000.000.000-00"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="username"
                                    sm={3}
                                >
                                    Usuário
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Nome de usuário"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="email"
                                    sm={3}
                                >
                                    Email
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="examplo@email.com"
                                        type="email"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="password"
                                    sm={3}
                                >
                                    Senha
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="cel"
                                    sm={3}
                                >
                                    Celular
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="cel"
                                        name="cel"
                                        placeholder="(00) 0000-0000"
                                        type="cel"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="address"
                                    sm={3}
                                >
                                    Endereço
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="Rua X, Número X, Bairro X"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="city"
                                    sm={3}
                                >
                                    Cidade
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="city"
                                        name="city"
                                        placeholder="Sua cidade"
                                        type="city"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="state"
                                    sm={3}
                                >
                                    Estado
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="state"
                                        name="state"
                                        placeholder="Seu estado"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="complement"
                                    sm={3}
                                >
                                    Complemento
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="complement"
                                        name="complement"
                                        placeholder=""
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="zip_code"
                                    sm={3}
                                >
                                    CEP
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="zip_code"
                                        name="zip_code"
                                        placeholder="00000-000"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="obs"
                                    sm={3}
                                >
                                    Observação
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="obs"
                                        name="obs"
                                        placeholder=""
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="birth"
                                    sm={3}
                                >
                                    Nascimento
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="birth"
                                        name="birth"
                                        placeholder="01/01/2001"
                                        type="date"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="salary"
                                    sm={3}
                                >
                                    Salário
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="salary"
                                        name="salary"
                                        placeholder="1234.56"
                                        type="number"
                                        step={0.01}
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="work_code"
                                    sm={3}
                                >
                                    Cód. de trab.
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="work_code"
                                        name="work_code"
                                        placeholder="0000"
                                        type="number"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="cvm_code"
                                    sm={3}
                                >
                                    Cód. CVM
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="cvm_code"
                                        name="cvm_code"
                                        placeholder="000"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            <div className="cb">
                                <Button secondary>
                                    Cadastrar
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </>
        );
    };
}

export default CreateAdvisor;