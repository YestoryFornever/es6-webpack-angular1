app.factory('chatroomUEService',['$http','$q',function($http,$q){
	return {
		__y(key,bool){
			if(bool){
				let reg =/\./;
				if(key ){key = key*100+'';
					if(reg.test(key)){
						key = key.split('.')[0]+ "." + (key.split('.')[1] ?  key.split('.')[1].substr(0,4) : '00');
					}
				}
			}else{
				return key/100;
			}
			return key;
		},
		__p(key,bool){
			if(bool){
				key = key.split('.')[0]+ "." + key.split('.')[1].substr(0,4);
			}
			return key;
		},
		__n(key,bool){
			if(bool){
				key = parseInt(key/10000);
			}else{
				return key*10000;
			}
			return key;
		},
		get(url){
			let deferred = $q.defer();
			$http({
				method: 'GET',
				url: url,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.reject(response);
			});
			return deferred.promise;
		},
		findElemAttr(arr,iattr,val,oattr){
			for (var i=0;i<arr.length;i++){
				if(arr[i][iattr]==val){
					return arr[i][oattr];
				}
			}
			return false;
		}
	}
}]);