function getParamValue(paramName)
    {
        var url = window.location.search.substring(1); //get rid of "?" in querystring
        var qArray = url.split('&'); //get key-value pairs
        for (var i = 0; i < qArray.length; i++) 
        {
            var pArr = qArray[i].split('='); //split key and value
            if (pArr[0] == paramName) 
                return pArr[1]; //return value
        }
    }
    var param1 = getParamValue('delitos');
    param1 = param1.split(",")

    param1.map(function(ele){
        document.querySelector('#'+ele).classList.add('show')
})
    
console.log(param1);