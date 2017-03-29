
/**
 * 债券试算
 * @type {[type]}
 */
app.factory('netBondTrialService',['$http','$q','$uibModal','ProxyRequestService',function($http,$q, $uibModal,ProxyRequestService){

	return {
		/**
		 * /
		 * @param  {[type]} item [item为对象 ，{bondCd:'',bondid:''....}]
		 * @return {[type]}      [description]
		 */
		openCalculator(item){//计算器 弹窗
			this.$uibModal = $uibModal;
			this.dataCalculatorModal ={
				itemInfo:{},
			}
			let that =this;
			this.$uibModal.open({
				animation: true,
				component:'bondTrial',
				windowClass:'my-bond-trial',
				size: 'xs',//'lg',//'sm',
				resolve: {
					modalData:function(){
						if(item){
							that.dataCalculatorModal['itemInfo'] = item;
						}
						return that.dataCalculatorModal;
					}
				}
			}).result.then(function (selectedItem) {},that);
		},
		/**
		 * /模糊搜索
		 * @param  {[type]} obj [{keyword:''}根据关键词搜索]
		 * @return {[type]}     [description]
		 */
		fuzzyMatchingForBond(obj){
			// return ProxyRequestService.post('/ainas/bond/fuzzyMatchingForBond',{
			// 	keyword:obj.keyword
			// })
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/fuzzyMatchingForBond",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		/**
		 * /
		 * @param  {[type]} obj [description]
		 * @return {[type]}     [description]
		 */
		calSettlementDate(obj){
			// return ProxyRequestService.post('/ainas/web/calSettlementDateForWeb',{
			// 	bondid:obj.bondid,//债券id
			// 	dealDate:obj.dealDate,//交易日期
			// 	settlementDate:obj.settlementDate,//结算日期
			// 	cleanPrice: obj.cleanPrice,//净价
			// 	fullRate:obj.fullRate,//全价
			// 	clearSpeed:obj.clearSpeed,
			// 	yield:obj.yield,//收益率
			// 	dealNum:obj.dealNum,//数量
			// })
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/calSettlementDateForWeb",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;

		},
		/**
		 * /查询债券基本信息
		 * @param  {[type]} obj [description]
		 * @return {[type]}     [description]
		 */
		queryDetailBondBaseInfo(obj){
			// return ProxyRequestService.post('/ainas/web/queryDetailBondBaseInfo',{
			// 	bondid:obj.bondid,//债券id
			// })
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/queryDetailBondBaseInfo",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 获取指标数据
		/**
		 * /
		 * @param  {[type]} obj  [description]
		 * @param  {[type]} name [根据 (净价)/(全价)/(收益率)]
		 * @return {[type]}      [description]
		 */
		calcIndicatorsForWeb(obj,name){
			let sendObj = {};
			sendObj.bondid = obj.bondid;
			sendObj.dealDate = obj.dealDate;
			sendObj.settlementDate = obj.settlementDate;
			if(name){
				sendObj[name] = obj[name];
			}else{
				sendObj.yield = obj.yield/100;
			}
			// return ProxyRequestService.post('/ainas/web/calcIndicatorsForWeb',sendObj)
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/calcIndicatorsForWeb",
				data: JSON.stringify(sendObj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		calSettlementAmountYieldForCM(obj,name){//计算结算金额 和净价 收益率
			// let sendObj = {
			// 	bondid:obj.bondid,
			// 	dealDate:obj.dealDate,
			// 	clearSpeed:obj.clearSpeed,
			// 	dealNum:obj.dealNum ? obj.dealNum*10000 : '0',
			// 	yield:obj.yield/100,
			// };
			// return ProxyRequestService.post('/ainas/bond/calSettlementAmountYieldForCM',sendObj);
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calSettlementAmountYieldForCM",
				data: JSON.stringify({
					bondid:obj.bondid,
					dealDate:obj.dealDate,
					clearSpeed:obj.clearSpeed,
					dealNum:obj.dealNum ? obj.dealNum*10000 : '0',
					yield:obj.yield/100,
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		/**
		 * /
		 * @param  {[type]} obj  [description]
		 * @param  {[type]} name [description]
		 * @return {[type]}      [description]
		 */
		calSettlementAmountCleanPriceForCM(obj,name){//计算结算金额 和净价 收益率
			// let sendObj ={
			// 	bondid:obj.bondid,
			// 	dealDate:obj.dealDate,
			// 	clearSpeed:obj.clearSpeed,
			// 	dealNum:obj.dealNum ? obj.dealNum*10000 : '0',
			// 	cleanPrice:obj.cleanPrice,
			// };
			// return ProxyRequestService.post('/ainas/bond/calSettlementAmountCleanPriceForCM',sendObj);
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calSettlementAmountCleanPriceForCM",
				data: JSON.stringify({
					bondid:obj.bondid,
					dealDate:obj.dealDate,
					clearSpeed:obj.clearSpeed,
					dealNum:obj.dealNum ? obj.dealNum*10000 : '0',
					cleanPrice:obj.cleanPrice,
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		}
	}
}]);