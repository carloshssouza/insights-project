import React, { useState, useEffect } from "react";

import "../pages/advisor/home.css";

import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import { BsPersonFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";


class GetClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            delRes: '',
        };

    }

    deleteItem(elem) {
        const self = this;
        if(window.confirm('Tem certeza que deseja deletar o usuário?')) {
            console.log(elem);
            var config = {
                method: 'get',
                url: 'http://localhost:5001/client/delete/' + elem,
                headers: {}
            };
            console.log(config);
            axios(config)
                .then(function (response) { 
                    self.setState({ delRes: JSON.stringify(response) });
                }) 
                .catch(function (error) { self.setState({ delRes: error }); console.log(error)});
                if(this.state.delRes == '1') {
                alert('Usuário deletado!');
                window.location.replace('http://localhost:5500/advisor/home');
            }
        }
    }

    componentDidMount() {
        const self = this;
        const req = async () => {
            axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
            let result = await axios.get('http://localhost:5001/clients', {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
            let data = result.data;
            self.setState({ res: data });
        }

        req();
    }

    //e.advisor_id == window.sessionStorage.getItem('adv_id')
    
    render() {
        let count = 0;
        this.state.res.map((e) => { 
            if(e.advisor_id == window.sessionStorage.getItem('adv_id')) count = count + 1
        })
        return (
            <>
                {
                    count === 0
                        ? <div style={{color: "white"}}> 
                            <h2>Nada por aqui!</h2>
                            <a href="../client/create">Adicionar cliente?...</a>
                        </div>
                        : this.state.res.map((e) =>
                            (e.advisor_id == window.sessionStorage.getItem('adv_id'))
                                ? <Row className="card">
                                    <a href="">
                                        <Col className="space-between">
                                            <div> <BsPersonFill size={40} />   </div>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <div className="card-text"> <b>{e.name.toUpperCase()}</b> <br /> {e.email} </div>
                                            <span></span>
                                            <div>
                                                <Button className="white" onClick={() => this.deleteItem(e.id)}><BsFillTrashFill size={30} color="black" /></Button>
                                                {/* BsThreeDotsVertical */}
                                                &nbsp;&nbsp;
                                                <Link to={{
                                                    pathname: "../client/update",
                                                    state: { id: e.id }
                                                }} >
                                                <Button className="white"><BsPencilFill size={30} color="black" />
                                                </Button>
                                            </Link>
                                            </div>
                                        </Col>
                                    </a>
                                </Row>
                                : <span></span>
                        )
                }
            </>
        );
    }

}

export default GetClient;