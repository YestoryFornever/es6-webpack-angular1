app.factory('decimalsService',['$http','$q',function($http,$q){
	return {
		decimals(num,p){
			if(this._isNumeric(num)){
				num = Number(num);
				let pre = parseInt(num),
					after = Number((num-pre).toFixed(p));
				return (pre+after);
			}
			return false;
		},
		_isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}, 
	}
}]);