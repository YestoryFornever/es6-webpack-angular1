
app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.acoupond', {
			url: '/acoupond',
			views: {
				'main@home': {
					component: 'acoupond'
				}
			},
			// controller:function($stateParams){
   //              return ($stateParams.bondid)
   //          }

		})
	
})
.component('acoupond', acoupondComponent);
