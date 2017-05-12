app.component("addApplication", {
        restrict: 'E',
        bindings: {
            state: "=",
            retFee: "<",
            pmod: "="
        },
        templateUrl: "./add-application.html",
        controller: ApplicationController
    });
