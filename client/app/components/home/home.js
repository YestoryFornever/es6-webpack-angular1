app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home', {
			url: '/home',
			views: {
				'': {
					component: 'home'
				},
				'header@home': {
					component: 'pageheader'
				},
				'main@home': {
					// component: 'bondquotation'
				},
				'footer@home': {
					component: 'pagefooter'
				}
			}
		});
})

.component('home', {
  restrict: 'E',
  bindings: {},
  templateUrl: './home.html',
  controller: HomeController
});
