app.filter('addTwoLine',function(){
	return function(content){
		content = content  ? content : '  --';
		return content ;
	};
});