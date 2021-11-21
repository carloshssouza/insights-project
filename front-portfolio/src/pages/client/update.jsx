import React from "react";
import './create.css';

import account_circle from "../../assets/ic_account_circle_white_48dp.png";

import { Form, FormGroup, Label, Col, Input, Row } from 'reactstrap';
import { BsFillPersonPlusFill, BsFillPersonFill, BsFillHouseFill, BsBoxArrowInLeft } from "react-icons/bs";
import axios from "axios";
import { withRouter } from 'react-router-dom';

class UpdateClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cpf: '',
            username: '',
            id: this.props.location.state.id,
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
        // const result = `{"name": "${this.state.name}", "cpf": "${this.state.cpf}", "user": "${this.state.username}"}`;
        const result = { "name": this.state.name, "cpf": this.state.cpf, "username": this.state.username };
        var _data = JSON.stringify(result);
        // alert(`JSON: ${data}`);
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
        // console.log(this.props);
        // console.log("ID: " + this.props.location.state.id);
        return (
            <>
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
                            <div className="cb">
                                {/* <Button secondary>
                                Enviar
                            </Button> */}

                                <input type="submit" value="Enviar" />
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