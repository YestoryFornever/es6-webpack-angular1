
app.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider
		.state('home.capitalQuotation', {
			url: '/capitalQuotation',
			views: {
				'main@home': {
					component: 'capitalQuotation',
				},
			}
		})
})


