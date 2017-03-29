app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.changeBond', {
			url: '/changeBond',
			views: {
				'main@home': {
					component: 'changeBond'
				},
			},
		})
})
.component('changeBond', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
		// isShow:"<",
	},
	templateUrl: './changeBond.html',
	controller: ChangeBondController,
	controllerAs:'$instanceCtrl',
});
