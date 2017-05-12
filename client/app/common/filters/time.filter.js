/*
* @Author: Administrator
* @Date:   2017-04-20 16:31:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-20 17:22:56
*/

app.filter("Time", function () {
    "use strict";
    return function (data) {
    	
    			var date = new Date(data);
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		        var D = date.getDate() + ' ';
		        // var h = date.getHours() + ':';
		        // var m = date.getMinutes();
		        // var s = date.getSeconds();
		        
       			 return Y + M + D ;
    		}

    	
});
