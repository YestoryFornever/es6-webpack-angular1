import angular from 'angular';

let yldrtoFilterModule = angular.module('yldrtoFilter', [])
.filter('yldrtoFilter',function(){
	return function(yldrto){
		let reg =/\./;
		if(yldrto ){//收益率
			if(reg.test(yldrto)){
				yldrto = yldrto*100+'';
				yldrto = yldrto.split('.')[0]+ "." + (yldrto.split('.')[1] ?  yldrto.split('.')[1].substr(0,4) : '00');
			}
		}
		return yldrto ;
	};
})
.name;

export default yldrtoFilterModule;