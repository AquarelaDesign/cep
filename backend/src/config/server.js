const port = 3003
const port_ssl = 3004

const bodyParser = require('body-parser')
const allowCors = require('./cors')

const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express')
const mongoose = require('mongoose')
const server = express()

mongoose.connect('mongodb://procyon:p40c10n@168.194.69.79:27017/cep', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

// Certificate
const Certs = JSON.parse(fs.readFileSync(__dirname+'/ssl-dev.json', 'utf8'))
const privateKey = fs.readFileSync(Certs.privateKey, 'utf8')
const certificate = fs.readFileSync(Certs.certificate, 'utf8')
const ca = fs.readFileSync(Certs.ca, 'utf8')

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
}

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

const httpServer = http.createServer(server)
const httpsServer = https.createServer(credentials, server)

httpServer.listen(port, () => {
    console.log(`BACKEND HTTP sendo executado na porta ${port}.`)
})

httpsServer.listen(port_ssl, () => {
	console.log(`BACKEND HTTPS sendo executado na porta ${port_ssl}.`)
})

module.exports = server

/*
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
*/