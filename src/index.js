/**
 * Main file
 */
//Utility functions
const cfapi = require('./utils/cfapi')
const ccapi = require('./utils/ccapi')

//npm modules 
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const indexpath=path.join(__dirname,'../public') //Path of static files
const viewsPath=path.join(__dirname,'../templates/views') //Path of hbs views 

const app = express()//starting server

const port = process.env.PORT||3000;//seting up port

app.set('view engine' , 'hbs')
app.set('views' , viewsPath)

app.use(express.static(indexpath))

//This is the main page
app.get('' , (req , res)=>{
    res.render('index')//index.hbs is being shown
})

//about page
app.get('/about' , (req , res)=>{
    res.render('about')
})

//contact page
app.get('/contact' , (req , res)=>{
    res.send('<h1>Temp page 1</h1>')
})

app.get('/query' , (req,res)=>{
    //If codeforces contests details are required
  if(req.query.site==='codeforces')
  {
        //Contains a callback function which contains list of contests 
      cfapi((constestList)=>{
        if(constestList==='An error has occurred') 
        {
            res.send({error:"error"})//error handling in case api  fails to work
        }   
        
        else
        {
            res.send(constestList)//this sends back list to the front end
        }
      })
  }
  //If codechef contests details are required
  else if(req.query.site==='codechef')
  {
      //data contains the html form the contests list
    ccapi((data)=>{
        console.log(data)
        if(data==='error') res.send({error:data});//error handling
        else res.send({data});
        
    })
  }  
})

//starting the server
app.listen(port , ()=>{
    console.log('Listening to port '+port)
})