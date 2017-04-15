app.component('changeBond', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './changeBond.html',
	controllerAs: '$instanceCtrl',
	controller: function($scope, $uibModal,$state, NetBondquotationService, NetChangeBondService, easeMobService){
		"ngInject";
		var item = angular.copy(this.resolve.item);
		NetBondquotationService.queryBondBaseInfo({bondid: item.bondid})
		.then((res)=>{
			$scope.item = _.defaults(item, res.data.data);
			item.dealDate = moment().format('YYYY-MM-DD');
			item.num = NetBondquotationService.__n( item.num,true);
			item.yldrto = NetBondquotationService.__y( item.yldrto,true);
			item.netprc = NetBondquotationService.__p( item.netprc,true);
		});

		this.ok = function(){
			console.log(111111);
			NetBondquotationService.updateBondQuote($scope.item)
			.then((res)=>{
				res.data.data.forEach((item)=>{
					easeMobService.sendCmd('27',item);
				});
				$uibModal.open({
					animation: true,
					component:'alertModal',
					windowClass:'my-alert-modal',
					size: 'xxx',//'lg',//'sm',
					resolve: {
						info: {
							title:'修改报价',
							content:'修改报价成功',
						}
					}
				}).result;
				$state.reload(true);
				this.modalInstance.close();
			});
		}

		$scope.netprcFn = function(item){//计算净价
			let promise = NetChangeBondService.calSettlementAmountYieldForCM(item);
			promise.then((res)=>{
				if(res.data && res.data.data){
					item.netprc = NetBondquotationService.__p(res.data.data.cleanPrice,true);
				}
			});
		}

		$scope.yldrtoFn = function(item){//计算收益
			let promise = NetChangeBondService.calSettlementAmountCleanPriceForCM(item);
			promise.then((res)=>{
				if(res.data && res.data.data){
					item.yldrto = NetBondquotationService.__y( res.data.data.yield,true);
				}
			});
		}

		$scope.deleteRemark = function(item){
			if(item['rmrk'].length<=50){
				return false;
			}else{
				item.rmrk = item.rmrk.substr(0,50);
			}
		}



	},

});
