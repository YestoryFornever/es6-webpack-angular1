app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.contactmodal', {
			url: 'contactmodal',
			views: {
				'main@home': {
					component: 'contactmodal'
				}
			}
		})
	
})
.component('contactmodal', {
	restrict: 'E',
	bindings: {},
	templateUrl: './contactmodal.html',
	controller: ContactmodalController
});
