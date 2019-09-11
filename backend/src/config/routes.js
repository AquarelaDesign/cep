const express = require('express')

module.exports = function(server) {

    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // TODO Routes
    const cepService = require('../api/cep/cepService')
    cepService.register(router, '/cep')
}