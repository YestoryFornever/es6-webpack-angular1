app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom.groupslist', {
			url: '/group',
			views: {
				'list@home.chatroom': {
					component: 'groupslist'
				}
			}
		});
})
.component('groupslist', groupslistComponent);
