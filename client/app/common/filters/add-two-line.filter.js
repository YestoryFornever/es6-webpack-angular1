app.filter('addTwoLine',function(){
	return function(content){
		if(content==0){
			content = '--';
		}else if(content=='100.0000'){
			content = '--';
		}else {
			content = content  ? content : '  --';
		}
		
		return content ;
	};
});