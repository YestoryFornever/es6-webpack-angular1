app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.originationdetails', {
			url: '/originationdetails?:enqrTp?:pageNum',
			views: {
				'main@home': {
					component: 'originationdetails'
				}
			}
		})
	
})
.component('originationdetails', originationdetailsComponent);
