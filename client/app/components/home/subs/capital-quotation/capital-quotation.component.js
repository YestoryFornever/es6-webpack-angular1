let CapitalQuotationComponent = {
	restrict: 'E',
	bindings: {},
	templateUrl:'./capital-quotation.html',
	controller:function($scope,$state,$stateParams, pagetabService){
		"ngInject";
		if($state.$current.name == 'home.capitalQuotation'){
			$state.go('home.capitalQuotation.onLineBond');
			return ;
		}
		$scope.towillbond = function(){
			if($state.$current.name == 'home.capitalQuotation.mineQuotation'){
				$state.go('home.capitalQuotation.onLineBond.create');
				return ;
			}else{
				$state.go($state.$current +".create");
				return ;
			}
		}
		$scope.tolist =function(index){
			$state.go('home.capitalQuotation.mineQuotation', {active:0});
			return ;
		}
	}
}