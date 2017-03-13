var BONDCONFIG = require('../../../../../../bond.config.js');
import angular from 'angular';

let messageServiceModule = angular.module('messageService', [])
.factory('messageService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {

// 4.3.1获取资讯列表
recommendedlist(obj){
			let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"E_project_base/sns/recomList.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
		},
qinfoList(obj) {//快讯
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + "E_project_base/sns/qinfoList.json",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response) => {
				// debugger;
				deferred.resolve(response);
			}, (response) => {
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
		},
}
}])
.name;
export default messageServiceModule;