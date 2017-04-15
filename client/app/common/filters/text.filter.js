/*
* @Author: Administrator
* @Date:   2017-03-23 14:37:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-29 17:34:01
*//*
* @Author: Administrator
* 关键字变色
*/
app.filter("color", function ($sce) {
        return function (text, search) {
            if(text){
            var html = text.replace(search, "<span style='color: #FE6917'>" + search + "</span>");
            var data = $sce.trustAsHtml(html);
            }
            
           
            // console.log(data);
            return data;
        };
    });