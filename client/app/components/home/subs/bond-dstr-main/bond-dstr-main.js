app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.bond-dstr-main', {
			url: '/bond-dstr-main/?:dstrBondId?:issuId',
			views: {
				'main@home': {
					component: 'bondDstrMain'
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
.component('bondDstrMain', bondDstrMainComponent);
