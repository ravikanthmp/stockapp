const express = require('express')
const app =  express();
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')
const {router : alpacaRoutes} = require('./routes/alpaca')
const userRoutes = require('./routes/users')
const stockRoute = require('./routes/stocks')
const newsRoute = require('./routes/newsfeed')
var cors = require('cors')

// Middleware
app.use(cors());
app.use(express.static('public'))
app.use(morgan('tiny'))

// Routes
app.use('/alpaca', alpacaRoutes);
app.use('/users', userRoutes);
app.use('/stocks', stockRoute)
app.use('/news', newsRoute);

app.use('*', ((req, res) => {
   res.status(404).send("No Content Found!")
}))

app.listen(8000, () => console.log("Node server started on port 8000"))
