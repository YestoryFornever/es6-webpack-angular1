app.factory('ChatModelService',['$http','$q','ProxyRequestService',function($http,$q,ProxyRequestService){
	return {
		getUserDetailList: function(userIds){
			// console.log(userIds);
			return ProxyRequestService.post('E_project_base/authority/user/getUserDetailList',{
				userIdList:userIds
			});
		},
	}
}]);