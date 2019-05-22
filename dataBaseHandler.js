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
    var parameters=paramHandleColumnNames(JSON.stringify(req.params.columns));
    var values=paramHandleValues(JSON.stringify(req.params.values));
    console.log("INSERTINGGGGGGGGGGGGGGGGGGGG   ")
    DButilsAzure.execQuery("INSERT INTO "+req.params.table+parameters+" VALUES"+values+";")
    .then(function(result){
        res.send(result)
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
}

module.exports.postWithoutCondition = postWithoutCondition

function paramHandleValues(parameters)
{
    var splitted = parameters.split("+")
    splitted[0] = splitted[0].substring(1)
    splitted[splitted.length-1] = splitted[splitted.length-1].substring(0,splitted[splitted.length-1].length-1)
    console.log(splitted)
    var newParam = ' (\''+splitted[0]+'\''
    for(var i=1; i<splitted.length;i++)
    {
        newParam=newParam+', \''+splitted[i]+'\''
    }
    newParam= newParam+')'
    return newParam
}
function paramHandleColumnNames(parameters)
{
    var splitted = parameters.split("+")
    splitted[0] = splitted[0].substring(1)
    splitted[splitted.length-1] = splitted[splitted.length-1].substring(0,splitted[splitted.length-1].length-1)
    console.log(splitted)
    var newParam = ' ('+splitted[0]
    for(var i=1; i<splitted.length;i++)
    {
        newParam=newParam+', '+splitted[i]
    }
    newParam= newParam+')'
    return newParam
}