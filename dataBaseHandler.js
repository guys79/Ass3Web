var DButilsAzure = require('./DButils');//The db utils

//This function will assemble the query using the table name and column (SELECT)
function selectWithoutCondition(req, res){
    DButilsAzure.execQuery("SELECT "+req.params.column+" FROM "+req.params.table)
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
}

module.exports. selectWithoutCondition = selectWithoutCondition

//This function will assemble the query using the table name, column and the query (SELECT)
function selectWithCondition(req, res){
    console.log(req.params.query)
    DButilsAzure.execQuery("SELECT "+req.params.column+" FROM "+req.params.table +" WHERE "+req.params.query+";")
    .then(function(result){
        res.send(result)
        
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
}
module.exports.selectWithCondition = selectWithCondition

//This function will assemble the query using the table name and column (SELECT)
function postWithoutCondition(req, res){
    var parameters=paramHandle(JSON.stringify(req.params.columns));
    var values=paramHandle(JSON.stringify(req.params.values));
    console.log(parameters+" fjsdhjkfehkhfkjsakhfkshek")
    console.log(values+" fjsdhjkfehkhfkjsakhfkshek")
    DButilsAzure.execQuery("INSERT INTO "+req.params.table+" "+parameters+" "+" VALUES "+values)
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
}

module.exports.postWithoutCondition = postWithoutCondition

function paramHandle(parameters)
{
    var splitted = parameters.split('+')
    var newParam = "( \""+splitted[0]+"\""
    for(var i=1; i<splitted.length;i++)
    {
        newParam=newParam+" ,\""+splitted[i]+"\""
    }
    newParam= newParam+" )"
    return newParam
}