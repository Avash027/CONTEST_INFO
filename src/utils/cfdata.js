const request = require("request");

const cfdata =  (username , callback) => {
  const url = "http://codeforces.com/api/user.rating?handle=" + username;

  
    var rating=[]
    var date=[]

  request({ url, json: true }, (err, res) => {

      if(res.body.status==='FAILED')
      {
        callback({error:'error'})
      }
      else{
       res.body.result.map(elem=>{
           rating.push(elem.newRating);
           var tempdate = new Date(elem.ratingUpdateTimeSeconds*1000)
           date.push(tempdate.toLocaleDateString())
           
       })
       
       callback(rating,date)
      }
  });

  
};

module.exports = cfdata;
