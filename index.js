const express = require('express')
const app =  express();
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')
const {router : alpacaRoutes} = require('./routes/alpaca')
const userRoutes = require('./routes/users')
const stockRoute = require('./routes/stocks')
// Middleware
app.use(express.static('public'))
app.use(morgan('tiny'))

// Routes
app.use('/alpaca', alpacaRoutes);

app.use('/users', userRoutes);
app.use('/stocks', stockRoute)

app.use('*', ((req, res) => {
   res.status(404).send("No Content Found!")
}))

const key = fs.readFileSync("./localhost-key.pem", 'utf-8')
const cert = fs.readFileSync("./localhost.pem", 'utf-8')

// app.listen(8000, () => console.log("Node server started on port 8000"))
https.createServer({key, cert}, app).listen(8000)