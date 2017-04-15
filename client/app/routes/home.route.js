app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";
	$stateProvider
	.state('home', {
		url: '/home',
		resolve: {
			authentication: function (userStatusService, $q) {
				"ngInject";
	            return $q.when().then(function () {
	                return userStatusService.authentication();
	            });
	        }
    	},
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
	}).state('login',{
		url:'/login',
		component: 'login',
	});
});