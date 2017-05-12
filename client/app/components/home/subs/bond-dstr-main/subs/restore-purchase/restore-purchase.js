app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.restore-purchase', {
			url: '/restore-purchase',
			views: {
				'main@home': {
					component: 'restorePurchase'
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
.component('restorePurchase', restorePurchaseComponent);
