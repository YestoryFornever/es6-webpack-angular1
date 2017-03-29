app.filter('bondMkt',function(){
	return function(bondMktCode){
		let bondMkt;
		switch(bondMktCode){
			case "1":bondMkt=".IB";break;
			case "2":bondMkt=".SH";break;
			case "3":bondMkt=".SZ";break;
		}
		return bondMkt ;
	};
});