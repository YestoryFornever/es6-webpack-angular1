
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.lineDownQuotation', {
			url: '/lineDownQuotation',
			views: {
				'list@home.capitalQuotation': {
					component: 'lineDownQuotation'
				}
			},
			cache:false
		});
})
.component('lineDownQuotation', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./line-down-quotation.html',
	controller:LineDownQuotationController
})

