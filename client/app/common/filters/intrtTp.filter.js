app.filter('intrtTpFilter',function(){
	return function(content,bool){
		if(content && content =='自定义' && bool){
			content = "%";
		}else if(content && content =='自定义' && !bool){
			content = ' ';
		}else if(content && bool){
			content = (content=='加点' || content=='减点' ) ? 'bp' :'';
		}
		return content;
	};
});