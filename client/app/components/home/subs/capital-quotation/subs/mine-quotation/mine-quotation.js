
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.mineQuotation', {
			url: '/mineQuotation',
			views: {
				'list@home.capitalQuotation': {
					component: 'mineQuotation'
				}
			},
			cache:false
		});
})
.component('mineQuotation', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./mine-quotation.html',
	controller:MineQuotationController
})

