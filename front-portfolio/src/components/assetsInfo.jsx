import React, { useState, useEffect } from "react";

import axios from "axios";
import LineChart from "./line"

const AssetsInfo = ({ company, pf_id }) => {
    const [historic, setHistoric] = useState([]);
    const [business, setBusiness] = useState([]);
    const [values, setValues] = useState([]);
    const [datetimes, setDatetimes] = useState([]);

    function handleRes(data) {
        //Zerar as variáveis
        setHistoric([]);
        setBusiness([]);
        setValues([]);
        setDatetimes([]);
    

        console.log("DATA: " + data[0]);
        console.log("Info: " + data[0].info.longName);

        //Colhe os dados históricos e os dados da empresa
        setHistoric(data[0].historic);
        setBusiness(data[0].info);
        console.log("Hs.: " + historic[0]);
        console.log("-----------------------------------------------------------------");
        //Separa os dados históricos em valores e datas
        historic.map((e) => {
            setValues(oldValues => [...oldValues, e.close.toFixed(2)]);
            // setDatetimes(oldDt => [...oldDt, e.date]);
        });
        historic.map((e) => {
            // setValues(oldValues => [...oldValues, e.close.toFixed(2)]);
            setDatetimes(oldDt => [...oldDt, e.date]);
        });

        //Um monte de console.log não tão necessário, usados por enquanto, para os testes
        console.log("Date Type " + typeof (historic[0].date));
        console.log("Close Type " + typeof (historic[0].close));
        console.log("VAL.: " + values + ' ' + Array.isArray(values));
        console.log("-----------------------------------------------------------------");
        console.log("Dt.: " + datetimes);
        console.log("-----------------------------------------------------------------");
    }

    useEffect(() => {
        const req = async () => {

            console.log("SYMBOLS: " + company);
            var data = JSON.stringify({
                "symbols": company
            });

            var config = {
                method: 'post',
                url: 'http://localhost:5003/assets/info',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then((response) => handleRes(response.data))
                .catch(function (error) {
                    console.log(error);
                });
        }

        req();
    }, [company]);

    return (
        <>
            <div>
                <LineChart closes={values} dates={datetimes} infos={business} company={company} portifolio={pf_id}/>
            </div>
        </>
    );
};

export default AssetsInfo;