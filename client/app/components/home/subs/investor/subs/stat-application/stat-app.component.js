app.component("statApp", {
    templateUrl: "./stat-app.html",
    controller: StatAppController,
    bindings: {
        show: '='
    }
});
// 传递参数 showState控制投资者不显示发送给客户, 分销商显示发送给客户.