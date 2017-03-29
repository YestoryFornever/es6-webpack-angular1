app.component('bondTrial', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './bond-trial.html',
	controller: BondTrialController,
});
