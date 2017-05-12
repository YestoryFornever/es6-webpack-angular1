app.filter('addTwoLineAmt',function(){
	return function(content,bool){
		if(bool){
			return content;
		}else{
			content = content  ? '--' : content;
		}
		return content ;
	};
});