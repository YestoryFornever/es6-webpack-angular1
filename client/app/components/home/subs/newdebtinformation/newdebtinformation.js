app.config(($stateProvider, $urlRouterProvider) => {
		"ngInject";

		$stateProvider
			.state('home.newdebtinformation', {
				url: '/newdebtinformation?:enqrTp?:pageNum',
				views: {
					'main@home': {
						component: 'newdebtinformation'
					}
				}
			})

	})
	.component('newdebtinformation', newdebtinformationComponent);