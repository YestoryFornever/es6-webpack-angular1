app.filter("caststate", function () {
    "use strict";
    return function (state) {
        console.log(state);
        var cst = state;
        if (cst == 1) {
            return cst = "直播中";
        }
        if (cst == 2) {
            return cst = "马上开始"
        }
        if (cst == 3) {
            return cst = "预告";
        }
        if (cst == 4) {
            return cst = "回放"
        }
    }
});