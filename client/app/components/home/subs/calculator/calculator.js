app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.calculator', {
			url: '/calculator',
			views: {
				'main@home': {
					component: 'calculator'
				}
			}
		});
})
.component('calculator', calculatorComponent);
