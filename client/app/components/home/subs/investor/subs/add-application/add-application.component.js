app.component("addApplication", {
        restrict: 'E',
        bindings: {
            state: "="
        },
        templateUrl: "./add-application.html",
        controller: addApplicationController
    });