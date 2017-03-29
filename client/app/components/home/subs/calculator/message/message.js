app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.message', {
			url: '/message',
			views: {
				'main@home': {
					component: 'message'
				}
			}
		})
	
})
.component('message', messageComponent);
