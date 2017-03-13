import angular from 'angular';

/**
 * 存储服务
 * @type {[type]}
 */
let storageService = angular.module('storageService', [])
.factory('storageService',['$http','$q',function($http,$q){
	return {
		set: function(key, value)
		{
			value = JSON.stringify([value]);
			window.localStorage[key] = value;
		},

		get: function(key)
		{
			var value = window.localStorage[key];
			if (value) {
				value = JSON.parse(value);
			};
			
			return (value && value[0])?value[0]:null;
		}
	}
}]);

export default storageService.name;
