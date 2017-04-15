app.component('downlistDemo', {
	restrict: 'E',
	bindings: {
		
	},
	templateUrl: 'demo.html',
	controller: function($scope, NetBondquotationService)
	{
		$scope.listOfItems = NetBondquotationService.section.data;
	}
});