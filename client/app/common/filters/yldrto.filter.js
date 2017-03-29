app.filter('yldrtoFilter',function(){
	return function(yldrto){
		let reg =/\./;
		if(yldrto ){//收益率
			if(reg.test(yldrto)){
				
				yldrto = yldrto*100+'';
				let two =yldrto.split('.')[1]? yldrto.split('.')[1] :'0';
				two =  two.length>4 ? two :( two + "0000");
				yldrto = yldrto.split('.')[0]+ "." + ( two.substr(0,4) );
			}
		}
		return yldrto ;
	};
});
