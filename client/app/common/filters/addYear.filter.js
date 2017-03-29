app.filter('addYearFilter',function(){
	return function(addyear){
		// console.log(addyear/1)
		let reg = /\./;
		if(reg.test(addyear)){
			addyear =addyear.split('.')[0]+ '.'+  addyear.split('.')[1].substr(0,4)  + 'Y';
		}
		return addyear ;
	};
});
