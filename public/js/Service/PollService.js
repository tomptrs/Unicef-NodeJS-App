
app.factory("PollService",function()
            
{
    var obj = {};

    obj.token = "";
    
    obj.SetToken = function(str){
        console.log("Set Token" + str);
        token = str;
    }

    obj.poll = function(){
    
    //Send POST Message to Server
    
    }        
            
            
    return obj;
});