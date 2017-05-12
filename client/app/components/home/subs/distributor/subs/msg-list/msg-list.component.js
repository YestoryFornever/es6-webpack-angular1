app.component("msgList", {
        restrict: 'E',
        bindings: {
            items: "<",
            pages: "<",
            msgStatistics: "=",
            mywinbid: "=",
            msgClick: "&"
        },
        templateUrl: "./msg-list.html",
        controller: MsgListController
    });