app

.component('login', {
	restrict: 'E',
	bindings: {},
	templateUrl: './login.html',
	controller: LoginController
}).config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
	.state('login',{
		url:'/login',
		component: 'login'
	})
});
