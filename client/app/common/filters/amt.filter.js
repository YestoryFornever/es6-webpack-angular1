app.filter('amtFilter',function(){
	return function(amt){//金额
		amt = amt ? parseFloat(amt) : '';
		return amt;
	};
});