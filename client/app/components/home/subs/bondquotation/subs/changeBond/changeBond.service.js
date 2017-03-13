var BONDCONFIG = require('../../../../../../../bond.config.js');
import angular from 'angular';

let ChangeBondServiceModule = angular.module('ChangeBondService', [])
.factory('ChangeBondService',['$http','$q',function($http,$q){
	return {
		// 计算净价
		calSettlementAmountYieldForCM(obj,name){


			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calCleanPriceByYieldForCM",
				data: JSON.stringify({
					bondid:obj.bondid,
					dealDate:obj.dealDate,
					clearSpeed:'0',
					yield:obj.yldrto/100,

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
		// 计算收益
		calSettlementAmountCleanPriceForCM(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calYieldByCleanPriceForCM",
				data: JSON.stringify({

					bondid:obj.bondid,
					dealDate:obj.dealDate,
					clearSpeed:'0',
					cleanPrice:obj.netprc,

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
	}
}])
.name;
export default ChangeBondServiceModule;