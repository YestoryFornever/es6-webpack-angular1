/*
* @Author: Administrator
* @Date:   2017-04-08 17:03:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-08 17:21:14
*/

app.filter("hanquanFilter", function () {
        return function (str) {
            
            	if(str==1){
            	var data = " 含权";
            	}
            	if(str==2){
            		 var data ="不含权";
            	}

		  return data;
		           
		           
		      };
		 });








