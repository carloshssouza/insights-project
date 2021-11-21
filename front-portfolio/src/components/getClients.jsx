import React, { useState, useEffect } from "react";

import "../pages/advisor/home.css";
import UpdateClient from "../pages/client/update.jsx";

import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import { BsPersonFill, BsFillTrashFill, BsPencilFill } from "react-icons/bs";


function GetClient() {

    const [res, setRes] = useState([]);
    const [delRes, setDelRes] = useState('');

    function deleteItem(elem) {
        console.log(elem.id);
        var config = {
            method: 'get',
            url: 'http://localhost:5001/client/delete/' + elem.id,
            headers: {}
        };

        axios(config)
            .then(function (response) { setDelRes = JSON.stringify(response); })
            .catch(function (error) { setDelRes = error; });
        
        if(delRes == '1') {
            window.location.replace('http://localhost:5500/advisor/home');
        }
    }

    useEffect(() => {
        const req = async () => {

            axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
            let result = await axios.get('http://localhost:5001/clients', {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });

            let data = result.data;
            setRes(data);
        }

        req();
    }, []);

    res.map((e) => console.log(e.name));

    return (
        <>
            {res.map((e) =>
                <Row className="card">
                    <a href="">
                        <Col className="space-between">
                            <div> <BsPersonFill size={40} />   </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="card-text"> <b>{e.name.toUpperCase()}</b> <br /> {e.email} Id:{e.id} </div>
                            <div className="card-icons-but">
                                <Button className="white" onClick={deleteItem.bind(this, e)}><BsFillTrashFill size={30} color="black" /></Button>
                                &nbsp;&nbsp;
                                <Link to={{
                                    pathname: "../client/update",
                                    state: { id: e.id }
                                }} >
                                <Button className="white"><BsPencilFill size={30} color="black" />
                                </Button>
                            </Link>


                            {/* {edit ? <UpdateClient id={e.id} /> : <Button className="white" onClick={setEdit(true)}><BsPencilFill size={30} color="black"/></Button> } */}
                            {/* Não deve funcionar o direcionamento abaixo */}
                            {/* Procurar: Replace React component with another react component */}
                            {/* <Route exact path='../pages/client/update'>
                                    <UpdateClient id={e.id} />
                                </Route> */}
                        </div>
                    </Col>
                </a>
                </Row>
    )
}
        </>
    );

}

export default GetClient;