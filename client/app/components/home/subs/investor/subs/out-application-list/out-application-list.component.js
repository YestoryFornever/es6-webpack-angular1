app.component("outList", {
    templateUrl: "./out-application-list.html",
    controller: OutListController,
    bindings: {
        modalInstance: "<",
        resolve: "<"
    }
});