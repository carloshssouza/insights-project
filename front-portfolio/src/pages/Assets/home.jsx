import React from "react";

import { Col, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from "axios";
import { BsFillPersonFill, BsFillHouseFill, BsBoxArrowInLeft } from "react-icons/bs";

import AssetsInfo from "../../components/assetsInfo";

class AssetsHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sym: ['A1', '2', '3'],
        };
    }

    render() {
        let open = false;
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
                            Name <br />
                            Email <br />
                            City - ST <br />
                            Cvm
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
                        <h1>Assets</h1>
                    </div>
                    <div>
                        <Dropdown isOpen={open} toggle={function noRefCheck() { }}>
                            <DropdownToggle caret onClick={function change() {
                                open == true
                                    ? open = false
                                    : open = true
                            }}>
                                Selecione
                            </DropdownToggle>
                            <DropdownMenu container="body" >
                                {this.state.sym.map((item) => <DropdownItem>{item}</DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <br /><br />
                    <AssetsInfo company={ ["ITSA4.SA"] }/>

                </div>
            </>
        );
    };
}

export default AssetsHome;