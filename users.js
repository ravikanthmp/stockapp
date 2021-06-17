const express = require('express');
const router = express.Router();
const users = require('./public/data/sample-users')
const watchlists = require('./public/data/sample-watchlists')

// all users
router.get('/all', ((req, res) => {
    res.status(200).json(users)
}))

// particular user
router.get('/:id', ((req, res) => {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
}))

// particular user watchlist
router.get('/:id/watchlists', ((req, res) => {
    const watchListIds = users
        .filter(user => user.id === parseInt(req.params.id))
        .flatMap(user => user.watchlists);
    console.log(watchListIds)
    if (Array.length === 0){
        res.json([]);
    }else {
        res.json(watchlists.filter(w => watchListIds.includes(w.id)));
    }

}))


module.exports = router;