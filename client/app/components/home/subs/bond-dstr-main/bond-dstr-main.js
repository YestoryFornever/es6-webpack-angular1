app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.newdebtinformationdetails.bond-dstr-main', {
			url: '/bond-dstr-main/',//?:dstrBondId?:issuId',
			views: {
				'main@home.newdebtinformationdetails': {
					component: 'bondDstrMain'
				}
			},
			onEnter:function(){
				console.log('bond-dstr-main enter');
			},
			onExit:function(){
				console.log('bond-dstr-main exit');
			}
		});
})
.component('bondDstrMain', bondDstrMainComponent);
