import React from "react";

import "./home.css";
import ClientCard from "../../components/getClients";

import { Row, Col, Button } from "reactstrap";
import { BsFillPersonPlusFill, BsBoxArrowInLeft, BsPersonLinesFill, BsCurrencyDollar } from "react-icons/bs";
import axios from "axios";
import { withRouter } from 'react-router-dom';

class AdvisorHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adv: '',
            adv_id: window.sessionStorage.getItem('adv_id'),
        };
    }

    componentDidMount() {
        if(window.sessionStorage.getItem('adv_id') == null) {
            alert("Parece que sua sessão não está ativa");
            window.location.replace('http://localhost:5500');
        }
        var self = this;
        console.log(typeof (self.state.adv_id));
        var config = {
            method: 'get',
            url: 'http://localhost:5002/advisor/' + self.state.adv_id,
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
                    <div className="sidebar">
                        <Row>
                            <Col xs="1"></Col>
                            <Col>
                                <a href="../client/create">
                                    <div className="side-bar"><BsFillPersonPlusFill size={40} />
                                        &nbsp;&nbsp;&nbsp;Adicionar cliente</div>
                                </a>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="1"></Col>
                            <Col>
                                <a href="./update">
                                    <div className="side-bar"><BsPersonLinesFill size={40} />
                                        &nbsp;&nbsp;&nbsp;Editar perfil</div>
                                </a>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs="1"></Col>
                            <Col>
                                <a href="../../portifolio/home">
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
                </div>

                <div className="Rectangle-1">
                    <br />
                    <br />
                    <h1>CLIENTES</h1>
                    <br />
                    <ClientCard />
                </div>
            </>
        );
    }
}

export default withRouter(AdvisorHome);