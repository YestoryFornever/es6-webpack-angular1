
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.willQuote', {
			url: '/willQuote',
			views: {
				'list@home.capitalQuotation': {
					component: 'willQuote'
				},
				'secondList@home.capitalQuotation.willQuote': {
					component: 'lineUp'
				}
			},
		});
})
.component('willQuote', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./will-quote.html',
	controller:WillQuoteController
})

