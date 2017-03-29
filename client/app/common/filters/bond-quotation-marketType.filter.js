app.filter('bondQuotationMarkeTType',function(){
	return function(bondMktCode){
		let bondMkt;
		switch(bondMktCode){
			case "银行间":bondMkt=".IB";break;
			case "沪市":bondMkt=".SH";break;
			case "深市":bondMkt=".SZ";break;
		}
		return bondMkt ;
	};
});