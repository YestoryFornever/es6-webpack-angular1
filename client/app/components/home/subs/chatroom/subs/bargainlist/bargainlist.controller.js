class BargainlistController {
	constructor($rootScope,$scope,$stateParams,bargainlistService,$state) {
		this.name = 'bargainlist';
		this.bargainlistService = bargainlistService;
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$scope.$on('refresh-bargain-list',(event,args)=>{
			this.getBarginList();
		});
	}
	$onInit(){
		this.getBarginList();
	}
	getBarginList(){
		let promise = this.bargainlistService.queryBondNegtprcList();
		promise.then((data)=>{
			if(data.status===200){
				if(data.data.status==="0"){
					// debugger;
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
BargainlistController.$inject =  ['$rootScope','$scope','$stateParams','bargainlistService','$state'];
export default BargainlistController;
