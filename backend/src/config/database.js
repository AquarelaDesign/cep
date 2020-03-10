const env = require('../.env')

module.exports = env.DB_URL + ':' + env.DB_PORT + '/cgi-bin/' + env.DB_PL + '/' + env.DB_PROG

