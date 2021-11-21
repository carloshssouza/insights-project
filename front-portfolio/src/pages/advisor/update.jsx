import React from 'react';

import account_circle from "../../assets/ic_account_circle_white_48dp.png";

import { Form, FormGroup, Label, Col, Input, Button, Row } from 'reactstrap';
import { BsFillPersonPlusFill, BsFillPersonFill, BsFillHouseFill, BsBoxArrowInLeft } from "react-icons/bs";
import axios from "axios";

class UpdateAdvisor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: 12341.42,
            adv: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
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
                self.setState({adv: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
        // this.state.name = JSON.stringify(res.name);
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
            "salary": this.state.salary
        });
        var config = {
            method: 'post',
            url: 'http://localhost:5002/advisor/update/1',//Tocar o user depois para uma var
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
                        <h1>Editar perfil</h1>
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
                                    for="salary"
                                    sm={2}
                                >
                                    Salário
                                </Label>
                                <Col sm={10}>
                                    <Input
                                        id="salary"
                                        name="salary"
                                        placeholder="1234.56"
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

export default UpdateAdvisor;