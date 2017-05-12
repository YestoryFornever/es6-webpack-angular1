app.component("editModel", {
    templateUrl: "./edit-model.html",
    controller: EditModelController,
    bindings: {
        modalInstance: "<",
        resolve: "<"
    }
});