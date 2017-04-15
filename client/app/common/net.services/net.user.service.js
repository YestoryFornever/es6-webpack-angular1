
/**
 * 用户相关接口 DEMO
 * @type {[type]}
 */
app.factory('netUserService', function($http,$q, ProxyRequestService){
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
		 * @param {String} numberOfLanding 验证码索引
		 * @param  [Number] ifSecond
		 * @return {[type]}
		 */
		login: function(account, password, numberOfLanding, pictureAuthkey){
			return ProxyRequestService.post('/E_project_base/authority/login/loginValidate',{
				loginName:account,
				loginPassword:password,
				pictureAuthkey: pictureAuthkey,
				loginWay:"4",
				loginTerminalType:"2",
				equipmentNumber:"WEB-EBASE",
				numberOfLanding: numberOfLanding,
				// auroraID:"",
				isCarryOn:1
			});
		},
		/**
		 * 登出
		 * @return {[type]} [description]
		 */
		logout: function(){
			return ProxyRequestService.post('/E_project_base/authority/login/outlogin',{
				
			});
		},
		/**
		 * 注册
		 * @param  {[type]} acc [description]
		 * @param  {[type]} pas [description]
		 * @return {[type]}     [description]
		 */
		register:function(acc,pas){
			return ProxyRequestService.post('/E_project_base/authority/register/registerValidate',{
				loginName:acc,
				shortMessageAuthkey:"1234",
				loginPassword:pas,
				// referralCode:"",
				loginWay:"4",
				loginTerminalType:"2",
				// auroraID:"",
				equipmentNumber:"WEB-EBASE"
			});
		},
		/**
		 * 获取验证码
		 * @param  {[type]} phone [description]
		 * @return {[type]}       [description]
		 */
		generate(phone){
			return ProxyRequestService.post('/E_project_base/authority/verification/smsExistGeneration',{
				phone:phone,
			});
		},
		/**
		 * 获取个人信息页用户信息
		 */
		getUserInfoPageDetail()
		{
			return ProxyRequestService.post('/E_project_base/authority/user/getUserInfoPageDetail.json', {

			});
		},
		/**
		 * 验证码URL
		 * @return {[type]} [description]
		 */
		picGeneration: function(numberOfLanding){
			return ProxyRequestService._prefix+'E_project_base/authority/verification/picGeneration?numberOfLanding='+numberOfLanding+'&time='+(new Date()).getTime();
		},
		/**
		 * 4.4.1	获取名片认证信息
		 * @return {[type]} [description] realCertifyState 1未认证，2待认证，3通过，4不通过
		 */
		getBusinessCardCertify: function()
		{
			return ProxyRequestService.post('E_project_base/authority/card/getBusinessCardCertify');
		}
	}
});
