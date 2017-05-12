let restorePurchaseComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve:"<"
	},
	templateUrl: './restore-purchase.html',
	controller: RestorePurchaseController,
	controllerAs:'$instanceCtrl',
};
