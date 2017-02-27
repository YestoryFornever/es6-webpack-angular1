var BONDCONFIG = require('../../../../../../../bond.config.js');
import angular from 'angular';

let FriendslistServiceModule = angular.module('FriendslistService', [])
.factory('FriendslistService',['$http','$q',function($http,$q){
	return {
		//
	}
}])
.name;
export default FriendslistServiceModule;