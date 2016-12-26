import angular from 'angular';

let plusServiceModule = angular.module('plusService', [])
.service('plusService',function(){
	this.minus = function(x) {
		return parseInt(x)-1;
	}
})
.name;

export default plusServiceModule;