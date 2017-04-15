app.filter("changeTime", function () {
    "use strict";
    return function (data) {
        var date = new Date(data);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        var s = date.getSeconds();
        if (m < 9) {
            m = "0" + m + ":"
        }
        else {
            m = m + ":"
        }

        if (s < 9) {
            s = "0" + s
        }
        return Y + M + D + h + m + s;
    }
});