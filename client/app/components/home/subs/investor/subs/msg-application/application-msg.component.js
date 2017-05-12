app.component("applicationMsg", {
    restrict: 'E',
    bindings: {
        msgStatistics: "=",
        msgClick: "&"
    },
    templateUrl: "./application-msg.html",
    controller: ApplicationMsgController
});