app.component('nowBondComponent', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './now-bond.html',
	controller: nowBondController,
	controllerAs:'$instanceCtrl',
});
