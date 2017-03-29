app.config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $stateProvider
            .state('home.castroom', {
                url: '/castroom',
                views: {
                    'main@home': {
                        component: 'castroom'
                    }
                }
            })
    })
    .component('castroom', {
        restrict: 'E',
        bindings: {},
        templateUrl: './castroom.html',
        controller: CastroomController
    });
