var BONDCONFIG = require('../../../../../bond.config.js');
import angular from 'angular';

let minebondServiceModule = angular.module('minebondService', [])
.factory('minebondService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {
		// 获取报价列表
		queryQuoteList(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/queryQuoteList",
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
export default minebondServiceModule;