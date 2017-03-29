class BargainlistController {
	constructor($rootScope,$scope,$stateParams,bargainlistService,$state) {
		"ngInject";
		this.name = 'bargainlist';
		this.bargainlistService = bargainlistService;
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$scope.$on('refresh-bargain-list',(event,args)=>{
			this.getBarginList();
		});
	}
	$onInit(){
		(!!BONDCONFIG.USERINFO.uid) && (this.curUserId = BONDCONFIG.USERINFO.uid);
		this.getBarginList();
	}
	getBarginList(){
		let promise = this.bargainlistService.queryBondNegtprcList();
		promise.then((data)=>{
			if(data.status===200){
				if(data.data.status==="0"){
					this.bargainlist = data.data.data.map((item)=>{
						item.fold=true;return item;
					});
				}else{
					alert(data.data.msg);
				}
			}
		},(data)=>{
			console.warn("获取议价列表异常");
		});
	}
	changeUser(user){
		// console.log(user);
		this.friend = user;
		this.changeFriend({friend:user});
	}
	togglelist(bargain){
		bargain.fold = !bargain.fold;
	}
}
