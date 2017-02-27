class BargainlistController {
	constructor($scope,$stateParams,bargainlistService,$state) {
		this.name = 'bargainlist';
		this.bargainlistService = bargainlistService;
	}
	$onInit(){
		this.getBarginList();
	}
	getBarginList(){
		let promise = this.bargainlistService.queryBondNegtprcList();
		promise.then((data)=>{
			if(data.status===200){
				console.log(data.data.data);
				this.bargainlist = data.data.data.map((item)=>{
					item.fold=true;return item;
				});
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
BargainlistController.$inject =  ['$scope','$stateParams','bargainlistService','$state'];
export default BargainlistController;
