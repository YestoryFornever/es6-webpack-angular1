app.component("modelList", {
    templateUrl: "./model-list.html",
    controller: ModelListController,
    bindings: {
        modalInstance: "<",
        resolve: "<"
    }
});