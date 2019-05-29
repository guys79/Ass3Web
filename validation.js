//This function will check fr basic SQL injection
function checkForBasicSQLInjection(req,res)
{
    
    //SQL injection keywords
    var keyWords = ['delete','select','insert','update']

    console.log(req.params)
    //Go through all of the request parameters and check for those keywords
    for(var i=0;i<req.params.length;i++)
    {
        for(var j=0;j<keyWords.length;k++)
        {
            if(JSON.stingify(req.params[i]).toLowerCase().indexOf(keyWords[k])!=-1)
            {
                
                return false
            }
            
                
        }
    }
    return true
}

module.exports.checkForBasicSQLInjection = checkForBasicSQLInjection





//This function will return the number of occurrences of a char in a given string
function numberOfCharOccurrences(Str,c)
{
    
    return str.split(c).length - 1
}



/*
    A generic sql script with the following structure

    INSERT INTO 'table' (c1,c2,...)
    VALUES (v1,v2,...)

*/
function addToFavoritesByPOIUsername(req,res)
{
    var  splitParam = returnSplit(req.params.cloumns)
    var  splitValue = returnSplit(req.params.values)

    if(splitParam.length!=2 || splitValue.length!=2)
        return false

    var index =-1
    //index = splitParam.indexOf("")
    
    //Continue
    //Check If the give params are POI and Username
}
//Untested
function returnSplit(parameters)
{
    var splitted = parameters.split("+")
    
    splitted[0] = splitted[0].substring(1)
    splitted[splitted.length-1] = splitted[splitted.length-1].substring(0,splitted[splitted.length-1].length-1)
    
    if (isNaN(splitted[0])) 
    {
        splitted[0] = '\''+splitted[0]+'\''
    }
    
    for(var i=0; i<splitted.length;i++)
    {
        
        if (isNaN(splitted[i])) 
        {
            splitted[i] = '\''+splitted[i]+'\''
        }
        
    }
    
    return newParam
}

//This function will allow to select PointOfInterest ONLY by category
//This function will check if the given query is 'category=
function isPointOfInterestByCategory(req,res)
{
    return onlyBy(req,'categoryName',true) && checkTable(req, 'pointOfInterest')
}

module.exports.isPointOfInterestByCategory = isPointOfInterestByCategory

//This function checks if the syntax for getReviewById is correct
function getReviewByPOI(req,res)
{
    return onlyBy(req,'pointOfInterest',true) && checkTable(req,'reviews')
}
module.exports.getReviewByPOI = getReviewByPOI

//This function checks if the syntax for getReviewByPOI is correct
function getRankByPOI(req,res)
{
    console.log(onlyBy(req,'name')+" ljljdasl")
    console.log(checkColumn(req,'rank'))
    console.log(checkTable(req,'pointOfInterest'))
    return onlyBy(req,'name',true) && checkColumn(req,'rank') && checkTable(req,'pointOfInterest')
}

//This function checks if the given column name in the request is the same as the given 'columnName'
function checkColumn(req,columnName)
{
    console.log(JSON.stringify(req.params.column))
    console.log(columnName)
    return JSON.stringify(req.params.column) === ('\"'+columnName+'\"')
}

//This function checks if the given table name in the request is the same as the given 'tableName'
function checkTable(req,tableName)
{
    return JSON.stringify(req.params.table) === ('\"'+tableName+'\"')
}

module.exports.getRankByPOI = getRankByPOI

//This function checks if condition is as followes:
// 'column=value'
//flag is TRUE if we want to check that there are no digits
function onlyBy(req,column,flag)
{
    var squery = JSON.stringify(req.params.query)
    if(squery.length<=column.length+4)
        return false
    /*console.log(squery.substring(1,column.length+1))
    console.log(column)
    console.log(/\d/.test(squery))
    console.log(squery.charAt(column.length+1))
    console.log(squery)*/
    return squery.substring(1,column.length+1)===column && (!flag|| (/\d/.test(squery))) && squery.charAt(column.length+1)==='='
}