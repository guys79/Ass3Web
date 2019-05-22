var express = require('express');//The express module
var app = express();//The app
var DButilsAzure = require('./DButils');//The db utils
var dataBaseHandler = require('./dataBaseHandler')//The db handler
var http = require('http')//The http module

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
app.get('/insert/:table/:columns/:values', function(req, res){
    //need to check validation
    dataBaseHandler.postWithoutCondition(req,res)
})
//
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

function getCountryById(id)
{
    return httpInvoke('/select/countries/*/id='+id,'GET')
}

module.exports.getCountryById = getCountryById

function insertCountry(name,country)
{
    return httpInvoke('/insert/city/name+country_name/'+name+"+"+country,'POST')
}

module.exports.insertCountry = insertCountry