app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.dstr-dygrid', {
			url: '/dstr-dygrid',
			views: {
				'main@home': {
					component: 'dstrDygrid'
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
.component('dstrDygrid', dstrDygridComponent);
