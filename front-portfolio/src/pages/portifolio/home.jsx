import React from "react";
import "../advisor/home.css";
import { Row, Col, Button } from "reactstrap";
import { BsBoxArrowInLeft, BsCurrencyDollar, BsFillHouseFill } from "react-icons/bs";
import GetPortifolios from "../../components/getPortifolios";
import axios from "axios";

export default class PortifolioHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adv: '',
        };

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

    render() {
        // let vazio;
        // console.log("Port. vazio? " + window.sessionStorage.getItem('portifolio'))
        // if (window.sessionStorage.getItem('portifolio') == '0') {
        //     vazio = <div style={{ color: "white" }}>
        //         <h2>Nada por aqui!</h2>
        //         <a href="./create">Adiconar portifólio?...</a>
        //     </div>
        // } else {
        //     vazio = <span></span>
        // }
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
                            <a href="./create">
                                {/* Rota para página de criar portifólio */}
                                <div className="side-bar"><BsCurrencyDollar size={40} />
                                    &nbsp;&nbsp;&nbsp;Adicionar Portifólio</div>
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
                    <GetPortifolios />
                    {/* {vazio} */}

                </div>

            </>
        );
    }
}