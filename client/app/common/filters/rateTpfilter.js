/*
* @Author: Administrator
* @Date:   2017-04-08 17:08:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-08 17:12:42
*/
app.filter("rateTpfilter", function () {
        return function (str) {
            
            	if(str==0){
            	var data = " 固定利率";
            	}
            	if(str==1){
            		 var data ="浮动利率";
            	}

		  return data;
		           
		           
		      };
		 });


