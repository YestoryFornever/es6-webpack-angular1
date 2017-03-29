
app.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider
		.state('home.capitalQuotation', {
			url: '/capitalQuotation',
			views: {
				'main@home': {
					component: 'capitalQuotation',
				},
				'list@home.capitalQuotation': {
					component: 'onLineBond',
				}
			}
		});
})
.component('capitalQuotation', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./capital-quotation.html',
	controller:CapitalQuotationController
})

