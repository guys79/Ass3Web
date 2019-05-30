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

    var table = JSON.stringify(req.params.table)
    table = table.substring(1,table.length-1)
    if(table === "reviews")
    {
        parameters = parameters.substring(0,parameters.length - 1)+', time)'
        values = values.substring(0,values.length-1)+', \'' +getCurrentDateInDateTime2Format() +'\')'
    }
    else
    {
        if(table === "pointOfInterest")
        {
            parameters = parameters.substring(0,parameters.length - 1) + ', rank, numOfViewers'
            values = values.substring(0,values.length-1)+',  1, 0'
            if(parameters.length==4)
            {
                parameters += ', image)'
                values += ', /)'
            }
            else
            {
                parameters += ')'
                values += ')'
                values = values.replace("-","/") 
            }
        }
    }

    console.log(parameters)
    console.log(values)
    

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

function getPasswordFromQAUsername(req,res)
{
    
    var username = fetchValue(req,'username')
    var question = fetchValue(req,'question')
    var answer = fetchValue(req,'answer')
    console.log(("SELECT answer FROM question_and_answer WHERE username="+username+" AND question="+question+";"))
    
    DButilsAzure.execQuery("SELECT answer FROM question_and_answer WHERE username="+username+" AND question="+question+";")  
    .then(function(result){
        if(answer === ('\''+JSON.stringify(result).substring(1,JSON.stringify(result).length-1)+'\''))
        {
            console.log("SELECT password FROM users WHERE username="+username+";")
            DButilsAzure.execQuery("SELECT password FROM users WHERE username="+username+";")
            .then(function(result2){
                res.status(200).send(result2)
            }).catch(function(err){
                res.status(400).send(err)
            })
        }
    })
    .catch(function(err){
        res.status(400).send(err)
    })
}

module.exports.getPasswordFromQAUsername = getPasswordFromQAUsername
function fetchValue(req,parameter)
{
    var squery = JSON.stringify(req.params.query)
    squery = squery.substring(1,squery.length-1)

    squery = squery.substring(squery.indexOf(parameter)+parameter.length+1)
    return '\''+squery.substring(0,squery.indexOf("+"))+'\''
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

///This function will update the database with no condition in the sql query
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

///This function will update the database with condition(s) in the sql query
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

//This function will return the currentdate in the format YYYY/MM/DD hh:mm:ss
function getCurrentDateInDateTime2Format()
{
    var d = new Date(Date.now())
    var dformat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
       [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');
    console.log(dformat)
    return dformat

}
