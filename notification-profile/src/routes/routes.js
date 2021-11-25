const express = require('express');
const Redis = require('redis');

const redisClient = Redis.createClient({
    host: '127.0.0.1',
    no_ready_check: true,
});

const routes = express.Router();

routes.post("/registration", async (req, res) => {
    try {
        const { email,
            stocks,
            realStateFunds,
            coe,
            investmentFunds,
            pensionFunds
        } = req.body

        console.log(req.body);
        console.log(JSON.stringify(req.body));

        let data = {email}

        if (stocks) {
            for (let key in stocks) {
                if (stocks[key] === null) {
                    delete stocks[key];
                }
                if (Array.isArray(stocks[key]) && stocks[key].length === 0) {
                    delete stocks[key];
                } else if(Array.isArray(stocks[key]) && stocks[key].length > 0) {
                    const value = stocks[key].map((element) => {
                        return element.value
                    })
                    stocks[key] = value;
                }
            }
            data.stocks = stocks
        }
        if (realStateFunds) {
            for (let key in realStateFunds) {
                if (realStateFunds[key] === null) {
                    delete realStateFunds[key];
                }
                if (Array.isArray(realStateFunds[key]) && realStateFunds[key].length === 0) {
                    delete realStateFunds[key];
                } else if(Array.isArray(realStateFunds[key]) && realStateFunds[key].length > 0){
                    const value = realStateFunds[key].map((element) => {
                        return element.value
                    })
                    realStateFunds[key] = value;
                }
            }
            data.realStateFunds = realStateFunds
        }
        if (coe) {
            for (let key in coe) {
                if (coe[key] === null) {
                    delete coe[key];
                }
                if (Array.isArray(coe[key]) && coe[key].length === 0) {
                    delete coe[key];
                } else if(Array.isArray(coe[key]) && coe[key].length > 0) {
                    const value = coe[key].map((element) => {
                        return element.value
                    })
                    coe[key] = value;
                }
            }
            data.coe = coe
        }
        if (investmentFunds) {
            for (let key in investmentFunds) {
                if (investmentFunds[key] === null) {
                    delete investmentFunds[key];
                }
                if (Array.isArray(investmentFunds[key]) && investmentFunds[key].length === 0) {
                    delete investmentFunds[key];
                } else if(Array.isArray(investmentFunds[key]) && investmentFunds[key].length > 0) {
                    const value = investmentFunds[key].map((element) => {
                        return element.value
                    })
                    investmentFunds[key] = value;
                }
            }
            data.investmentFunds = investmentFunds
        }
        if (pensionFunds) {
            for (let key in pensionFunds) {
                if (pensionFunds[key] === null) {
                    delete pensionFunds[key]
                }
                if (Array.isArray(pensionFunds[key]) && pensionFunds[key].length === 0) {
                    delete pensionFunds[key];
                } else if (Array.isArray(pensionFunds[key]) && pensionFunds[key].length > 0) {
                    const value = pensionFunds[key].map((element) => {
                        return element.value
                    })
                    pensionFunds[key] = value;
                }
            }
            data.pensionFunds = pensionFunds
        }

        for (let key in data) {
            console.log(key)
            console.log(data[key])
            if (JSON.stringify(data[key]) === '{}') {
                delete data[key]
            }
        }
        redisClient.set(`user:${email}`, JSON.stringify(data));
        console.log(`user:${email}`)
        console.log(data)
        res.status(201).json({message: 'Registrado com sucesso'})
    } catch (error) {
        console.error(error)
    }

})

routes.post('/recommendation', async (req, res) => {
    const WebSocket = require('ws');
    try {
        // Socket to emit to publisher server
        if (req.body.email) {
            const url = `ws://localhost:8001/stream/products?email=${req.body.email}&past_ms=86400000`
            const connection = new WebSocket(url)
            connection.onmessage = e => {
                res.status(201).json({message: JSON.parse(e.data)})               
            }
            setTimeout(() => {
                connection.close();
            }, 6000)
        } else {
            res.status(400).json({ message: 'Problem in the email' });
        }
    } catch (error) {
        console.error(error)
    }
})

module.exports = routes