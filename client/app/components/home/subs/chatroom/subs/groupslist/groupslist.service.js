var BONDCONFIG = require('../../../../../../../bond.config.js');
import angular from 'angular';

let GroupslistServiceModule = angular.module('GroupslistService', [])
.factory('GroupslistService',['$http','$q',function($http,$q){
	return {
		//
	}
}])
.name;
export default GroupslistServiceModule;