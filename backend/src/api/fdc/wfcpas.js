const _ = require('lodash')
const env = require('../../.env')

const querystring = require('querystring')
const axios = require('axios')
const db = require('../../config/database')

exports.ResumoEtiquetas = (req, res) => {
    const email = req.body.email || ''
    const idtrans = req.body.idtrans || ''

    try {      
        param = { 
            'pservico': 'wfcpas',
            'pmetodo': 'ResumoEtiquetas',
            'pcodprg': 'TFCINI',
            'pemail': email,
            'widtrans': idtrans 
        }
        
        Param = querystring.stringify(param)
        Param += '&rand=' + Math.floor((Math.random() * 999999))
  
        axios.post(db + '?' + Param)
        .then(response => {
            result = response.data.ProDataSet
            retorno = result.ttretorno.length > 0 ? result.ttretorno[0] : null
            
            if (result.ttresetq !== undefined ) {
                Data = result.ttresetq.length > 0 ? result.ttresetq[0] : null
            } else {
                Data = null
            }
            
            if (retorno.tipret != 'err') {
                const data = Data
                res.json({ data })
            } else {
                return res.status(400).send({ errors: [retorno.mensagem] })
            }
            
        })
        .catch(err => {
           console.log('Erro na conexão com o serviço', err)
           return err
        })
        
     } catch (err) {
        console.log('Erro na autenticação', err)
        return err
     }   
}
