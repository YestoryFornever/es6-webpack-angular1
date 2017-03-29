app.component('downlistDemo', {
	restrict: 'E',
	bindings: {
		
	},
	templateUrl: 'demo.html',
	controller: function($scope, bondquotationService)
	{
		$scope.listOfItems = bondquotationService.section.data;
	}
});