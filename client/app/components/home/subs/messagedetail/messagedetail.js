app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.messagedetail', {
			url: '/messagedetail/?:iid',
			views: {
				'main@home': {
					component: 'messagedetail'
				}
			}
		})
	
})
.component('messagedetail', messagedetailComponent);
