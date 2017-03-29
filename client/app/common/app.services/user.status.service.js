/**
 * 用户状态服务 
 * @type {[type]}
 */
app.factory('userStatusService',['$http','$q',function($http,$q){
	return {
		lid: BONDCONFIG.USERINFO.lid,
	}
}]);
