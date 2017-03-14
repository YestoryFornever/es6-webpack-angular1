
import angular from 'angular';

let countDownServiceModule = angular.module('countDownService', [])
.factory('.countDownService',['$http','$q',function($http,$q){
	return {
		//
	}
}])
.name;
export default countDownServiceModule;