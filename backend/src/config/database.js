const mongoose = require('mongoose')
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://procyon:p40c10n@168.194.69.79:27017/cep', {useMongoClient: true})
