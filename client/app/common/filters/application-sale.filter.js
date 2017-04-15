app.filter("applicationSale", function() {
    return function(data) {
        if(data == 1) {
            return data = "折价";
        }
        if(data == 2) {
            return  data = "单返";
        }
    };
});