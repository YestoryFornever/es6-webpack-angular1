var BONDCONFIG = require('../../../bond.config.js');
import angular from 'angular';

let <%= upCaseName %>ServiceModule = angular.module('<%= upCaseName %>Service', [])
.factory('<%= upCaseName %>Service',['$http','$q',function($http,$q){
	return {
		//
	}
}])
.name;
export default <%= upCaseName %>ServiceModule;