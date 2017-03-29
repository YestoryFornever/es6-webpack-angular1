app.filter("ct", function ($timeout, $interval) {
    return function (time) {
        // // console.log(time);
        // var m = parseInt(time / 60);
        // var s = parseInt(time % 60);
        // console.log(time);
        // console.log(m);
        // console.log(s);
        // $interval(function () {
        //     var dtime = "";
        //     if (s < 10) {
        //         dtime = m + ":0" + s;
        //     } else {
        //         dtime = m + ":" + s;
        //     }
        //     s--;
        //     if (s < 0) {
        //         s = 59;
        //         m--;
        //     }
        //     console.log(dtime);
        //     return dtime;
        // }, 1000);
    }
});