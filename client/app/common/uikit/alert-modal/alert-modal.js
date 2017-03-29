app.component('alertModal', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './alert-modal.html',
	controller: AlertModalController
})
