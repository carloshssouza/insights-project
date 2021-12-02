import React from 'react';

import account_circle from "../../assets/ic_account_circle_white_48dp.png";

import { Form, FormGroup, Label, Col, Input, Button, Row } from 'reactstrap';
import { BsFillHouseFill, BsBoxArrowInLeft } from "react-icons/bs";
import axios from "axios";

class UpdateAdvisor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: "",
            birth: "",
            cel: "",
            city: "",
            complement: "",
            email: "",
            password: "",
            state: "",
            username: "",
            zip_code: "",
            adv: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        var self = this;
        var config = {
            method: 'get',
            url: 'http://localhost:5002/advisor/' + window.sessionStorage.getItem('adv_id'),
            headers: {}
        };
        axios(config)
            .then(function (response) {
                self.setState({
                    adv: response.data,
                    name: response.data.name,
                    address: response.data.address,
                    birth: response.data.birth,
                    cel: response.data.cel,
                    city: response.data.city,
                    complement: response.data.complement,
                    email: response.data.email,
                    password: response.data.password,
                    state: response.data.state,
                    username: response.data.username,
                    zip_code: response.data.zip_code,
                })
            })
            .catch(function (error) {
                console.log(error);
            });


    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (value != "") {
            this.setState({
                [name]: value
            });
        }

    }

    handleSubmit(event) {
        const result = JSON.stringify({
            "name": this.state.name,
            "address": this.state.address,
            "birth": this.state.birth,
            "cel": this.state.cel,
            "city": this.state.city,
            "complement": this.state.complement,
            "email": this.state.email,
            "password": this.state.password,
            "state": this.state.state,
            "username": this.state.username,
            "zip_code": this.state.zip_code,

        });
        var config = {
            method: 'post',
            url: 'http://localhost:5002/advisor/update/' + window.sessionStorage.getItem('adv_id'),
            headers: {
                'Content-Type': 'application/json'
            },
            data: result
        };
        axios(config)
            .then(function (response) {
                alert('Edição realizada!');
                window.location.replace('http://localhost:5500/advisor/home');
            })
            .catch(function (error) {
                alert(error);
            });
        // alert(`JSON: ${result}`);
        event.preventDefault();
    }

    handleDelete() {
        var opt = window.confirm('Tem certeza que quer deletar este perfil?');
        if (opt) {
            var config = {
                method: 'get',
                url: 'http://localhost:5002/advisor/delete/' + window.sessionStorage.getItem('adv_id'),
                headers: {}
            };
            axios(config)
                .then(function (response) {
                    alert('Advisor deletado!');
                    window.location.replace('http://localhost:5500');
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            // Do nothing!
            console.log('Cancelado.');
        }
    }

    render() {
        // const { advisorName } = this.state.advName;
        console.log(this.state.adv);
        return (
            <>
                {/* Retangle-2 = Sidebar */}
                <div className="Rectangle-2">
                    {/* Retangle-3 = Card do perfil */}
                    <div className="Rectangle-3">
                        <br />
                        <div className="Ellipse-1"><br />
                        </div>
                        <p className="Txt-1">
                            {this.state.adv.name} <br />
                            {this.state.adv.email} <br />
                            {this.state.adv.city} - {this.state.adv.state} <br />
                            CVM: {this.state.adv.cvm_code}
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
                        <h1>Editar assessor</h1>
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
                                        placeholder={this.state.name}
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
                                        placeholder={this.state.email}
                                        type="text"
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
                                        placeholder="****"
                                        type="password"
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
                                        placeholder={this.state.username}
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="birth"
                                    sm={2}
                                >
                                    Nascimento
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="birth"
                                        name="birth"
                                        placeholder={this.state.birth}
                                        type="date"
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
                                        placeholder={this.state.cel}
                                        type="text"
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
                                        placeholder={this.state.address}
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
                                        placeholder={this.state.city}
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
                                        placeholder={this.state.complement}
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="state"
                                    sm={2}
                                >
                                    Estado
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="state"
                                        name="state"
                                        placeholder={this.state.state}
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
                                        placeholder={this.state.zip_code}
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
                        <div>
                            <Button secondary style={{ backgroundColor: "#212121", borderColor: "#212121", color: "red", textAlign11: "left" }} onClick={this.handleDelete}>
                                Apagar perfil
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

export default UpdateAdvisor;