class BargainlistController {
	constructor($rootScope,$scope,$stateParams,bargainlistService,$state,pagetabService) {
		"ngInject";
		this.name = 'bargainlist';
		this.bargainlistService = bargainlistService;
		this.$rootScope = $rootScope;
		this.pagetabService = pagetabService;
		this.$scope = $scope;
		this.$scope.$on('refresh-bargain-list',(event,args)=>{
			this.getBarginList();
		});
	}
	$onInit(){
		this.pagetabService.activeTab({
			tabKey: 'home.chatroom',
			routeState:'home.chatroom.bargainlist',
			routeParams:angular.copy(this.$stateParams),
			routeLabel:'消息中心',
		});
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
	changeBargain(b){
		this.switchBargain({flag:'b',v:b});
	}
	togglelist(bargain){
		bargain.fold = !bargain.fold;
	}
}
