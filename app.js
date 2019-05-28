var express = require('express');//The express module
var app = express();//The app
var DButilsAzure = require('./DButils');//The db utils
var dataBaseHandler = require('./dataBaseHandler')//The db handler
var http = require('http')//The http module
var validation= require('validation.js')


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
    //need to check validation
    dataBaseHandler.selectWithCondition(req,res)
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

//Check for sql injection
app.use('/select', function(req,res,next)
    {
        if(validation.checkForBasicSQLInjection(res,req))
            next()
        res.status(400)
    }
)

//Check for sql injection
app.use('/delete', function(req,res,next)
    {
        if(validation.checkForBasicSQLInjection(res,req))
            next()
        res.status(400)
    }
)

//Check for sql injection
app.use('/update', function(req,res,next)
    {
        if(validation.checkForBasicSQLInjection(res,req))
            next()
        res.status(400)
    }
)

//Check for sql injection
app.use('/insert', function(req,res,next)
    {
        if(validation.checkForBasicSQLInjection(res,req))
            next()
        res.status(400)
    }
)

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