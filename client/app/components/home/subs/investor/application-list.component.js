app.config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('home.newdebtinformationdetails.investor', {
                url: '/investor',
                views: {
                    'main@home.newdebtinformationdetails': {
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
