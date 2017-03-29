class PageheaderController {
	constructor($state,pageheaderService, nowBondService) {
		this.$state = $state;
		this.pageheaderService = pageheaderService;
		this.nowBondService = nowBondService;
	}
	someFunction(item, model)
	{
		console.log(item, model);
	}
	$onInit(){
		this.name = 'pageheader';
		(!!BONDCONFIG.USERINFO.userName) && (this.username = BONDCONFIG.USERINFO.userName);
	}
	logout(){
		let promise = this.pageheaderService.logout();
		promise.then((data)=>{
			console.log(data);
			if(data.data && data.data.status!=="0"){alert(data.data.msg);}
			window.localStorage.clear();
			this.$state.go('login');
		},(data)=>{
			console.warn("用户登录异常");
		});
	}
};
PageheaderController.$inject = ['$state','pageheaderService', 'nowBondService'];
