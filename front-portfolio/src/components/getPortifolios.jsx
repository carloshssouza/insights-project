import React, { useState, useEffect } from "react";

import "../pages/advisor/home.css";

import axios from "axios";
import { Route, Link, Switch } from "react-router-dom";
import { Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { BsPersonFill, BsBagPlusFill, BsBarChartFill, BsPatchPlusFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function GetPortifolios() {

    const [res, setRes] = useState([]);
    const [clients, setClients] = useState([]);
    const [clientsName, setClientsName] = useState([]);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const req = async () => {

            let result = await axios.get('http://localhost:5004/portfolios/advisor/' + window.sessionStorage.getItem('adv_id'),
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });

            let data = result.data;
            console.log(data);
            console.log(data.portfolios);
            setRes(data.portfolios);

            let response = await axios.get('http://localhost:5001/clients')
            let _clientsId = [];
            let _clientsName = [];

            response.data.map((item) => {
                if (item.advisor_id == window.sessionStorage.getItem('adv_id')) {
                    _clientsId.push(item.id)
                    _clientsName.push(item.name)
                }
            });
            setClients(_clientsId)
            setClientsName(_clientsName)
            // console.log("Clientes ids: " + clients)
        }

        req();
    }, []);

    // res.map((e) => e.products.length == 0 ? console.log('true') : console.log('false'));
    // console.log("Leng.: " + res.length);

    const _modal = async (e, id) => {
        console.log("ElemID: " + id);
        //https://sweetalert2.github.io/#input-types
        const options = new Map();

        clients.forEach((elem) => options.set(elem, elem));

        let optString = '';
        clients.forEach((elem, index) => optString +=
            '<input id="' + elem + '" type="checkbox" value="' + elem + '" class="swal-input' + elem + '"> <label for="' + elem + '">' + clientsName[index] + '</label><br /> '
        )
        console.log("OPT" + optString)

        // Funciona para o inputOptions
        // const mapa = new Map();
        // const a = [1, 3, 5]
        // a.forEach((elem) => mapa.set(elem, elem));

        const inputOptions = options;
        // {
        //     1: "1",
        //     3: "3"
        // }; 
        console.log("OPT2: " + typeof (inputOptions))

        //Multiple checkboxes: https://stackoverflow.com/questions/55386918/sweet-alert-2-multiple-checkbox

        const { value: opt } = await MySwal.fire({
            title: 'Recomende para: ',
            html: optString,
            confirmButtonColor: "#212121",
            // '<input id="swal-input1" type="checkbox" value="1" class="swal2-input"> <label for="swal-input1">Opt 1</label>' +
            // '<input id="swal-input2" type="checkbox" value="2" class="swal2-input"> <label for="swal-input2">Opt 2</label>',
            focusConfirm: false,
            preConfirm: () => {
                let result = []
                //Fazer a verificação pq tá voltando todos
                clients.forEach((elem) => {
                    if (document.getElementById(elem).checked) {
                        result.push(parseInt(document.getElementById(elem).value))
                    }
                }
                )
                return result
            }
        })

        if (opt) {
            // MySwal.fire({ html: `You selected: ${opt}` })
            // MySwal.fire(JSON.stringify(opt))
            var data = JSON.stringify({
                "portfolio_id": id,
                "client_ids": opt
            });

            var config = {
                method: 'post',
                url: 'http://localhost:5004/portfolio/recommend',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    if (response.data == "Success") {
                        MySwal.fire("Sucesso");
                    } else {
                        MySwal.fire(JSON.stringify(response.data));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    const _modal2 = async (e, id) => {
        const { value: formValues } = await MySwal.fire({
            title: 'Período',
            html:
                'Data inicial:' +
                '<input type="date" id="swal-input1" class="swal2-input">' +
                'Data final:' + '<input type="date" id="swal-input2" class="swal2-input">',
            focusConfirm: false,
            confirmButtonColor: "#212121",
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        })

        if (formValues) {
            console.log("Dt1: " + formValues[0] + " Dt2: " + formValues[1])
            var _link = "http://localhost:8501/?portfolio_id=" + id + "&start_date=" + formValues[0] + "&end_date=" + formValues[1];
            console.log(_link);
            // MySwal.fire()
            window.open(_link, '_blank');
        }
    }

    return (
        // if(res.length > 0) {console.log(res.length)}
        <>
            {res.map((e) =>
                <Row className="card">
                    <a href="">
                        <Col className="space-between">
                            <div> <BsPersonFill size={40} />   </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="card-text" style={{ maxWidth: "20vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}> <b>{e.name.toUpperCase()}</b><br /> <b>Ativos:</b> {e.products.length == 0 ? 'Nenhum ativo' : e.products.map((i) => i.id + " | ")}</div>
                            <div className="card-icons-but">
                                {/* BOTÃO RECOMENDAR */}
                                <div>
                                    <Button
                                        className="white"
                                        style={{ backgroundColor: "transparent", margin: "none", borderColor: "transparent" }}
                                        onClick={
                                            (elem) => {
                                                _modal(elem, e.id);
                                                elem.preventDefault();
                                            }
                                        }>
                                        <BsPatchPlusFill size={30} color="black" />
                                        <p style={{ color: "black", margin: "0" }}>Recomendar</p>

                                    </Button>
                                </div>
                                &nbsp;&nbsp;
                                {/* BOTÃO BACKTEST */}
                                <Button
                                    className="white"
                                    style={{ backgroundColor: "transparent", margin: "none", borderColor: "transparent" }}
                                    onClick={
                                        (elem) => {
                                            _modal2(elem, e.id);
                                            elem.preventDefault();
                                        }
                                    }>
                                    <BsBarChartFill size={30} color="black" />
                                    <p style={{ color: "black", margin: "0" }}>Backtest</p>
                                </Button>
                                {/* BOTÃO ADICIONAR ATIVOS */}
                                &nbsp;&nbsp;
                                <Link to={{
                                    pathname: "../assets/home",
                                    state: { pf_id: parseInt(e.id) }
                                }} >
                                    <Button className="white" style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
                                        <BsBagPlusFill size={30} color="black" />
                                        <p style={{ color: "black", margin: "0", wordBreak: "keep-all", whiteSpace: "nowrap" }}>Adicionar Ativos</p>
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </a>
                </Row>
            )
            }
        </>
    );

}