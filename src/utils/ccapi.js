const cheerio = require('cheerio')
const request = require('request')

const ccapi =  (callback)=>{

  request({url: 'https://www.codechef.com/contests'} , (err , res , html)=>{
    if(err) callback('error')
    else{

      
    const $  = cheerio.load(html)
    const tabledata = $('#future-contests').next().find('tbody').html()
      console.log(tabledata)
    callback(tabledata)
    }
  })

}
ccapi((table)=>{})

module.exports = ccapi

