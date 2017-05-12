app.component('mineQuotation', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./mine-quotation.html',
	controller:function($scope,$state,$stateParams,netCapitalQuoteService,pagetabService){
		"ngInject";
		
		$scope.active = $stateParams.active;
		if (!$stateParams.active) {
			return $state.go($state.$current,{active:0});
		}
		$scope.tolist =function(index){
			$scope.active = index;
			$state.go($state.$current,{active:$scope.active,pageNum:1})
		}
		pagetabService.activeTab({
			tabKey: 'home.capitalQuotation',
			routeState: 'home.capitalQuotation.mineQuotation',
			routeParams:{active:$scope.active},
			routeLabel:"资金报价",
		});
	}
})

