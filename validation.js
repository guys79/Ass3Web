//This function will check fr basic SQL injection
function checkForBasicSQLInjection(req,res)
{
    //SQL injection keywords
    var keyWords = ['delete','select','insert','update']

    //Go through all of the request parameters and check for those keywords
    for(var i=0;i<req.params.length;i++)
    {
        for(var j=0;j<keyWords.length;k++)
        {
            if(JSON.stingify(req.params[i]).toLowerCase().contains(keyWords[k]))
                return false
        }
    }
    return true
}

module.exports.checkForBasicSQLInjection =checkForBasicSQLInjection

//This function will allow to select PointOfInterest ONLY by category
//This function will check if the given query is 'category=
function isPointOfInterestByCategory(req,res)
{
    var squery = JSON.stringify(req.params.query)
    var category = 'category'
    if(squery.length<=category.length+1)
        return false

    return squery.substring(0,category.length)===category && /\d/.test(squery) && squery.charAt(category.length)==='='
}

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
/*function addToFavoritesByPOIUsername(req,res)
{
    var  splitParam = returnSplit(req.params.cloumns)
    var  splitValue = returnSplit(req.params.values)

    if(splitParam.length!=2 || splitValue.length!=2)
        return false

    var index =-1

    for(var i=0; i<splitParam.length;i++)
    {
        index = splitParam.indexOf()
    }
    //Continue
    //Check If the give params are POI and Username
}*/
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