var BONDCONFIG = require('../../../../../bond.config.js');
import angular from 'angular';

let pageheaderServiceModule = angular.module('pageheaderService', [])
.factory('pageheaderService',['$http','$q',function($http,$q){
	// console.log(BONDCONFIG);
	return {
		logout(){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"E_project_base/authority/login/outlogin",
				data: JSON.stringify({}),
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
export default pageheaderServiceModule;