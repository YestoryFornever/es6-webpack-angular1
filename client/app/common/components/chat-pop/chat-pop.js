app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chat-pop', {
			url: '/chat-pop',
			views: {
				'main@home': {
					component: 'chatPop'
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
.component('chatPop', chatPopComponent);
