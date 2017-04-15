app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.message', {
			url: '/message/?:search?:tag?:page',
			views: {
				'main@home': {
					component: 'message'
				}
			}
		})
	
})
.component('message', messageComponent);
