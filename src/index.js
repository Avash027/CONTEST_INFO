const cfapi = require('./utils/cfapi')
const ccapi = require('./utils/ccapi')

const express = require('express')
const hbs = require('hbs')
const path = require('path')

const indexpath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')

const app = express()

const port = process.env.PORT||3000;

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)

app.use(express.static(indexpath))

app.get('' , (req , res)=>{
    res.render('index')
})

app.get('/about' , (req , res)=>{
    res.render('about')
})

app.get('/contact' , (req , res)=>{
    res.send('<h1>Temp page 1</h1>')
})

app.get('/query' , (req,res)=>{
  if(req.query.site==='codeforces')
  {

    
    
      cfapi((constestList)=>{
        if(constestList==='An error has occurred') 
        {
            res.send({error:"error"})
        }   
        
        else
        {
            res.send(constestList)
        }
      })
  }
  else if(req.query.site==='codechef')
  {
    ccapi((data)=>{
        if(data==='error') res.send({error:data});
        else res.send({data});
    })
  }  
})

app.listen(port , ()=>{
    console.log('Listening to port '+port)
})