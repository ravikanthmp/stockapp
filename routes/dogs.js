const express = require('express');
const router = express.Router();

router.get('/', ((req, res, next) => {
    try {
        const query = "select * from breeds1;";
        pool.query(query, (error, results) => {
            if (error){
                throw error;
            }else {
                return results;
            }
        })

    }catch (e){
        console.log(`Caught error ${e}`)
        res.status(500).send(e
        )
    }
}))

module.exports = router;