app.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider
		.state('home.acoupondetails', {
			url: '/acoupondetails/?:bondid',
			views: {
				'main@home': {
					component: 'acoupondetails'
				}
			},
			// controller:function($stateParams){
   //              return ($stateParams.bondid)
   //          }

		})
	
})
.component('acoupondetails', {
	restrict: 'E',
	bindings: {},
	templateUrl: './acoupondetails.html',
	controller: AcoupondetailsController
})
