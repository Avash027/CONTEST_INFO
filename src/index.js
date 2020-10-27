/**
 * Main file
 */
//Utility functions
const cfapi = require("./utils/cfapi");
const ccapi = require("./utils/ccapi");
const cfdata = require("./utils/cfdata");
//npm modules
const express = require("express");
const hbs = require("hbs");
const path = require("path");

const indexpath = path.join(__dirname, "../public"); //Path of static files
const viewsPath = path.join(__dirname, "../templates/views"); //Path of hbs views

const app = express(); //starting server

const port = process.env.PORT || 3000; //seting up port

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(indexpath));


app.get("",(req,res)=>{
  res.render('main')
})
//This is the main page
app.get("/index", (req, res) => {
  res.render("index"); //index.hbs is being shown
});


app.get("/data", (req, res) => {
  res.render("data");
});

app.get("/query", (req, res) => {
  //If codeforces contests details are required
  if (req.query.site === "codeforces") {
    //Contains a callback function which contains list of contests
    cfapi((constestList) => {
      if (constestList === "An error has occurred") {
        res.send({ error: "error" }); //error handling in case api  fails to work
      } else {
        res.send(constestList); //this sends back list to the front end
      }
    });
  }
  //If codechef contests details are required
  else if (req.query.site === "codechef") {
    //data contains the html form the contests list
    ccapi((data) => {
      console.log(data);
      if (data === "error") res.send({ error: data });
      //error handling
      else res.send({ data });
    });
  } else if (req.query.site === "codefordata") {
    cfdata(req.query.name, (rating, date) => {
      if(rating.error==='error')
      res.send({error:rating.error})
      else
      res.send({ rating: rating, date: date });
    });
  }
});

//starting the server
app.listen(port, () => {
  console.log("Listening to port " + port);
});
