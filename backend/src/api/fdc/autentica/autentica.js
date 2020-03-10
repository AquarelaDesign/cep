const querystring = require('querystring')
const axios = require('axios')
const db = require('../../../config/database')

const findOne = (data, res) => {
   try {      
      Param = querystring.stringify(data)
      Param += '&rand=' + Math.floor((Math.random() * 999999))

      axios.post(db + '?' + Param)
      .then(response => {
         res = response.data.ProDataSet
         //console.log('axios res', res)
         return res
      })
      .catch(err => {
         console.log('axios error', err)
         return err
      })
      
   } catch (err) {
      console.log('findOne', err)
      return err
   }   
}

module.exports = { findOne }




