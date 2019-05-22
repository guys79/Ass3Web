var DButilsAzure = require('./DButils');//The db utils

//This function will assemble the query using the table name and column (SELECT)
function selectWithoutCondition(req, res){
    DButilsAzure.execQuery("SELECT "+req.params.column+" FROM "+req.params.table)
    .then(function(result){
        res.status(200).send(result)
    })
    .catch(function(err){
        console.log(err)
        res.status(400).send(err)
    })
}

module.exports. selectWithoutCondition = selectWithoutCondition

//This function will assemble the query using the table name, column and the query (SELECT)
function selectWithCondition(req, res){
    console.log(req.params.query)
    DButilsAzure.execQuery("SELECT "+req.params.column+" FROM "+req.params.table +" WHERE "+req.params.query+";")
    .then(function(result){
        res.status(200).send(result)
        
    })
    .catch(function(err){
        console.log(err)
        res.status(400).send(err)
    })
}
module.exports.selectWithCondition = selectWithCondition

//This function will assemble the query using the table name and column (SELECT)
function postWithoutCondition(req, res){
    var parameters=paramHandleColumnNames(JSON.stringify(req.params.columns));
    var values=paramHandleValues(JSON.stringify(req.params.values));
    DButilsAzure.execQuery("INSERT INTO "+req.params.table+parameters+" VALUES"+values+";")
    .then(function(result){
        res.status(201).send(result)
    })
    .catch(function(err){
        console.log(err)
        res.status(400).send(err)
    })
}

module.exports.postWithoutCondition = postWithoutCondition

//This function will parse the values recived from the request
function paramHandleValues(parameters)
{
    var splitted = parameters.split("+")
    
    splitted[0] = splitted[0].substring(1)
    splitted[splitted.length-1] = splitted[splitted.length-1].substring(0,splitted[splitted.length-1].length-1)
    
    
    console.log(splitted)
    var newParam = ' (\''+splitted[0]+'\''
    if (!isNaN(splitted[0])) 
    {
        newParam = ' ('+splitted[0]
    }
    
    for(var i=1; i<splitted.length;i++)
    {
        if (!isNaN(splitted[i]))
        {
            newParam=newParam+', '+splitted[i]
        }
        else
        {
            
            newParam=newParam+', \''+splitted[i]+'\''
        }
    }
    newParam= newParam+')'
    return newParam
}

//This function will parse the column names recived from the request
function paramHandleColumnNames(parameters)
{
    var splitted = parameters.split("+")
    splitted[0] = splitted[0].substring(1)
    splitted[splitted.length-1] = splitted[splitted.length-1].substring(0,splitted[splitted.length-1].length-1)
    var newParam = ' ('+splitted[0]
    for(var i=1; i<splitted.length;i++)
    {
        newParam=newParam+', '+splitted[i]
    }
    newParam= newParam+')'
    return newParam
}


//This function will assemble the query using the table name and column (SELECT)
function deleteFromdb(req, res){
    console.log("DELETE FROM "+req.params.table+" WHERE "+req.params.condition+";")
    DButilsAzure.execQuery("DELETE FROM "+req.params.table+" WHERE "+req.params.condition+";")
    .then(function(result){
        res.status(200).send(result)
    })
    .catch(function(err){
        console.log(err)
        res.status(400).send(err)
    })
}

module.exports.deleteFromdb = deleteFromdb

function updateWithoutCondition(req, res){
    var values=updateHandleValues(JSON.stringify(req.params.values))

    console.log("UPDATE "+req.params.table+" SET "+values+" WHERE "+req.params.condition+";")
    DButilsAzure.execQuery("UPDATE "+req.params.table+" SET "+values+" WHERE "+req.params.condition+";")
    .then(function(result){
        res.status(201).send(result)
    })
    .catch(function(err){
        console.log(err)
        res.status(400).send(err)
    })
}

function updateHandleValues(parameters){
    var splitted = parameters.split("+")
    splitted[0] = splitted[0].substring(1)
    splitted[splitted.length-1] = splitted[splitted.length-1].substring(0,splitted[splitted.length-1].length-1)
    var splitPair = splitted[0].split("=")
    if (!isNaN(splitPair[1]))
        newParam = splitPair[0]+' = '+splitPair[1]
    else
        newParam = splitPair[0]+' = \''+splitPair[1]+'\''
    for(var i=1; i<splitted.length;i++)
    {
        splitPair = splitted[i].split("=")
        if (!isNaN(splitPair[1]))
            newParam =newParam+', '+ splitPair[0]+' = '+splitPair[1]
        else
            newParam =newParam+', '+ splitPair[0]+' = \''+splitPair[1]+'\''
        
    }
    return newParam
}

module.exports.updateWithoutCondition = updateWithoutCondition