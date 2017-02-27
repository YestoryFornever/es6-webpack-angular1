class LoginController {
	constructor($state,$stateParams,loginService,$http) {
		this.$state = $state;
		this.$stateParams = $stateParams;
		this.loginService = loginService;
		this.$http = $http;
		this.name = '登录';
		/*this.account = '15811111111';
		this.password = '123qwe';*/
		this.account = '15652598188';
		this.password = 'q123456';
	}
	$onInit(){
		//this.login();
	}
	hack(){
		this.$state.go('home');
	}
	login(ifSecond){
		let promise = this.loginService.login(this.account,this.password,ifSecond);
		promise.then((data)=>{
			// debugger;
			if(data.status !== 200 || !data.data){
				alert(data.statusText||'服务器异常');
				return;
			}
			if(data.data.status === "200003"){
				this.login(true);
			}else if(data.data.status !== "0"){
				alert(data.data.msg);
			}else{
				this.$state.go('home');
			}
		},(data)=>{
			console.warn("用户登录异常");
		});
	}
	register(){
		let promise = this.loginService.register(this.acc,this.pas);
		promise.then((data)=>{
			// debugger;
		},(data)=>{
			console.warn("用户注册异常");
		});
	}
	generate(){
		let promise = this.loginService.generate(this.acc);
		promise.then((data)=>{
			// debugger;
		},(data)=>{
			console.warn("获取验证码异常");
		}); 
	}
}
LoginController.$inject = ['$state','$stateParams','loginService','$http'];
export default LoginController;
