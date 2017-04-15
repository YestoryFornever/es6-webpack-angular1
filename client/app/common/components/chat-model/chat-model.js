app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chat-model', {
			url: '/chat-model',
			views: {
				'main@home': {
					component: 'chatModel'
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
.component('chatModel', chatModelComponent);
