app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.cashoffer', {
			url: 'cashoffer',
			views: {
				'main@home': {
					component: 'cashoffer'
				}
			}
		});
})
.component('cashoffer', cashofferComponent);
