app.factory('healdCalculatorService', function($uibModal) {
	return {
		open: function(item) {
			$uibModal.open({
				animation: true,
				component: 'healdCalculatorComponent',
				windowClass: "healdCalculatorCss",
				size: 'xl', //'',//'sm',
				resolve: {
					info:item
				}
			})
		}
	}
});