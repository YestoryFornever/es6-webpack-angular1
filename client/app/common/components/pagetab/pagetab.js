app.component('pagetab', {
	restrict: 'E',
	bindings: {
		tabs:'=',
	},
	templateUrl: './pagetab.html',
	controller: function($scope, $state,$stateParams,$uibModal,$mdDialog, pagetabService){
		$scope.pagetabService = pagetabService;
		$scope.$on('userStatus:clear', function(){
			pagetabService._tabs = [];
		});

		/*$doCheck(){
			console.log(this.tabs);
		}
		$onChanges(){}
		$postLink(){}
		$onDestroy(){}*/
	}
});
