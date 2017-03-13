import angular from 'angular';

let numPointFourFilterModule = angular.module('numPointFourFilter', [])
.filter('numPointFourFilter',function(){
	return function(numPointFour){
		let reg = /\./;
		if(reg.test(numPointFour)){
			numPointFour = numPointFour + '';
			numPointFour = numPointFour.split('.')[0]+ "." +( numPointFour.split('.')[1] ? numPointFour.split('.')[1].substr(0,4) : '');
		}
		return numPointFour ;
	};
})
.name;

export default numPointFourFilterModule;