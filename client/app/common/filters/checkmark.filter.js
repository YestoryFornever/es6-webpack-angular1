import angular from 'angular';

let checkmarkFilterModule = angular.module('checkmarkFilter', [])
.filter('checkmarkFilter',function(){
	return function(input){
		return input ? '\u2713' : '\u2718';
	};
})
.name;

export default checkmarkFilterModule;