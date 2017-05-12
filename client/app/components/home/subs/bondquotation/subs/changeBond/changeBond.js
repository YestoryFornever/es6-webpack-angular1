app.component('changeBond', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './changeBond.html',
	controllerAs: '$instanceCtrl',
	controller: function($scope, $uibModal,$state,AlertModalService, NetBondquotationService, NetChangeBondService, easeMobService){
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
		/**
		 * 提交
		 * @return {[type]} [description]
		 */
		this.ok = function(){
			if(!$scope.item.num){
				AlertModalService.open(null,'请输入正确的数量');
				return
			}
			if(!$scope.item.netprc || $scope.item.netprc>200){
				AlertModalService.open(null,'请输入正确的净价');
				return
			}
			if(!$scope.item.yldrto || $scope.item.yldrto >100){
				AlertModalService.open(null,'请输入正确的收益率');
				return
			}
			NetBondquotationService.updateBondQuote($scope.item)
			.then((res)=>{
				res.data.data.forEach((item)=>{
					easeMobService.sendCmd('27',item);
				});
				AlertModalService.open('修改报价','修改报价成功');
				$state.reload(true);
				this.modalInstance.close();
			});
		}
		/**
		 * 计算净价
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.netprcFn = function(item){//计算净价
			let promise = NetChangeBondService.calSettlementAmountYieldForCM(item);
			promise.then((res)=>{
				if(res.data && res.data.data){
					item.netprc = NetBondquotationService.__p(res.data.data.cleanPrice,true);
				}
			});
		}
		/**
		 * 计算收益率
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.yldrtoFn = function(item){//计算收益
			let promise = NetChangeBondService.calSettlementAmountCleanPriceForCM(item);
			promise.then((res)=>{
				if(res.data && res.data.data){
					item.yldrto = NetBondquotationService.__y( res.data.data.yield,true);
				}
			});
		}
		/**
		 * 限制备注字数
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.deleteRemark = function(item){
			if(item['rmrk'].length<=50){
				return false;
			}else{
				item.rmrk = item.rmrk.substr(0,50);
			}
		}
		/**
		 * 验证数量
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		$scope.validdationNum = function(value){
			var regFour = /^\d+$/;
			if(!regFour.test(value) ){
		 		return '请输入大于0的整数';
		 	}
		}
		/**
		 * 验证收益率
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		$scope.validdationYield = function (value){
			var regTw0 = /^\d+([.]\d{0,4})?$/;
			if(!regTw0.test(value) || value <0 || value >100 ||value ==''){
		 		return '大于0小于100，最多4位小数';
		 	}
		}
		/**
		 * 验证净价
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		$scope.validdationNetprc = function (value){
			var regTw0 = /^\d+([.]\d{0,4})?$/;
			if(!regTw0.test(value) || value <0 || value >200 || value==''){
		 		return '大于0小于200，最多4位小数';
		 	}
		}



	},

});
