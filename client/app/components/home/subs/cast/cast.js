app.config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $stateProvider
            .state('home.cast', {
                url: '/cast?:lid?:state',
                views: {
                    'main@home': {
                        component: 'cast'
                    }
                }
            })
    })
    .component('cast', {
        restrict: 'E',
        bindings: {},
        templateUrl: './cast.html',
        controller: CastController
    });
