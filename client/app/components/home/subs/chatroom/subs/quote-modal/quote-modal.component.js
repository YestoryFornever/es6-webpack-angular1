let quoteModalComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<"
	},
	templateUrl: './quote-modal.html',
	controller: QuoteModalController,
	controllerAs:'$instanceCtrl',
};

