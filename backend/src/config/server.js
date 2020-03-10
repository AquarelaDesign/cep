const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)

mongoose.connect('mongodb://procyon:p40c10n@168.194.69.79:27017/cep', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

app.use(cors())
app.use(express.json())

server.listen(3003, function() {
    console.log(`BACKEND está sendo executado na porta 3003.`)
})

module.exports = app