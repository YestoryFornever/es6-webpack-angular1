app.config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('home.investor', {
                url: '/investor/?:dstrBondId?:issuId',
                views: {
                    'main@home': {
                        component: 'applicationList'
                    }
                }
            })
    })
    .component("applicationList", {
        restrict: 'E',
        bindings: {},
        templateUrl: "./application-list.html",
        controller: ApplicationListController
    });