app.filter('ofrDtFilter',function(){
	return function(content,format){
		if(format){
			content = content  ? moment(content).format(format) : content;
		}else{
			content = content  ? moment(content).format('HH:mm') : content;
		}
		return content ;
	};
});