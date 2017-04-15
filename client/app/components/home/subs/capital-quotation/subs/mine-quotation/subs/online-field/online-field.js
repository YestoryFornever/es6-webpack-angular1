app.component('onlineFieldComponent', {
	restrict: 'E',
	bindings: {
		item:'=',
		active: '='
	},
	templateUrl: './online-field.html',
	controller: function($scope, $state,$stateParams,netCapitalQuoteService){
		"ngInject";
		var that = this;
		$scope.updateInfo={
			ofrid:this.item.ofrid,
			eStatus:this.item.eStatus

		}
		$scope.updateOfrEStatus = function(){
			netCapitalQuoteService.updateOfrEStatus($scope.updateInfo)
			.then((res)=>{
				$state.reload(true)
			})
		}
		$scope.towillquote= function(){
			if($stateParams.active==0){
				$state.go('home.capitalQuotation.onLineBond.create' ,{isShowHead:true,ofrid:that.item.ofrid},{reload:true})
			}
			if($stateParams.active==1){
				$state.go('home.capitalQuotation.lineDownQuotation.create' ,{isShowHead:true,ofrid:that.item.ofrid},{reload:true})
			}
			console.log($stateParams)
		}
		//End Controller
	}
});