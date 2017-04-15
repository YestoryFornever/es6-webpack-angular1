app.filter("applicationTransaction", function() {
    return function(data) {
        if(data == 1) {
            return data = "上市";
        }
        if(data == 2) {
            return  data = "分销";
        }
    };
});