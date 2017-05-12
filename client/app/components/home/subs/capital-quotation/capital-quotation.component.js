
app.component('capitalQuotation',{
	restrict: 'E',
	bindings: {},
	templateUrl:'./capital-quotation.html',
	controller:function($scope,$state,$stateParams, pagetabService){
		"ngInject";
		$scope.towillbond = function(){
			if($state.$current.name == 'home.capitalQuotation.mineQuotation'){
				$state.go('home.capitalQuotation.onLineBond.create');
				return ;
			}else{
				$state.go($state.$current.name +".create");
				return ;
			}
		}
		$scope.tolist =function(index){
			$state.go('home.capitalQuotation.mineQuotation', {active:0});
			return ;
		}
		if($state.$current.name == 'home.capitalQuotation'){
			$state.go('home.capitalQuotation.onLineBond');
			return ;
		}
	}
} )
// let CapitalQuotationComponent = 