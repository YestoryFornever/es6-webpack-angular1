app.filter('percentOrBpFilter',function(){
	return function(content){
		if(content== 2 || content== 3){
			content = 'bp';
		}else{
			content = '%';
		}
		return content ;
	};
});