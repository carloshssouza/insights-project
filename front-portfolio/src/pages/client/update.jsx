import React from "react";
import './create.css';

import account_circle from "../../assets/ic_account_circle_white_48dp.png";

import { Form, FormGroup, Label, Col, Input, Row, Button } from 'reactstrap';
import { BsFillHouseFill, BsBoxArrowInLeft } from "react-icons/bs";
import axios from "axios";
import { withRouter } from 'react-router-dom';

class UpdateClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            username: "",
            password: "",
            cpf: "",
            cel: "",
            address: "",
            city: "",
            state: "",
            complement: "",
            zip_code: "",
            id: this.props.location.state.id,
            adv: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('adv_id') == null) {
            alert("Parece que sua sessão não está ativa");
            window.location.replace('http://localhost:5500');
        }
        var self = this;
        var config = {
            method: 'get',
            url: 'http://localhost:5002/advisor/' + window.sessionStorage.getItem('adv_id'),
            headers: {}
        };
        axios(config)
            .then(function (response) {
                self.setState({ adv: response.data })
            })
            .catch(function (error) {
                console.log(error);
            });

        var config2 = {
            method: 'get',
            url: 'http://localhost:5001/client/' + self.state.id,
            headers: {}
        };
        axios(config2)
            .then(function (response) {
                self.setState({
                    name: response.data.name,
                    email: response.data.email,
                    username: response.data.username,
                    password: response.data.password,
                    cpf: response.data.cpf,
                    cel: response.data.cel,
                    address: response.data.address,
                    city: response.data.city,
                    state: response.data.state,
                    complement: response.data.complement,
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
        const result = { "name": this.state.name, "cpf": this.state.cpf, "username": this.state.username };
        var _data = JSON.stringify(result);
        var config = {
            method: 'post',
            url: 'http://localhost:5001/client/update/' + this.state.id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: _data
        };
        axios(config)
            .then(function (res) { alert('Usuário atualizado!'); window.location.replace('http://localhost:5500/advisor/home'); })
            .catch(function (error) { alert(error); });
        event.preventDefault();
    }

    render() {
        return (
            <>
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
                        <h1>Editar cliente</h1>
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
                                        onChange={this.handleInputChange.bind(this)
                                        }
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
                                        onChange={this.handleInputChange.bind(this)
                                        }
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
                                        placeholder={this.state.cpf}
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
                                    <input type="submit" value="Enviar" style={{ backgroundColor: "transparent", color: "white", border: "none" }} />
                                </Button>

                            </div>

                        </Form>
                    </div>

                </div>
                {/* <p>{res}</p> */}

            </>
        );
    }
}

export default withRouter(UpdateClient);