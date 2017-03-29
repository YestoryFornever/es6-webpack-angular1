app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom.bargainlist', {
			url: '/bargain',
			views: {
				'list@home.chatroom': {
					component: 'bargainlist'
				}
			},
			cache:false
		});
})
.component('bargainlist', bargainlistComponent);
