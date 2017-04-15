app.component('login', {
	restrict: 'E',
	bindings: {},
	templateUrl: './login.html',
	controller: function($state,$stateParams,userStatusService,netUserService, userStatusAuth) {
		"ngInject";
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.userStatusService = userStatusService;
		this.name = '登录';
		this.loginLabel = '登录';
		/*this.account = '18888888888';
		this.password = '654321';*/

		this.$onInit = function(){
			//this.login();
		}
		this.login = function(){
			this.loginLabel = '正在登录……';
			userStatusAuth.login(this.account,this.password, this.numberOfLanding, this.picGenerationCode)
			.then((res)=>{
				this.loginLabel = '登录';
				return $state.go('home.message');
			}).catch((err)=>{
				console.log('login Fail:', err);
				this.loginLabel = err.data.msg||'登录失败';
			});
		}
		this.register = function(){
			this.userStatusService.register(this.acc,this.pas);
		}
		this.generate = function(){
			this.userStatusService.generate(this.acc);
		}
		this.reloadPicGenerationUrl = function(){
			this.numberOfLanding = netUserService.generateUuid();
			this.picGenerationUrl = netUserService.picGeneration(this.numberOfLanding);
		}
		this.reloadPicGenerationUrl();
	}
});