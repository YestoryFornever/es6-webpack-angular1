app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('error',{
			url:'/error',
			component: 'error'
		})
})
.component('error', {
	restrict: 'E',
	bindings: {},
	templateUrl: './error.html',
	controller: ErrorController
});
