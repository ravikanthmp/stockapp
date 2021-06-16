const express = require('express')
const app = express();

app.use('*', ((req, res) => {
    res.send("Lol")
}))

app.listen(8000, () => console.log("Node server started on port 8000"))