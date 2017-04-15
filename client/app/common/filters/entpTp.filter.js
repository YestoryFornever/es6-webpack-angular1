/*
* @Author: Administrator
* @Date:   2017-04-08 10:05:21
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-08 10:18:50
*/

app.filter("entpTpfilter", function () {
        return function (str) {
            
            	if(str==1){
            		 
            		 var data = "央企";
            		  return  data;

            	}
            	if(str==2){
            		 var data ="国企";
            		  return data;
            	}
	           if(str==3){
	            		 var data ="民企";
	            		  return data;
	            	}
           		if(str==4){
	            		 var data ="其他";
	            		  return data;
	            	}
	            
	            
           
            
           
        };
    });
