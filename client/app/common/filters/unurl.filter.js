app.filter("unurl", function() {
    "use strict";
    return function(data) {
        if(data == undefined) {
            data = "../../../resource/images/ico_yk.png";
            return data;
        }
        else {
            return data;
        }
    }
});