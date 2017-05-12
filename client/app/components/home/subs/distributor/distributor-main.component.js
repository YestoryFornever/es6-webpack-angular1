app.config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('home.newdebtinformationdetails.distributor', {
                url: '/distributor',
                views: {
                    'main@home.newdebtinformationdetails': {
                        component: 'distributorMain'
                    }
                }
            })
    })
    .component("distributorMain", {
        restrict: 'E',
        bindings: {},
        templateUrl: "./distributor-main.html",
        controller: DistributorMainController
    });
