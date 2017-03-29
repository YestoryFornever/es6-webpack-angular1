
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.willQuote.lineUp', {
			url: '/lineUp',
			views: {
				'secondList@home.capitalQuotation.willQuote': {
					component: 'lineUp'
				}
			},
		});
})
.component('lineUp', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./line-up.html',
	controller:LineUpController
})

