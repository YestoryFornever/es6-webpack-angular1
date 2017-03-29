app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom', {
			url: '/chatroom/?:ofrUserId&?:bondOfrid',
			views: {
				'main@home': {
					component: 'chatroom'
				},
				'list@home.chatroom': {
					component: 'bargainlist'
				}
			},
			onEnter:function(){
				console.log('enter');
			},
			onExit:function(){
				console.log('exit');
			}
		});
})
.component('chatroom', chatroomComponent);
