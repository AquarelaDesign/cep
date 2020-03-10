const querystring = require('querystring')
const axios = require('axios')
const db = require('../../config/database')

exports.servico = (req, res) => {
    const pservico = req.body.pservico || ''
    const pmetodo = req.body.pmetodo || ''
    const pcodprg = req.body.pcodprg || ''
    const pemail = req.body.pemail || ''
    const params = req.body.params || ''

    try {      
        par = { 
            'pservico': pservico,
            'pmetodo': pmetodo,
            'pcodprg': pcodprg,
            'pemail': pemail
        }
        //'widtrans': widtrans 

        param = Object.assign(par, params)
        
        Param = querystring.stringify(param)
        Param += '&rand=' + Math.floor((Math.random() * 999999))
        //res.json({ data : db + '?' + Param })
  
        axios.post(db + '?' + Param)
        .then(response => {
            result = response.data.ProDataSet
            retorno = result.ttretorno.length > 0 ? result.ttretorno[0] : null
            
            //res.json(result)

            if (result !== undefined ) {
                Data = result //.length > 0 ? result : null
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
