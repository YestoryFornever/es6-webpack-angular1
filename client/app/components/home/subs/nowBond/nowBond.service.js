var BONDCONFIG = require('../../../../../bond.config.js');
import angular from 'angular';

let nowBondServiceModule = angular.module('nowBondService', [])
.factory('nowBondService',['$http','$q',function($http,$q){
	return {
		searchBonds(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/queryListForBond",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 债券搜索
		searchBondBreed(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/fuzzyMatchingForBond",
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
		// 计算净价
		calSettlementAmountYieldForCM(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/calCleanPriceByYieldForCM",
				data: JSON.stringify({
					bondid:obj.bondid,
					dealDate:obj.dealDate,
					clearSpeed:obj.clearSpeed,
					yield:obj.yield,

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
					clearSpeed:obj.clearSpeed,
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
		},
		
	}

}])
.name;
export default nowBondServiceModule;