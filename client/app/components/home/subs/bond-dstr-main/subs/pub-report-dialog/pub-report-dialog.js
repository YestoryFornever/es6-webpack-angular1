app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.pub-report-dialog', {
			url: '/pub-report-dialog',
			views: {
				'main@home': {
					component: 'pubReportDialog'
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
.component('pubReportDialog', pubReportDialogComponent);
