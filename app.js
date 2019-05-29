//node Desktop/a/app.js
var express = require('express');//The express module
var app = express();//The app
var DButilsAzure = require('./DButils');//The db utils
var dataBaseHandler = require('./dataBaseHandler')//The db handler
var http = require('http')//The http module
const validation= require('./validation')
const jwt = require("jsonwebtoken");

app.use(express.json());
secret = "yonatanGuy";





var port = 3000;//The port we listen to
app.listen(port, function () {
    console.log('Start listening to port ' + port);
});

/*
    A generic sql script with the following structure

    SELECT 'column' 
    FROM 'table'

*/



app.get('/select/:table/:column', function(req, res){
    //need to check validation
    dataBaseHandler.selectWithoutCondition(req,res)
})

/*
    A generic sql script with the following structure

    SELECT 'column' 
    FROM 'table'
    WHERE 'query'
*/
app.get('/select/:table/:column/:query', function(req, res){
    
   //The consitions should look like this (just an example.. not the right syntax)
   //if(table == poi)
   //   if(all the consitions we want to test)
    //      summon the dataBadeHandler function
    //  else
    //      return error            
    if(validation.getRankByPOI(req,res))
        dataBaseHandler.selectWithCondition(req,res)
    else
        res.status(400).send("something went wrong with the request")
})

/*
    A generic sql script with the following structure

    INSERT INTO 'table' (c1,c2,...)
    VALUES (v1,v2,...)
*/
app.post('/insert/:table/:columns/:values', function(req, res){
    //need to check validation
    dataBaseHandler.postWithoutCondition(req,res)
})

/*
    A generic sql script with the following structure

    DELETE FROM 'table'
    WHERE 'condition'
*/
app.delete('/delete/:table/:condition', function(req, res){
    //need to check validation
    dataBaseHandler.deleteFromdb(req,res)
})

/*
    A generic sql script with the following structure

    UPDATE 'table'
    SET c1=v1, c2=v2, ...
    WHERE 'condition'
*/
app.put('/update/:table/:values/:condition', function(req, res){
    //need to check validation
    dataBaseHandler.updateWithoutCondition(req,res)
})

app.post("/login/:UserName/:passward", (req, res) => {
    payload = { id: req.params.UserName, name: req.params.UserName, admin: true };
    options = { expiresIn: "1d" };
    const token = jwt.sign(payload, secret, options);
    res.send(token);
});

app.post("/private", (req, res) => {
    const token = req.header("x-auth-token");
    // no token
    if (!token) res.status(401).send("Access denied. No token provided.");
    // verify token
    try {
        const decoded = jwt.verify(token, secret);
        req.decoded = decoded;
        if (req.decoded.admin)
            res.status(200).send({ result: "Hello admin." });
        else
            res.status(200).send({ result: "Hello user." });
    } catch (exception) {
        res.status(400).send("Invalid token.");
    }
});

//This fucntion will invoke the appi request from the code (should be used by the client)
function httpInvoke(path,kind)
{
    var options = {
    
        port: port,
        path: path,
        method: kind
      };
      var ans=''
    
      http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            ans = chunk
        });
      }).end();
    
      return ans
    
}






//The function above are example of how to use the http invocation
function getCountryById(id)
{
    return httpInvoke('/select/countries/*/name='+id,'GET')
}

module.exports.getCountryById = getCountryById

function insertCountry(name,country)
{
    return httpInvoke('/insert/city/name+country_name/'+name+'+'+country,'POST')
}

module.exports.insertCountry = insertCountry

function getPosintOfInterestByCategory(category)
{
    return httpInvoke('/select/countries/*/name='+id,'GET')
}
