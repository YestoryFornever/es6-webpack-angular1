app.factory('friendRelationshipService',['$http','$q','ProxyRequestService',function($http,$q,ProxyRequestService){
	return {
		getFriendList(){
			return ProxyRequestService.post(
				'E_project_base/authority/getFriendList',
				{},
				BONDCONFIG.JH
			);
		},
		deleteFriendRelationship(params){
			return ProxyRequestService.post(
				'E_project_base/authority/deleteFriendRelationship',
				params,
				BONDCONFIG.JH
			);
		},
		addFriendRelationship(params){
			return ProxyRequestService.post(
				'E_project_base/authority/addFriendRelationship',
				params,
				BONDCONFIG.JH
			);
		}
	}
}]);
