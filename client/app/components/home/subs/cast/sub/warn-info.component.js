app.component("warnModel", {
    templateUrl: "./warn-info.html",
    controller: warnModelController,
    bindings: {
        modalInstance: "<",
        resolve: "<"
    }
});