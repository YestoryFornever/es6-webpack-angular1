app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
	.state('demo',{
		url:'/demo',
		controller: function($rootScope){
			$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
				console.log('$stateChangeSuccess', toState, toParams, fromState, fromParams)
			});
		}
	}).state('demo.downlist',{
		url:'/downlist',
		component: 'downlistDemo'
	}).state('demo.bootstrap',{
		url:'/bootstrap',
		templateUrl: 'bootstrap.demo.html'
	}).state('demo.friendsModal', {
		url:'/friendsModal',
		component: 'acoupond'
	})
})