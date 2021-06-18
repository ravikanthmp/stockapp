const express = require('express');
const router = express.Router();
const Alpaca = require('@alpacahq/alpaca-trade-api')
require('dotenv').config();

const alpaca = new Alpaca({
    keyId: process.env.ALPACA_KEY,
    secretKey:  process.env.ALPACA_SECRET_KEY,
    paper: true,
    usePolygon: false
})


router.get('/account', ((req, res) => {
    alpaca.getAccount().then((account) => {
        console.log('Current Account:', account)
        res.status(200).send(account)
    })

}))

module.exports = {
    router,
    alpaca
};