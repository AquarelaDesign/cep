const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization']

        if (!token) {
            return res.status(403).send({ errors: ['Nenhum token fornecido.'] })
        }

        jwt.verify(token, env.authSecret, function(err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Falha ao autenticar o token.']
                })
            } else {
                // req.decoded = decoded
                next()
            }
        })
    }
}