app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom.friendslist', {
			url: '/friend',
			views: {
				'list@home.chatroom': {
					component: 'friendslist'
				}
			}
		});
})
.component('friendslist', friendslistComponent);
