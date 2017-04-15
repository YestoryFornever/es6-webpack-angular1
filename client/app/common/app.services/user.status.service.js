/**
 * 用户状态服务
 * 注意作为基础服务，不要依赖其它自定义的服务，否则可能冲突
 * @type {[type]}
 */
app.factory('userStatusService', function($state, $location){
	var service = {
		lid: null,
		uid: null,
		userName: null,
		realCertifyState: null,

		setUserInfo: function(userinfo)
		{
			this.lid = userinfo.lid;
			this.uid = userinfo.uid;
			this.userName = userinfo.userName||'游客';
			this.realCertifyState = userinfo.realCertify;
			// 为了兼容以前的代码，BONDCONFIG先保留
			BONDCONFIG.setUSERINFO(userinfo);
			window.localStorage.USERINFO = JSON.stringify(userinfo);
		},

		clear: function()
		{
			window.localStorage.clear();
			this.lid = null;
			this.userName = null;
			return true;
		},

		authentication: function () {
	        if (!this.lid) {
	            // 记住登录前的URL
	            // console.log($state.current, $location);
	            window.localStorage.returnUrl = $location.$$absUrl;
	            return $state.go('login',{}, {reload: true});
	        }
	        return true;
	    }
	};
	var userinfo = window.localStorage.USERINFO;
	userinfo = userinfo?JSON.parse(userinfo):{};
	service.setUserInfo(userinfo);

	console.log('用户状态：',service);
	return service;
});
/**
 * 登录登出管理
 * @param  {[type]} $state                   [description]
 * @param  {[type]} $location                [description]
 * @param  {[type]} userStatusService        [description]
 * @param  {[type]} netUserService){	return {				login:  function(account, password, numberOfLanding, picGenerationCode)		{			return netUserService.login(account,password, numberOfLanding, picGenerationCode)			.then((res) [description]
 * @return {[type]}                          [description]
 */
app.factory('userStatusAuth', function($state, $location, userStatusService, netUserService){
	netUserService.getUserInfoPageDetail()
	.then(function(res){
		userStatusService.detail = res.data.data;
	}).catch(function(err){
		console.log(err);
		if (err.data.status==990002) {
			$state.go('login');
		};
	});
	return {
		/**
		 * 用户登录
		 * @param  {[type]} account           [description]
		 * @param  {[type]} password          [description]
		 * @param  {[type]} numberOfLanding   [description]
		 * @param  {[type]} picGenerationCode [description]
		 * @return {[type]}                   [description]
		 */
		login: function(account, password, numberOfLanding, picGenerationCode)
		{
			return netUserService.login(account,password, numberOfLanding, picGenerationCode)
			.then((res)=>{
				userStatusService.setUserInfo(res.data.data);
				return res;
			});
		},
		/**
		 * 退出
		 * @return {[type]} [description]
		 */
		logout: function(){
			return netUserService.logout()
			.catch((err)=>{
				console.warn(err);
				return err;
			}).then((res)=>{
				userStatusService.clear();
				$state.go('login');
			});
		},
	};
});
