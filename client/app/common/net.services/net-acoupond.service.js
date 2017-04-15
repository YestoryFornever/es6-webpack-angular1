/*
* @Author: Administrator
* @Date:   2017-03-21 20:20:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-21 20:28:45
*/
/*
* 选择联系人
*/
app.factory('NetAcoupondService', function(ProxyRequestService,){
	return {
		// 我的好友我的群
		// 1.获取好友列表
		myFriends(obj){
			return ProxyRequestService.post("E_project_base/authority/getFriendList",obj||{
				
			});
		},
			// 2.获取我的群
		groupMy(obj){
			return ProxyRequestService.post("E_project_base/group/getGroupOwnList.json",obj||{
				userId:'',
				usrAhr:''	
			});
		},
		// 查询我的好友我的群
		searchFriendsGroups(obj){
			return ProxyRequestService.post("E_project_base/authority/user/getFriendAndGroupList",obj||{
				queryValue:''
			});
		},
		// 发送报价
		sendBondPrice(obj){
			return ProxyRequestService.post("e-bondquote/bondNegtprc/sendBondQuote",obj||{
				bondOfrid:'',
				negtprcUserId:''
			});
		},
	}
});


//获取详细的个券信息
		
		// detailInfo(obj){
			// console.log(obj);
			//通过$q服务注册一个延迟对象 deferred
			// let deferred=$q.defer(); 
			// let  promise = deferred.promise;  //通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
			// $http({
			// 	method:'POST',
			// 	url:BONDCONFIG.getIP()+"ainas/web/queryDetailBondBaseInfo",
			// 	data: JSON.stringify(obj),
			// 	headers: BONDCONFIG.JH,
				// data:{
				// 	bondid:acoupondId
				// }
			// }).then((response)=>{
				// debugger;
			// 	deferred.resolve(response);
			// },(response)=>{
				// debugger;
		// 		deferred.resolve(response);
		// 	});
		// 	return deferred.promise;
		// },
		//搜索
		// searchBondBreed(obj){
		// 	let deferred=$q.defer(); 
		// 	$http({
		// 			method:'POST',
		// 			url:BONDCONFIG.getIP()+"ainas/bond/fuzzyMatchingForBond",
		// 			data: JSON.stringify(obj),
		// 			headers: BONDCONFIG.JH,
					
		// 		}).then((response)=>{
					
		// 			deferred.resolve(response);
		// 		},(response)=>{
					
		// 			deferred.resolve(response);
		// 		});
		// 		return deferred.promise;
		// },
