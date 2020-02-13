const CEP = require('./cep')
const errorHandler = require('../common/errorHandler')
const Global = require('../common/global')

CEP.methods(['get', 'post', 'put', 'delete'])
CEP.updateOptions({new: true, runValidators: true})
CEP.after('post', errorHandler).after('put', errorHandler)

CEP.route('', (req, res, next) => {
    var Cep = 0
    
    if (req.params.id == "" || req.params.id === undefined) {
        Cep = 0
    } else {
        Cep = parseInt(req.params.id)
    }
    
    if (Cep < 0 || Cep === 0 || Cep === undefined) {
        response = {
            "error": true, 
            "message": "CEP inválido", 
            "data": [],
            "total": 0,
        };
        return res.json(response)
    }

    CEP.aggregate([
        {
            $match: { CEP: Cep }
        },
        {
            '$lookup': {
                'from': 'geo', 
                'localField': 'CEP', 
                'foreignField': 'cep', 
                'as': 'geo'
            }
        },
        {
            '$lookup': {
                'from': 'cidade', 
                'localField': 'cod_cidade', 
                'foreignField': 'cod_ibge', 
                'as': 'cidade'
            }
        },
        {
            "$unwind": {
                "path": "$geo",
                "preserveNullAndEmptyArrays": false
            }
        }, 
        { 
            $facet: {
                metadata: [ 
                    { $count: "total" }, 
                ],
                data: [
                    { $skip: 0 }, 
                ]
            }
        }       
    ]).exec((err, data) => {
        if (err) {
            response = {
                "error": true, 
                "message": "Falha na busca dos dados", 
                "data": [],
                "total": 0,
            };
        } else {
            var total = data.length;

            Data = Global.ajustaRes(data)
            
            if (Object.keys(Data[0].metadata).length < 1) {
                total = 0

                response = {
                    "error": true, 
                    "message": "A consulta não retornou resultado", 
                    "data": [],
                    "total": 0,
                };
                res.setHeader('content-range', 0 + '/' + 0)
            } else {
                total = Data[0].metadata[0].total

                response = {
                    "error": false, 
                    "message":"", 
                    "data": Data,
                    "total": total,
                };
                res.setHeader('content-range', total + '/' + total)
            }
            
        }
        res.send(response)
    })

})


module.exports = CEP
