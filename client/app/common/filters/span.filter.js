/*
* @Author: Administrator
* @Date:   2017-04-07 18:11:12
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-11 13:02:48
*/

app.filter("spanfilter", function ($sce) {
        return function (str) {
            if(str){
                if(str==1){
                     // var html = str.replace(str,"<span class='purchase' >已申购 </span >");
                     var data = "已申购";
                      return  data;

                }
                if(str==2){
                     // var html = str.replace(str,"<span class='distribution' >已分销 </span >");
                     var data ="已分销";
                      return data;
                }
            }
            	
           
           
            // console.log(data);
           
        };
    });