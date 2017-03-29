
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.willQuote.lineDown', {
			url: '/lineDown',
			views: {
				'secondList@home.capitalQuotation.willQuote': {
					component: 'lineDown'
				}
			},
		});
})
.component('lineDown', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./line-down.html',
	controller:LineDownController
})

