var BONDCONFIG = require('../../../../../../bond.config.js');
import angular from 'angular';

let cashofferServiceModule = angular.module('cashofferService', [])
.factory('cashofferService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {
		// 新增报价
		addBatchBondQuote(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/addBatchBondQuote",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
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

	}
}])
.name;
export default cashofferServiceModule;