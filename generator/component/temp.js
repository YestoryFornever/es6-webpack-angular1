app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.<%= name %>', {
			url: '/<%= name %>',
			views: {
				'main@home': {
					component: '<%= hump %>'
				}
			},
			onEnter:function(){
				console.log('enter');
			},
			onExit:function(){
				console.log('exit');
			}
		});
})
.component('<%= hump %>', <%= hump %>Component);
