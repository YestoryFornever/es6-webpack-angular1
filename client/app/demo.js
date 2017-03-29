app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
	.state('demo',{
		url:'/demo',
		// component: 'home'
	}).state('demo.downlist',{
		url:'/downlist',
		component: 'downlistDemo'
	})
})