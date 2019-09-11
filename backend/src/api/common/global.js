const ajustaRes = (data) => {
   var obj = ""
   //console.log('ajustaRes', data)
   if (data.length > 0) {
       for ( var x = 0; x < data.length; ++x ) {
           obj += JSON.stringify(data[x]).replace(/_id/g, 'id') + ','
       }
   } else {
       obj += JSON.stringify(data).replace(/_id/g, 'id') + ','
   }
   var Data = '['+obj+']'
   return JSON.parse(Data.replace(/,]/g, ']'))
}

module.exports = { ajustaRes }