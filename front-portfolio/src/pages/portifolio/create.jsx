import React from "react";
import "../advisor/home.css";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { BsBoxArrowInLeft, BsCurrencyDollar, BsFillHouseFill } from "react-icons/bs";
import GetPortifolios from "../../components/getPortifolios";
import axios from "axios";

export default class PortifolioCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: 1,
            status: 1,
            adv_id: window.sessionStorage.getItem('adv_id'),
            adv: '',
            products: []
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
        if (this.state.name == '' || this.state.amount == 1) {
            alert("Todos os campos devem ser preenchidos!");
        } else {
            const result = {
                "name": this.state.name,
                "amount": this.state.amount,
                "status": 1,
                "advisor_id": this.state.adv_id,
                "products": []
            };

            var _data = JSON.stringify(result);
            var config = {
                method: 'post',
                url: 'http://localhost:5004/portfolio/create',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: _data
            };
            axios(config)
                .then(function (res) { window.sessionStorage.setItem('portifolio', '1'); alert('Portifólio criado!'); window.location.replace('http://localhost:5500/portifolio/home'); })
                .catch(function (error) { alert(error); });
        }
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
                            <a href="./home">
                                {/* Rota para página de criar portifólio */}
                                <div className="side-bar"><BsCurrencyDollar size={40} />
                                    &nbsp;&nbsp;&nbsp;Portifólio</div>
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
                    <br />
                    <br />
                    <h1>PORTIFÓLIOS</h1>
                    <br />

                    <div className="main-form">
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
                                        placeholder="Nome do portifólio"
                                        type="text"
                                        onChange={this.handleInputChange.bind(this)
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="amount"
                                    sm={3}
                                >
                                    Valor esperado
                                </Label>
                                <Col sm={9}>
                                    <Input
                                        id="amount"
                                        name="amount"
                                        placeholder="0.0"
                                        type="number"
                                        step={0.01}
                                        onChange={this.handleInputChange.bind(this)
                                        }
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
    }
}