app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
	.state('demo',{
		url:'/demo',
	}).state('demo.downlist',{
		url:'/downlist',
		component: 'downlistDemo'
	}).state('demo.bootstrap',{
		url:'/bootstrap',
		templateUrl: 'bootstrap.demo.html'
	})
})