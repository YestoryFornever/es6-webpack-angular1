import angular from 'angular';

let numChangeYiFilterModule = angular.module('numChangeYiFilter', [])
.filter('numChangeYiFilter',function(){
	return function(numChangeYi){
		// console.log(numChangeYi)
		let reg = /\./;
		if(reg.test(numChangeYi)){// 数量亿
			// numChangeYi = (numChangeYi/100000000).tofixed(0) + '亿' ;
			// numPointTwo = parseInt() numPointTwo.split('.')[0]+ "." + numPointTwo.split('.')[1].substr(0,4);
		}
		return numChangeYi ;
	};
})
.name;

export default numChangeYiFilterModule;