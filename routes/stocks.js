const express = require('express');
const router = express.Router();
const pool = require('./../utils/dbClient');
const {alpaca} = require('./alpaca');

// all users
router.get('/:tickerName', ((req, res) => {
    try {
        const query = "select * from stockapp.stock where ticker=?;";
        pool.query(query, [req.params.tickerName], (error, results) => {
            if (error){
                throw error;
            }else {
                return res.json(results);
            }
        })

    }catch (e){
        console.log(`Caught error ${e}`)
        res.status(500).send(e)
    }
}))

router.get('/fetch/:tickerName/', ((req, res) => {
    try {
        const data = alpaca.getAsset(req.params.tickerName);
        console.log(data);
        res.json(data);
    }catch (e){
        console.log(`Caught error ${e}`)
        res.status(500).send(e)
    }
}))


module.exports = router;