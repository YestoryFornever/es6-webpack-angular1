var BONDCONFIG = require('../../../../../../bond.config.js');
import angular from 'angular';

let backgroundsystemServiceModule = angular.module('backgroundsystemService', [])
.factory('backgroundsystemService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {
	// 	detailInfo(obj){
	// 		console.log(obj);
	// 		通过$q服务注册一个延迟对象 deferred
	// 		let deferred=$q.defer(); 
	// 		let  promise = deferred.promise;  //通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
	// 		$http({
	// 			method:'POST',
	// 			url:BONDCONFIG.getIP()+"ainas/web/queryDetailBondBaseInfo",
	// 			data: JSON.stringify(obj),
	// 			headers: BONDCONFIG.JH,
	// 			data:{
	// 				bondid:acoupondId
	// 			}
	// 		}).then((response)=>{
	// 			debugger;
	// 			deferred.resolve(response);
	// 		},(response)=>{
	// 			debugger;
	// 			deferred.resolve(response);
	// 		});
	// 		return deferred.promise;
	// 	},
		
	}
}])
.name;
export default backgroundsystemServiceModule;