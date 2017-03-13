import angular from 'angular';
import netUserService from 'netUserService';
/**
 * 用户状态服务 
 * @type {[type]}
 */
let userStatusService = angular.module('userStatusService', [])
.factory('userStatusService',['$http','$q',function($http,$q){
	console.log('userStatusService');
	return {
		
	}
}]);

export default userStatusService.name;
