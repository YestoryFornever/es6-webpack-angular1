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

		}
	}
}])
.name;
export default BondTrialServiceModule;