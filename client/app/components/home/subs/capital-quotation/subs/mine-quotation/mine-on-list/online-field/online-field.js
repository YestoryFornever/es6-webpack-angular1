app.component('onlineFieldComponent', {
	restrict: 'E',
	bindings: {
		item:'=',
		active: '='
	},
	templateUrl: './online-field.html',
	controller: function($scope, $state,$stateParams,AlertModalService,netCapitalQuoteService){
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
			AlertModalService.open(null,'是否更新报价？',true)
			.then((res)=>{
				if($stateParams.active==0){
					$state.go('home.capitalQuotation.onLineBond.create' ,{isShowHead:true,ofrid:that.item.ofrid},{reload:true})
				}
				if($stateParams.active==1){
					$state.go('home.capitalQuotation.lineDownQuotation.create' ,{isShowHead:true,ofrid:that.item.ofrid},{reload:true})
				}
			})
		}
		$scope.alert = function(state){
			if(state=='2'){
				AlertModalService.open(null,'是否成交？',true)
				.then((res)=>{
					$scope.updateInfo.eStatus="2";
					$scope.updateOfrEStatus();
				})
			}
			if(state=='3'){
				AlertModalService.open(null,'是否撤销？',true)
				.then((res)=>{
					$scope.updateInfo.eStatus="3";
					$scope.updateOfrEStatus();
				})
			}
		}
		//End Controller
	}
});