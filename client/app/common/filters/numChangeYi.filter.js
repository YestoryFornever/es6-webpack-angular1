app.filter('numChangeYiFilter',function(){
	return function(numChangeYi){
		if(numChangeYi){// 数量亿
			numChangeYi = (numChangeYi/100000000) + '亿' ;
		}

		return numChangeYi ;
	};
});
