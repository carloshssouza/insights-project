import React, { useState, useEffect } from "react";

import "../pages/advisor/home.css";

import axios from "axios";
import { withRouter } from "react-router-dom";
import { Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { BsPersonFill, BsBagPlusFill, BsBarChartFill, BsPatchPlusFill, BsFillTrashFill } from "react-icons/bs";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


class GetPortifolios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            clients: [],
            clientsName: [],
            companies: [],
            values: [],
            dates: [],
            info: {},
            MySwal: withReactContent(Swal)
        };

        // this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        const self = this
        let result = await axios.get('http://localhost:5004/portfolios/advisor/' + window.sessionStorage.getItem('adv_id'),
            {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });

        let data = result.data;
        console.log(data);
        console.log(data.portfolios);
        self.setState({ res: data.portfolios })

        let response = await axios.get('http://localhost:5001/clients')
        let _clientsId = [];
        let _clientsName = [];

        response.data.map((item) => {
            if (item.advisor_id == window.sessionStorage.getItem('adv_id')) {
                _clientsId.push(item.id)
                _clientsName.push(item.name)
            }
        });

        //Request da lista das siglas das empresas
        var config = {
            method: 'get',
            url: 'http://localhost:5003/assets',
            headers: {}
        };
        let _companies;
        axios(config)
            .then(function (response) {
                _companies = response.data;
                self.setState({ companies: _companies })
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log("companies: " + companies);

        self.setState({ clients: _clientsId })
        self.setState({ clientsName: _clientsName })
        // console.log("Clientes ids: " + clients)
    };

    // res.map((e) => e.products.length == 0 ? console.log('true') : console.log('false'));
    // console.log("Leng.: " + res.length);

    async _modal(e, id) {
        console.log("ElemID: " + id);
        //https://sweetalert2.github.io/#input-types
        const options = new Map();

        this.state.clients.forEach((elem) => options.set(elem, elem));

        let optString = '';
        this.state.clients.forEach((elem, index) => optString +=
            '<input id="' + elem + '" type="checkbox" value="' + elem + '" class="swal-input' + elem + '"> <label for="' + elem + '">' + this.state.clientsName[index] + '</label><br /> '
        )
        console.log("OPT" + optString)

        // Funciona para o inputOptions
        // const mapa = new Map();
        // const a = [1, 3, 5]
        // a.forEach((elem) => mapa.set(elem, elem));

        const inputOptions = options;
        // {
        // 1: "1",
        // 3: "3"
        // }; 
        console.log("OPT2: " + typeof (inputOptions))

        //Multiple checkboxes: https://stackoverflow.com/questions/55386918/sweet-alert-2-multiple-checkbox

        const { value: opt } = await this.state.MySwal.fire({
            title: 'Recomende para: ',
            html: optString,
            confirmButtonColor: "#212121",
            // '<input id="swal-input1" type="checkbox" value="1" class="swal2-input"> <label for="swal-input1">Opt 1</label>' +
            // '<input id="swal-input2" type="checkbox" value="2" class="swal2-input"> <label for="swal-input2">Opt 2</label>',
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                let result = []
                //Fazer a verificação pq tá voltando todos
                this.state.clients.forEach((elem) => {
                    if (document.getElementById(elem).checked) {
                        result.push(parseInt(document.getElementById(elem).value))
                    }
                }
                )
                return result
            }
        })

        if (opt) {
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
                        this.state.MySwal.fire("Sucesso");
                    } else {
                        this.state.MySwal.fire(JSON.stringify(response.data));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    async _modal2(e, id) {
        const { value: formValues } = await this.state.MySwal.fire({
            title: 'Período',
            html:
                'Data inicial:' +
                '<input type="date" id="swal-input1" class="swal2-input">' +
                '<br> Data final:' + '<input type="date" id="swal-input2" class="swal2-input">',
            focusConfirm: false,
            showCancelButton: true,
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

    async _modal3(e, id) {
        const self = this
        // console.log(companies);
        const options = new Map();

        // var sortCompanies = companies.sort();
        self.state.companies.sort().forEach((elem) => options.set(elem, elem));

        //String para formar o html dos valores de input
        let optString = '<datalist id="myList">'
        self.state.companies.sort().forEach((elem) => optString +=
            // '<input id="' + elem + '" type="checkbox" value="' + elem + '" class="swal-input' + elem + '"> <label for="' + elem + '">' + this.state.clientsName[index] + '</label><br /> '
            '<option value="' + elem + '" />'
        );
        optString += '</datalist>'

        const { value: company } = await self.state.MySwal.fire({
            title: 'Selecione uma empresa',
            html: optString,
            input: 'text',
            inputAttributes: {
                list: 'myList'
            },
            // inputOptions: options,
            inputPlaceholder: 'Empresas',
            showCancelButton: true,
            confirmButtonColor: "#212121",
        })

        if (company) {
            var cp = company;
            console.log("\nRESULT: " + company)

            var data = JSON.stringify({
                "symbols": [
                    company
                ]
            });

            var config = {
                method: 'post',
                url: 'http://localhost:5003/assets/info',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            let _hs = [];
            let _dt = [];
            await axios(config)
                .then(async function (response) {
                    console.log(response.data[0])
                    response.data[0].historic.forEach((e) => _hs.push(e.close.toFixed(2)))
                    response.data[0].historic.forEach((e) => _dt.push(e.date))
                    self.setState({ info: response.data[0].info })
                    self.setState({ values: _hs })
                    self.setState({ dates: _dt })
                    // console.log("HS len: " + _hs.length + "\nDT len: " + _dt.length)
                    // console.log("V len: " + self.state.values.length + "\nD len: " + self.state.dates.length)
                }).catch(function (error) {
                    console.log(error);
                });


            // //react-router-dom inside sweetalert
            // //https://qastack.com.br/programming/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4

            self.props.history.push({
                pathname: '/assets/home',
                state: { pf_id: id, company: cp, info: self.state.info, dates: self.state.dates, closes: self.state.values }
            })

            // self.state.MySwal.fire({
            //     title: `Empresa escolhida: ${company}\n`,
            //     showConfirmButton: true,
            //     // html: htmlStr,
            //     onClick: self.props.history.push({
            //         pathname: '/assets/home',
            //         state: { pf_id: parseInt(id), company: company, info: self.state.info, dates: self.state.dates, closes: self.state.values }
            //     }),
            // })
        }
    }

    delete(id) {
        var config = {
            method: 'get',
            url: 'http://localhost:5004/portfolio/delete/' + id,
            headers: { }
          };

          axios(config)
          .then(function (response) {
              if(response.data == 1) {
                  alert("Apagado!");
              }
            // console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <>
                {
                    this.state.res.map((e) =>
                        <Row className="card">
                            <a href="">
                                <div className="space-between">
                                    <span style={{display: "flex", marginTop: "7px", justifyContent: "center"}}> <BsPersonFill size={40}/>   </span>
                                    <span className="card-text" style={{ maxWidth: "28vw", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}> <b>{e.name.toUpperCase()}</b><br /> <b>Ativos:</b> {e.products.length == 0 ? 'Nenhum ativo' : e.products.map((i) => i.id + " | ")}</span>
                                    <span className="card-icons-but" style={{ maxWidth: "25vw", whiteSpace: "nowrap", overflow: "auto", textOverflow: "ellipsis", justifyContent: "end" }}>
                                        {/* BOTÃO RECOMENDAR */}
                                        <div>
                                            <Button
                                                className="white"
                                                style={{ backgroundColor: "transparent", margin: "none", borderColor: "transparent" }}
                                                onClick={
                                                    (elem) => {
                                                        this._modal(elem, e.id);
                                                        elem.preventDefault();
                                                    }
                                                }>
                                                <BsPatchPlusFill size={30} color="black" />
                                                <p style={{ color: "black", margin: "0" }}>Recomendar</p>

                                            </Button>
                                        </div>
                                        {/* BOTÃO BACKTEST */}
                                        <Button
                                            className="white"
                                            style={{ backgroundColor: "transparent", margin: "none", borderColor: "transparent" }}
                                            onClick={
                                                (elem) => {
                                                    this._modal2(elem, e.id);
                                                    elem.preventDefault();
                                                }
                                            }>
                                            <BsBarChartFill size={30} color="black" />
                                            <p style={{ color: "black", margin: "0" }}>Backtest</p>
                                        </Button>
                                        {/* BOTÃO ADICIONAR ATIVOS */}
                                        {/* <Link to={{
                                        pathname: "../assets/home",
                                        state: { pf_id: parseInt(e.id) }
                                    }} > */}
                                        <Button
                                            className="white"
                                            style={{ backgroundColor: "transparent", borderColor: "transparent" }}
                                            onClick={
                                                (elem) => {
                                                    this._modal3(elem, e.id);
                                                    elem.preventDefault();
                                                }
                                            }
                                        >
                                            <BsBagPlusFill size={30} color="black" />
                                            <p style={{ color: "black", margin: "0", wordBreak: "keep-all", whiteSpace: "nowrap" }}>Adicionar Ativos</p>
                                        </Button>
                                        <Button
                                            className="white"
                                            style={{ backgroundColor: "transparent", borderColor: "transparent" }}
                                            onClick={
                                                (elem) => {
                                                    this.delete(e.id);
                                                    elem.preventDefault();
                                                }
                                            }
                                        >
                                            <BsFillTrashFill size={30} color="red" />
                                            <p style={{ color: "black", margin: "0", wordBreak: "keep-all", whiteSpace: "nowrap" }}>Apagar</p>
                                        </Button>

                                        {/* </Link> */}
                                    </span>
                                </div>
                                
                            </a>
                        </Row>
                    )
                }
            </>
        );
    }
}

export default withRouter(GetPortifolios);