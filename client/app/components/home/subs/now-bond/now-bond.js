app.component('nowBond', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './now-bond.html',
	controller: nowBondController,
	controllerAs:'$instanceCtrl',
});
