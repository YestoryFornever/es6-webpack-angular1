import angular from 'angular';

let addYearFilterModule = angular.module('arrReverse', [])
.filter('arrReverse',function(){
	return function(items) {
		return items.slice().reverse();
	};
})
.name;

export default addYearFilterModule;