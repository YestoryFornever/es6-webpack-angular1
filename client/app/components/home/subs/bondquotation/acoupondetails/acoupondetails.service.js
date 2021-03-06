app.factory('acoupondetailsService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {
		//获取详细的个券信息
		
		detailInfo(obj) {
			// console.log(obj);
			//通过$q服务注册一个延迟对象 deferred
			let deferred = $q.defer();
			// let  promise = deferred.promise;  //通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + "ainas/web/queryDetailBondBaseInfo",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
				// data:{
				// 	bondid:acoupondId
				// }
			}).then((response) => {
				if(response.status==200){
					deferred.resolve(response);
				}else{
					deferred.reject(response);
				}
				
			});
			return deferred.promise;
		},
		//搜索
		searchBondBreed(obj){
			let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"ainas/bond/fuzzyMatchingForBond",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
					// data:{
					// 	bondid:acoupondId
					// }
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
		},


// 我的好友我的群
// 1.获取好友列表
	myFriends(obj){
		let deferred=$q.defer(); 
		$http({
				method:'POST',
				url:BONDCONFIG.getIP()+"E_project_base/authority/getFriendList",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
				// data:{
				// 	bondid:acoupondId
				// }
			}).then((response)=>{
				// debugger;
				deferred.resolve(response);
			},(response)=>{
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
		},
	// 2.获取我的群
		groupMy(obj){
			let deferred=$q.defer(); 
		$http({
				method:'POST',
				url:BONDCONFIG.getIP()+"E_project_base/group/getGroupOwnList.json",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
				// data:{
				// 	bondid:acoupondId
				// }
			}).then((response)=>{
				// debugger;
				deferred.resolve(response);
			},(response)=>{
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
		},
// 查询我的好友我的群
		searchFriendsGroups(obj){
			let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"E_project_base/authority/user/getFriendAndGroupList",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
					// data:{
					// 	bondid:acoupondId
					// }
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
		},
// 发送报价
	sendBondPrice(obj){
		let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/sendBondQuote",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
					// data:{
					// 	bondid:acoupondId
					// }
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
	},








}






}]);