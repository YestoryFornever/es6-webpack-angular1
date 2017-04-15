
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.mineQuotation', {
			url: '/mineQuotation?:active?:isShowHead?:ofrid:pageSize?:pageNum?:mine',
			views: {
				'list@home.capitalQuotation': {
					component: 'mineQuotation'
				},
			},
		})
		.state('home.capitalQuotation.mineQuotation.create', {
			url: '/create',
			views: {
				'mineCreat@home.capitalQuotation.mineQuotation': {
					component: 'lineUpComponent'
				}
			},
		});
})
