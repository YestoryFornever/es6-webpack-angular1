app.component('sendAlert', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './sendAlert.html',
	controller: SendAlertController
});
