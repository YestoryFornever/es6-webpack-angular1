app.filter('numPointTwoFilter',function(){
	return function(numPointTwo){
		let reg =/\./;
		if(reg.test(numPointTwo)){
			numPointTwo = numPointTwo + '';
			numPointTwo = numPointTwo.split('.')[0]+ "." + numPointTwo.split('.')[1].substr(0,2);
		}
		return numPointTwo ;
	};
});
