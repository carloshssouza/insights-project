import React from 'react';
import './create.css';
import axios from "axios";

import account_circle from "../../assets/ic_account_circle_white_48dp.png";

import { Form, FormGroup, Label, Col, Input, Button, Row } from 'reactstrap';
import { BsFillPersonPlusFill, BsFillPersonFill, BsFillHouseFill, BsBoxArrowInLeft } from "react-icons/bs";

class CreateClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cpf: '',
            username: '',
            email: '',
            password: '',
            suitability: '',
            cel: '',
            address: '',
            city: '',
            estate: '',
            status: 1,
            complement: '',
            zip_code: '',
            obs: '',
            resultado: '',
            adv: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        var self = this;
        var config = {
            method: 'get',
            url: 'http://localhost:5002/advisor/1',
            headers: {}
        };
        axios(config)
            .then(function (response) {
                self.setState({ adv: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });
    };

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
            "suitability": this.state.suitability,
            "cel": this.state.cel,
            "address": this.state.address,
            "city": this.state.city,
            "state": this.state.estate,
            "status": 1,
            "complement": this.state.complement,
            "zip_code": this.state.zip_code,
            "obs": this.state.obs,
            "advisor_id": 1 //Mudar o id do advisor depois!
        });
        this.state.resultado = result;
        console.log(this.state.resultado);
        var config = {
            method: 'post',
            url: 'http://localhost:5001/client/create',
            headers: {
                'Content-Type': 'application/json'
            },
            data: this.state.resultado
        };

        axios(config)
            .then(function (response) {
                alert('Usuário criado!');
                window.location.replace('http://localhost:5500/advisor/home');
            })
            .catch(function (error) {
                alert(error);
            });
        // this.req();
        // JSON.stringify(result);
        // alert(`JSON: ${result}`);
        event.preventDefault();
    }

    render() {
        return (
            <>
                {/* Retangle-2 = Sidebar */}
                <div className="Rectangle-2">
                    {/* Retangle-3 = Card do perfil */}
                    <div className="Rectangle-3">
                        <br />
                        <div className="Ellipse-1"><br />
                            <BsFillPersonFill size={40} />
                        </div>
                        <p className="Txt-1">
                            {this.state.adv.name} <br />
                            {this.state.adv.email} <br />
                            {this.state.adv.city} - {this.state.adv.state} <br />
                            {this.state.adv.cvm_code}
                        </p>
                    </div>
                    <hr />
                    <Row>
                        <Col xs="1"></Col>
                        <Col>
                            <a href="../advisor/home">
                                <div className="side-bar"><BsFillHouseFill size={40} />
                                    &nbsp;&nbsp;&nbsp;Página Inicial</div>
                            </a>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xs="1"></Col>
                        <Col>
                            <a href="../">
                                <div className="side-bar"><BsBoxArrowInLeft size={40} />
                                    &nbsp;&nbsp;&nbsp;Logout</div>
                            </a>
                        </Col>
                    </Row>
                    <hr />
                </div>

                <div className="Rectangle-1">
                    <div className='title'>
                        <img src={account_circle} alt="Profile Icon" />
                        <h1>Criar cliente</h1>
                    </div>
                    <div className='main-form'>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup row>
                                <Label
                                    for="name"
                                    sm={2}
                                >
                                    Nome
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    CPF
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    Usuário
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    Email
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    Senha
                                </Label>
                                <Col sm={10}>
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
                                    for="suitability"
                                    sm={2}
                                >
                                    Suitability
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="suitability"
                                        name="suitability"
                                        placeholder="suitability"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="cel"
                                    sm={2}
                                >
                                    Celular
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    Endereço
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    Cidade
                                </Label>
                                <Col sm={10}>
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
                                    for="estate"
                                    sm={2}
                                >
                                    Estado
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="estate"
                                        name="estate"
                                        placeholder="Seu estado"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="status"
                                    sm={2}
                                >
                                    Status
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="status"
                                        name="status"
                                        placeholder=""
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="complement"
                                    sm={2}
                                >
                                    Complemento
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    CEP
                                </Label>
                                <Col sm={10}>
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
                                    sm={2}
                                >
                                    Observação
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="obs"
                                        name="obs"
                                        placeholder=""
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>

                            <div className="cb">
                                <Button secondary>
                                    Enviar
                                </Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </>
        );
    };
}

export default CreateClient;