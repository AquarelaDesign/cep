//const restful = require('node-restful')
//const mongoose = restful.mongoose
const { Schema, model } = require('mongoose')

const geoSchema = new Schema({
    cep: { type: Number, required: true },
    Tipo_Logradouro: { type: String, required: false },
    Logradouro: { type: String, required: false },
    Complemento: { type: String, required: false },
    Bairro: { type: String, required: false },
    Cidade: { type: String, required: false },
    cod_cidade: { type: Number, required: false },
    UF: { type: String, required: false },
    Estado: { type: String, required: false },
    cod_estado: { type: Number, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
}, { collection: 'geo' })

const cepSchema = new Schema({
    CEP: { type: Number, required: true },
    Tipo_Logradouro: { type: String, required: false },
    Logradouro: { type: String, required: false },
    Complemento: { type: String, required: false },
    Bairro: { type: String, required: false },
    Cidade: { type: String, required: false },
    cod_cidade: { type: Number, required: false },
    UF: { type: String, required: false },
    Estado: { type: String, required: false },
    cod_estado: { type: Number, required: false },
    geo: [geoSchema]
}, { collection: 'integrada' })


module.exports = model('CEP', cepSchema)