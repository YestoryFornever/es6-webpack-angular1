app.filter('addPercentFilter',function(){
	return function(addPercent,bool){
		if(bool){//只添加%
			addPercent = addPercent ?   '%' : "";
		}else{
			addPercent = addPercent? addPercent + '%' : "";
		}
		// console.log(addyear/1)
		// let reg = /\./;
		// if(reg.test(addyear)){
		// 	addyear =addyear.split('.')[0]+ '.'+  addyear.split('.')[1].substr(0,4)  + 'Y';
		// }
		return addPercent ;
	};
});