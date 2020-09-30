const request = require('request')

const cfapi = (callback)=>{
    const url = ' http://codeforces.com/api/contest.list?gym=false'
    request({url , json:true} , (error , res)=>{
        if(error){
            callback('An error has occurred')
            
        }

        else{
            const resultArray=res.body.result.map((e)=>{
                if(e.phase==='BEFORE') return e;
            })

            callback(resultArray)
           
        }


    })
}


module.exports = cfapi;