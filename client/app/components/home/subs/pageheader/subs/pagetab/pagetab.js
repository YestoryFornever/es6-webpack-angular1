app.component('pagetab', {
	restrict: 'E',
	bindings: {
		tabs:'=',
	},
	templateUrl: './pagetab.html',
	controller: function($scope, pageheaderService,$state,$stateParams,$uibModal,$mdDialog, pagetabService){
		$scope.pagetabService = pagetabService;

		/*$doCheck(){
			console.log(this.tabs);
		}
		$onChanges(){}
		$postLink(){}
		$onDestroy(){}*/
	}
});
