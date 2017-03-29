
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.onLineBond', {
			url: '/onLineBond',
			views: {
				'list@home.capitalQuotation': {
					component: 'onLineBond'
				}
			},
			cache:false
		});
})
.component('onLineBond', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./on-line-bond.html',
	controller:OnLineBondController
})

