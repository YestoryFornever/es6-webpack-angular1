/*
* @Author: Administrator
* @Date:   2017-03-21 20:20:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-21 20:28:45
*/
/*
* 选择联系人
*/
app.factory('acoupondService',['$http','$q','ProxyRequestService',function($http,$q,ProxyRequestService,){
	return {
// 我的好友我的群
// 1.获取好友列表
myFriends(obj){
return ProxyRequestService.post("E_project_base/authority/getFriendList",{
				
			});
		},
	// 2.获取我的群
groupMy(obj){
return ProxyRequestService.post("E_project_base/group/getGroupOwnList.json",{
			userId:'',
			usrAhr:''	
			});
		},
// 查询我的好友我的群
searchFriendsGroups(obj){
return ProxyRequestService.post("E_project_base/authority/user/getFriendAndGroupList",{
			queryValue:''
			});
		},
// 发送报价
sendBondPrice(obj){
return ProxyRequestService.post("e-bondquote/bondNegtprc/sendBondQuote",{
			bondOfrid:'',
			negtprcUserId:''
			});
	},
}


}]);
