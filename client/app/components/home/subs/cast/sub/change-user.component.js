app.component("changeUser", {
    templateUrl: "./change-user.html",
    controller: ChangeUserController,
    bindings: {
        modalInstance: "<",
        resolve: "<"
    }
});