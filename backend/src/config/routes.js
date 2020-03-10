const express = require('express')

const auth = require('./auth')
const cepService = require('../api/cep/cepService')
const Busca = require('../api/fdc/servico')
const Wfcpas = require('../api/fdc/wfcpas')
const AuthService = require('../api/user/authService')

module.exports = function(server) {
    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/v01', protectedApi)
    protectedApi.use(auth)
    protectedApi.post('/busca', Busca.servico)
    protectedApi.post('/wfcpas', Wfcpas.ResumoEtiquetas)
    
    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    const cepApi = express.Router()
    server.use('/api', cepApi)
    cepApi.get('/cep/:id', cepService.servico)
    cepApi.post('/cep/:id', cepService.servico)
}