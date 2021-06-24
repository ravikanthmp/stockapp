const express = require('express');
const router = express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSFEED_API_KEY);

// all finance
router.get('/allfinance', (async (req, res) => {

    try {
        const data = await fetchTopFinanceHeadlines();
        res.json(data)
    }catch (err){
        res.status(500).send(err);
    }
}))


async function fetchTopFinanceHeadlines() {
    return newsapi.v2.topHeadlines(
        {
            category: 'business',
            language: 'en',
            country: 'us'
        }
    ).then((response) => {
        return response;
    }).catch(err => {
        throw new Error(err)
    });

}

module.exports = router;