app.factory('transferService',['$http','$q',function($http,$q){
	return {
		dater(key){
			if(Object.prototype.toString.call(key) === "[object String]"){
				return new Date(key.split(/[\s,\u4e00-\u9fa5]+/).join(" "));
			}else{
				function x(n){return n<10?("0"+n):n;}
				return key.getFullYear()+"年"+x(key.getMonth()+1)+"月"+x(key.getDate())+"日 "+x(key.getHours())+":"+x(key.getMinutes());
			}
		},
		scientific(num){
			var str = num.toString();
			var reg = /^(\d+)(e)([\-]?\d+)$/;
			var arr, len, zero = '';
			if(!reg.test(str)) {//6e7或6e+7 都会自动转换数值
				return num;
			}else{
				arr = reg.exec(str);//6e-7 需要手动转换
				len = Math.abs(arr[3]) - 1;
				for (var i = 0; i < len; i++) {
					zero += '0';
				}
				return '0.' + zero + arr[1];
			}
		},
		integers(num,p){
			if(this._isNumeric(num)&&this._isNumeric(p)){
				num = Number(num);
				let n = Math.pow(10,Math.abs(p));
				return p>0?num*n:num/n;
			}
			return NaN;
		},
		decimals(num,p){//小数点截位
			if(this._isNumeric(num)){
				num = Number(num);
				let pre = parseInt(num),
					after = Number((num-pre).toFixed(p));
				return (pre+after);
			}
			return num;
		},
		_isNumeric(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}, 
	}
}]);