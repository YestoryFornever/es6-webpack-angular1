app.filter("applicationChanel", function() {
    return function(data) {
        if(data == 1) {
            return data = "平台";
        }
        if(data == 2) {
            return  data = "QQ";
        }
        if(data == 3) {
            return data = "微信";
        }
        if(data == 4) {
            return  data = "录入";
        }
    };
});
