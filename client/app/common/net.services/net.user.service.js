
/**
 * 用户相关接口 DEMO
 * @type {[type]}
 */
app.factory('netUserService',['$http','$q', 'userStatusService', 'ProxyRequestService', function($http,$q, userStatusService, ProxyRequestService){
	return {
		/**
		 * 生成UUID
		 */
		generateUuid: function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		},
		/**
		 * 用户登录
		 * @param  {String} account
		 * @param  {String} password
		 * @param  [Number] ifSecond
		 * @return {[type]}
		 */
		login: function(account, password, ifSecond){
			return ProxyRequestService.post('/E_project_base/authority/login/loginValidate',{
				loginName:account,
				loginPassword:password,
				// pictureAuthkey:"",
				loginWay:"4",
				loginTerminalType:"2",
				equipmentNumber:"WEB-EBASE",
				numberOfLanding:this.generateUuid(),
				// auroraID:"",
				isCarryOn:ifSecond?"1":""
			});
		},
		/**
		 * 4.1.12	获取个人信息页用户信息
		 */
		getUserInfoPageDetail()
		{
			return ProxyRequestService.post('/E_project_base/authority/user/getUserInfoPageDetail',{

			});
		}
		
	}
}]);
