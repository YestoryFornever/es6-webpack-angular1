app.filter("applicationState", function() {
    return function(data) {
        if(data == 1) {
            return data = "未发送";
        }
        if(data == 2) {
            return  data = "已发送";
        }
        if(data == 3) {
            return data = "新消息";
        }
        if(data == 4) {
            return  data = "已读";
        }
        if(data == 5) {
            return data = "已撤销";
        }
        if(data == 6) {
            return  data = "对方撤销";
        }
        if(data == 7) {
            return data = "已拒绝";
        }
        if(data == 8) {
            return  data = "对方拒绝";
        }
        if(data == 9) {
            return data = "已失效";
        }
    };
});