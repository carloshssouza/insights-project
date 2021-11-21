import React from "react";
import "./home.css";
import { Row, Col, Button } from "reactstrap";
import { BsFillPersonPlusFill, BsFillPersonFill, BsBoxArrowInLeft, BsPersonLinesFill } from "react-icons/bs";
import ClientCard from "../../components/getClients";
import axios from "axios";

export default class AdvisorHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adv: '',
        };

        this.editClient = this.editClient.bind(this);
        this.deleteClient = this.deleteClient.bind(this);
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

    editClient(event) {
        alert('Edit');
    }

    deleteClient(event) {
        alert('Delete');
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
                            <a href="../../assets/home">
                                <div className="side-bar"><BsPersonLinesFill size={40} />
                                    &nbsp;&nbsp;&nbsp;Assets[teste]</div>
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
                    <h1>CLIENTES</h1>
                    <br />
                    <ClientCard />
                </div>
            </>
        );
    }
}