const express = require('express');
const router = express.Router();
const pool = require('../utils/dbClient');
const {alpaca} = require('./alpaca');
const moment = require('moment');

// all users
router.get('/:tickerName', ((req, res) => {
    try {
        const query = "select * from stockapp.stock where ticker=?;";
        pool.query(query, [req.params.tickerName], (error, results) => {
            if (error) {
                throw error;
            } else {
                return res.json(results);
            }
        })

    } catch (e) {
        console.log(`Caught error ${e}`)
        res.status(500).send(e)
    }
}))

function getLatestTrade(tickerName) {
    return alpaca.getLatestTrade(tickerName, alpaca.configuration);
}

router.get('/fetch/:tickerName/', ((req, res) => {

    getLatestTrade(req.params.tickerName)
        .then(data => {
            console.log(data)
            return res.json(data)
        })
        .catch(e => {
            return res.status(500).json(e)
        })
}))

router.get('/fetchHistorical/:tickerName/', ((req, res) => {
    return getLatestTrade(req.params.tickerName)
        .then(lastTradePrice => {
            const ticker = req.params.tickerName.toUpperCase();

            const q1 = `insert ignore into stockapp.stock(ticker, current_price) values(\"${ticker}\", ${lastTradePrice.Price});`;

            return new Promise((resolve, reject) => {
                pool.query(q1, [req.params.tickerName], (error, result) => {
                    if (error) {
                        reject(error)
                    }else {
                        resolve(result)
                    }
                });
            })

            }
        )
        .then(result => fetchBars(req.params.tickerName))
        .then(data => {
            try{
                const ticker = req.params.tickerName.toUpperCase();

                let newVals = data.map(row => {
                    let iso = moment(row.Timestamp).format('YYYY-MM-DD');
                    let d2 = [ticker, iso, row.OpenPrice, row.HighPrice, row.LowPrice, row.ClosePrice, row.Volume]
                    return d2;
                });

                return new Promise((resolve, reject) => {
                    pool.query( 'INSERT ignore INTO stock_price_historical_daily(ticker, day, open, high, low, close, volume)  values ?', [newVals], (err, result) => {
                        if (err){
                            console.log("couldn't save to DB 🙁. Reason " + err)
                            reject(err)
                        }else {
                            resolve(result)
                        }
                    });
                })


            }catch (e) {
                console.log("couldn't fetch historical prices from DB 🙁")
            }
        })
        .then(dataFromDB => {
            console.log(`from DB` + JSON.stringify(dataFromDB))
            const q1 = `select * from stock_price_historical_daily where ticker = ?;`;
            pool.query(q1, [req.params.tickerName], (err, result) => {
                 if (err){
                    throw new Error(err)
                }else {
                    return res.json(result)
                }
            });

        })
        .catch(err => {
            console.log(err)
            return res.status(500).send("Error")
        });
}));


const fetchHistorical =  async (ticker, startDate) => {
    // last 60 days
    const today =  moment().subtract(1, 'day').format("YYYY-MM-DD");
    const sixtyDaysAgo = moment().subtract(10, 'day').format("YYYY-MM-DD")


    if (!startDate){
        startDate = sixtyDaysAgo;
    }

    return await alpaca.getAggregates(ticker,'day', startDate, today)
        .then(data => {
            const results = data.results
            const bars = [];

            for (let b of results) {
                bars.push(b)
            }

            return bars;
        });


}

const fetchBars = async (ticker, startDate) => {
    const today =  moment().subtract(1, 'day').format("YYYY-MM-DD");
    const sixtyDaysAgo = moment().subtract(365, 'day').format("YYYY-MM-DD")


    if (!startDate){
        startDate = sixtyDaysAgo;
    }

    let resp = alpaca.getBarsV2(
        ticker,
        {
            start: startDate,
            end: today,
            // limit: 2,
            timeframe: "1Day",
            adjustment: "raw",
        },
        alpaca.configuration
    );
    const bars = [];
    for await (let b of resp) {
        bars.push(b)
    }

    return bars;
}

module.exports = router;