var BONDCONFIG = require('../../../../bond.config.js');
import angular from 'angular';

let BondTrialServiceModule = angular.module('BondTrialService', [])
.factory('BondTrialService',['$http','$q',function($http,$q){
	return {
		// 债券搜索
		fuzzyMatchingForBond(obj){
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
		calSettlementDate(obj){
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
		// 查询债券基本信息
		queryDetailBondBaseInfo(obj){
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
		calSettlementAmountCleanPriceForCM(obj,name){//计算结算金额 和净价 收益率
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
}])
.name;
export default BondTrialServiceModule;