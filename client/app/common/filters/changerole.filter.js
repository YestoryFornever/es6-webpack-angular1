/*
* @Author: Administrator
* @Date:   2017-04-08 10:00:37
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-08 10:03:37
*/

app.filter("rolefilter", function () {
        return function (str) {
            
            	if(str==1){
            		 // var html = str.replace(str,"<span class='purchase' >已申购 </span >");
            		 var data = "主承";
            		  return  data;

            	}
            	if(str==2){
            		 // var html = str.replace(str,"<span class='distribution' >已分销 </span >");
            		 var data ="联承";
            		  return data;
            	}
	           if(str==3){
	            		 var data ="在团";
	            		  return data;
	            	}
           		if(str==4){
	            		 var data ="不在团";
	            		  return data;
	            	}
	            if(str==5){
	            		 var data ="投资";
	            		  return data;
	            	}
	            
           
            
           
        };
    });
