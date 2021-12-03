import React, { useState } from 'react';

import "./charts.css"

import { Line } from 'react-chartjs-2';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

function handleSubmit(am, p, c, pf) {
    console.log('{"id": "' + c + '", "proportion": ' + p + ', "amount": ' + am + '}');
    var res = JSON.stringify({
        "portfolio_id": pf,
        "products": [
            {
              "id": c,
              "proportion": (p/100),
              "amount": parseFloat(am)
            }
          ]
    });
    console.log("RES " + res);
    var config = {
        method: 'post',
        url: 'http://localhost:5004/product/add',
        headers: {
            'Content-Type': 'application/json'
        },
        data: res
    };

    axios(config)
        .then(function (response) {
            console.log(response)
            alert('Ativo adicionado!');
            window.location.reload();
        })
        .catch(function (error) {
            alert(error);
        });

    // return 'a';
}

const buildData = (chartDataVal, chartDataDt) => ({
    labels: chartDataDt,
    datasets: [
        {
            label: 'Close: $',
            data: chartDataVal,
            pointRadius: 0,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 255, 255, 1)',
        },
    ],
});

const options = {
    bezierCruve: true,
    plugins: {
        legend: {
            display: false,
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                display: false,
                drawBorder: false,
                color: 'rgba(255, 255, 255, 1)'
            },
        },

        xAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                circular: true,
                borderColor: 'rgba(255, 255, 255, .2)',
                color: 'rgba(255, 255, 255, .2)',
                borderDash: [5, 5]
            },
        },
    },
    layout: {
        padding: 50
    },
    maintainAspectRatio: false
};

const LineChart = ({ closes, dates, infos, company, portifolio }) => {

    const data = buildData(closes, dates);
    const [amounts, setAmounts] = useState(1.0);
    const [propt, setPropt] = useState(1.0);

    return (
        <>
            <div className='chart-container'>
                <Row>
                    <Col>
                        <Line data={data} options={options} width={100} height={300} />
                    </Col>
                    <Col>
                        <div className='chart-container-infos'>
                            <img src={infos.logo_url} alt="Logo" className='buss-logo' />
                            <h3>{infos.longName}</h3>
                            <h4>{infos.state} - {infos.country}</h4>
                            <b>Tipo da empresa: </b> {infos.industry} <br />
                            <b>Funcionários: </b> {infos.employees} pessoas<br />
                            <b>Dividend Yeld: </b> {infos.dividendYield} <br />
                        </div>
                    </Col>
                </Row>
                <Col sm={8} className='card-input-field'>
                    <Form onSubmit={(e) => handleSubmit(amounts, propt, company[0], portifolio)}>
                        <FormGroup row>
                            <Label
                                for="amounts"
                                sm={2}
                            >
                                Valor:
                            </Label>
                            <Col sm={3}>
                                <Input
                                    id="amounts"
                                    name="amounts"
                                    placeholder="$0.0"
                                    type="number"
                                    step={0.01}
                                    onChange={(e) => setAmounts(e.target.value)}
                                />
                            </Col>

                            <Label
                                for="proportions"
                                sm={2}
                            >
                                Proporção:
                            </Label>
                            <Col sm={3}>
                                <Input
                                    id="proportions"
                                    name="proportions"
                                    placeholder="0-100(%)"
                                    type="number"
                                    step={0.1}
                                    min={0.1}
                                    max={100}
                                    onChange={(e) => setPropt(e.target.value)}
                                />
                            </Col>
                        </FormGroup>
                        <div>
                            <Button secondary>
                                Adicionar ao portifólio
                            </Button>
                        </div>
                    </Form>
                </Col>
            </div>

        </>
    );
};

export default LineChart;