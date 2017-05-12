
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.onLineBond', {
			url: '/onLineBond?:isShowHead',
			views: {
				'list@home.capitalQuotation': {
					component: 'onLineBond'
				}
			},
		}).state('home.capitalQuotation.onLineBond.create', {
			url: '/create?:isShowHead?:ofrid',
			views: {
				'lineupCreat@home.capitalQuotation.onLineBond': {
					component: 'lineUpComponent'
				}
			},
		});
})


