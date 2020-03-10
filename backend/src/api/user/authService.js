const _ = require('lodash')
const jwt = require('jsonwebtoken')
//const bcrypt = require('bcrypt')
//const fccau = require('../fdc/autentica/autentica')
const env = require('../../.env')

const querystring = require('querystring')
const axios = require('axios')
const db = require('../../config/database')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

const login = (req, res, next) => {
    const email = req.body.email || ''
    const senha = req.body.senha || ''

    try {      
        data = { 
            'pservico': 'wficha',
            'pmetodo': 'autentica',
            'pcodprg': 'siare',
            'pemail': email,
            'psenha': senha 
        }
        
        Param = querystring.stringify(data)
        Param += '&rand=' + Math.floor((Math.random() * 999999))
  
        axios.post(db + '?' + Param)
        .then(response => {
            result = response.data.ProDataSet
            
            retorno = result.ttretorno.length > 0 ? result.ttretorno[0] : null
            
            if (result.ttfcusu !== undefined ) {
                Oficina = result.ttfcusu.length > 0 ? result.ttfcusu[0] : null
            } else {
                Oficina = null
            }
            
            //console.log('retorno', retorno)
            //console.log('Oficina', Oficina)
            
            if (retorno.tipret != 'err') {
                const token = jwt.sign({...Oficina }, env.authSecret, {
                    expiresIn: "180 day"
                })
                const oficina = Oficina
                //const { email } = email
                //console.log('oficina', Oficina)
                res.json({ oficina, token })
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
  
    
    /*
    fccau.findOne(
        { 
            'pservico': 'wficha',
            'pmetodo': 'autentica',
            'pcodprg': 'siare',
            'pemail': email,
            'psenha': senha 
        }, (err, user) => {
            console.log('fccau.findOne', user, err)

            if (err) {
                return sendErrorsFromDB(res, err)
                    //} else if (user && bcrypt.compareSync(senha, user.senha)) {
            } else if (user && (senha == user.senha)) {
                const token = jwt.sign({...user }, env.authSecret, {
                    expiresIn: 60 //"1 day"
                })
                const { email } = user
                res.json({ email, token })
            } else {
                return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
            }
        }
    )
    */
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''

    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    const e_mail = req.body.e_mail || ''
    const senha = req.body.senha || ''
    const senha2 = req.body.senha2 || ''

    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] })
    }

    if (!senha.match(senha2)) {
        return res.status(400).send({
            errors: [
                "As Senhas informadas não coicidem."
            ]
        })
    }

    //const salt = bcrypt.genSaltSync()
    //const passwordHash = bcrypt.hashSync(password, salt)
    //if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
    if (senha2 != senha) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    fccau.findOne({ 'e_mail': email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            //const newUser = new fccau({ nome, e_mail, senha: passwordHash })
            const newUser = new fccau({ nome, e_mail, senha })
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup, validateToken }
