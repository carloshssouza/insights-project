const express = require('express');
const Redis = require('redis');

const redisClient = Redis.createClient({
    host: '127.0.0.1',
    no_ready_check: true,
    auth_pass: 'root'
});

const routes = express.Router();

routes.post("/registration", async (req, res) => {
    try {
        const { email,
            stocks,
            realStateFunds,
            coe,
            investimentFunds,
            pensionFunds
        } = req.body

        console.log(JSON.stringify(req.body));

        if (stocks) {
            for (let key in stocks) {
                if (stocks[key] === null) {
                    delete stocks[key];
                }
                if (Array.isArray(stocks[key]) && stocks[key].length === 0) {
                    delete stocks[key];
                } else if(Array.isArray(stocks[key]) && stocks[key].length > 0) {
                    console.log("entrou1")
                    const value = stocks[key].map((element) => {
                        return element.value
                    })
                    stocks[key] = value;
                }
            }
        }
        if (realStateFunds) {
            for (let key in realStateFunds) {
                if (realStateFunds[key] === null) {
                    delete realStateFunds[key];
                }
                if (Array.isArray(realStateFunds[key]) && realStateFunds[key].length === 0) {
                    delete realStateFunds[key];
                } else if(Array.isArray(realStateFunds[key]) && realStateFunds[key].length > 0){
                    console.log("entrou2")
                    const value = realStateFunds[key].map((element) => {
                        return element.value
                    })
                    realStateFunds[key] = value;
                }
            }
        }
        if (coe) {
            for (let key in coe) {
                if (coe[key] === null) {
                    delete coe[key];
                }
                if (Array.isArray(coe[key]) && coe[key].length === 0) {
                    delete coe[key];
                } else if(Array.isArray(coe[key]) && coe[key].length > 0) {
                    console.log("entrou3")
                    const value = coe[key].map((element) => {
                        return element.value
                    })
                    coe[key] = value;
                }
            }
        }
        if (investimentFunds) {
            for (let key in investimentFunds) {
                if (investimentFunds[key] === null) {
                    delete investimentFunds[key];
                }
                if (Array.isArray(investimentFunds[key]) && investimentFunds[key].length === 0) {
                    delete investimentFunds[key];
                } else if(Array.isArray(investimentFunds[key]) && investimentFunds[key].length > 0) {
                    console.log("entrou1")
                    const value = investimentFunds[key].map((element) => {
                        return element.value
                    })
                    investimentFunds[key] = value;
                }
            }
        }
        if (pensionFunds) {
            for (let key in pensionFunds) {
                if (pensionFunds[key] === null) {
                    delete pensionFunds[key]
                }
                if (Array.isArray(pensionFunds[key]) && pensionFunds[key].length === 0) {
                    delete pensionFunds[key];
                } else if (Array.isArray(pensionFunds[key]) && pensionFunds[key].length > 0) {
                    console.log("entrou1")
                    const value = pensionFunds[key].map((element) => {
                        return element.value
                    })
                    pensionFunds[key] = value;
                }
            }
        }

        const data = {
            email,
            stocks,
            realStateFunds,
            coe,
            investimentFunds,
            pensionFunds
        }

        redisClient.set(`user:${email}`, JSON.stringify(data));
        res.status(201).json({message: 'Registrado com sucesso'})
    } catch (error) {
        console.error(error)
    }

})

routes.post('/recommendation', async (req, res) => {
    try {
        // Socket to emit to publisher server
        if (req.body.email) {
            const io_publisher = require('socket.io-client');
            const node_client_ws = io_publisher(`ws://publisher_service:8001/stream/products?email=${req.body.email}&past_ms=86400000`);
            await node_client_ws.on('publisherEvent', async (data) => {
                res.json(data)
            });
            setTimeout(async () => {
                await node_client_ws.disconnect()
            }, 1000);
        } else {
            res.status(400).json({ message: 'Problem in the email' });
        }
    } catch (error) {
        console.error(error)
    }
})

module.exports = routes;
