const express = require('express')
const cors=require('cors')
const app = express()

app.use(cors())


app.get('/user/:id', function (req, res) {
    const {id}=req.params
    res.send(id)
})
app.get('/dog', function (req, res) {
    res.json({'sound': '멍멍'})
})
app.get('/cat', function (req, res) {
    res.send('냥')
})


app.listen(3000)