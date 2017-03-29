app.factory('messageService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {

// 4.3.1获取资讯列表
recommendedlist(obj){
			let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-xpress/sns/recomList.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
		},
qinfoList(obj) {//快讯
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + "e-xpress/sns/qinfoList.json",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response) => {
				// debugger;
				deferred.resolve(response);
			}, (response) => {
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
		},
// 4.3.2获取3全部4负面 5自选 6自媒体列表
messagelist(obj) {
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + "e-xpress/sns/infoList.json",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response) => {
				// debugger;
				deferred.resolve(response);
			}, (response) => {
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
		},
// 收藏列表
collection(obj){
let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + "e-xpress/sns/listFavorite.json",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response) => {
				// debugger;
				deferred.resolve(response);
			}, (response) => {
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
},
// 搜索
searchInfoList(obj){
	let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + "e-xpress/sns/searchInfoList.json",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response) => {
				// debugger;
				deferred.resolve(response);
			}, (response) => {
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
},
favoriteCnt(obj){
let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + "e-xpress/sns/favoriteCnt.json",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response) => {
				// debugger;
				deferred.resolve(response);
			}, (response) => {
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
},
}
}]);
