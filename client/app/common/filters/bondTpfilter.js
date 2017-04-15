/*
* @Author: 债券类型
* @Date:   2017-04-08 16:53:05
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-08 17:21:10
*/

app.filter("bondTpfilter", function () {
        return function (str) {
            
            	if(str==1){
            	var data = " 利率债";
            	}
            	if(str==2){
            		 var data ="国债";
            	}
	           if(str==3){
	            		 var data ="央票";
	            	}
           		if(str==4){
	            		 var data ="金融债";
	            	}
	            if(str==5){
	            		 var data ="地方债";
	            	}
	            if(str==6){
	            		 var data ="信用债";
	            	}
	            if(str==7){
	            		 var data ="短融";
	            	}
	            if(str==8){
	            		 var data ="中票";
	            	}
	            if(str==9){
	            		 var data ="企业债";
	            	}
	            if(str==10){
	            		 var data ="公司债";
	            	}
	            
	            if(str==11){
	            		 var data ="同业存单";
	            	}
	            if(str==99){
	            		 var data ="其他";
	            	}
	            
	        return data;
           
           
        };
    });
