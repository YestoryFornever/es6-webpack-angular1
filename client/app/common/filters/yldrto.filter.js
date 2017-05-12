app.filter('yldrtoFilter',function(){
	return function(yldrto){
		if(yldrto ){//收益率
			yldrto = yldrto*1000000;
			yldrto = Math.round(yldrto)/10000;
		}
    else {
      yldrto = "--";
    }
		return yldrto ;
	};
});
