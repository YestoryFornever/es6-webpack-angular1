app.config(($stateProvider, $urlRouterProvider) => {
	$stateProvider
		.state('home.newdebtinformationdetails', {
			url: '/newdebtinformationdetails?:dstrBondId?:issuId?:trm?:enqrTp?:roleId?:alrdySbrbInd?:issuNum',
			views: {
				'main@home': {
					component: 'newdebtinformationdetails'
				}
			},
			// controller:function($stateParams){
   //              return ($stateParams.bondid)
   //          }

		})
	
})
.component('newdebtinformationdetails', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './newdebtinformationdetails.html',
	controller: NewdebtinformationdetailsController
})
