
app.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider
		.state('home.capitalQuotation', {
			url: '/capitalQuotation',
			views: {
				'main@home': {
					component: 'capitalQuotation',
				},
				'list@home.capitalQuotation': {
					component: 'onLineBond'
				}
			}
		})
})
.component('capitalQuotation',CapitalQuotationComponent )

