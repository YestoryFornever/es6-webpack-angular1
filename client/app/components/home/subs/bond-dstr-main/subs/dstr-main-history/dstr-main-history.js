app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.dstr-main-history', {
			url: '/dstr-main-history',
			views: {
				'main@home': {
					component: 'dstrMainHistory'
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
.component('dstrMainHistory', dstrMainHistoryComponent);
