const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://127.0.0.1:27017/cep', {
    useMongoClient: true,
})