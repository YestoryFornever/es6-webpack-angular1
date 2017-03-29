app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.bondquotation', {
			url: '/bondquotation',
			views: {
				'main@home': {
					component: 'bondquotation'
				},
			},
		})
})
.component('bondquotation', {
	restrict: 'E',
	bindings: {},
	templateUrl: './bondquotation.html',
	controller: BondquotationController
});
