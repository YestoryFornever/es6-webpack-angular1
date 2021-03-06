app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.lineDownQuotation', {
			url: '/lineDownQuotation?:drc?:trmTp?:trmLwrLmtVal?:trmLwrLmtVal1?:trmLwrLmtUnit?:trmUpLmVal?:trmUpLmVal1?:trmUpLmUnit?:intRtStrtVal?:intRtStrtVal1?:intRtEndVal?:intRtEndVal1?:ctlg?:pageSize?:cltnEStatus?:pageNum',
			views: {
				'list@home.capitalQuotation': {
					component: 'lineDownQuotation'
				}
			},
		}).state('home.capitalQuotation.lineDownQuotation.create', {
			url: '/create?:ofrid',
			views: {
				'linedownCreat@home.capitalQuotation.lineDownQuotation': {
					component: 'lineDownComponent'
				}
			},
		});
})
