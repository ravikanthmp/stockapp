const express = require('express');
const router = express.Router();
const users = require('../public/data/sample-users')
const watchlists = require('../public/data/sample-watchlists')
const pool = require('../utils/dbClient');

// all users
router.get('/all', ((req, res) => {
    try {
        const query = "select * from stockapp.users;";
        pool.query(query, (error, results) => {
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

// particular user
router.get('/:id', ((req, res) => {
    try {
        const query = "select * from stockapp.users where id=?;";
        pool.query(query, [req.params.id], (error, results) => {
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

// user watchlists
router.get('/:id/watchlists', ((req, res) => {
    try {
        const query = "select watchlist.* \n" +
            "from watchlist join users u on u.id = watchlist.user_id" +
            " where u.id = ?;"
        pool.query(query, [req.params.id], (error, results) => {
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

// create watchlist
router.post('/:id/watchlists', ((req, res, next) => {
    try {
        const query = "insert into stockapp.watchlist (user_id) values (?);"
        pool.query(query, [req.params.id], (error, results) => {
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




module.exports = router;