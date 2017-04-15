class DstrDygridController {
	constructor(
		$scope,
		$rootScope,
		BondDstrMainService
	) {
		"ngInject";
		this.name = 'dstr-dygrid';
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.BondDstrMainService = BondDstrMainService;
	}
	$onInit(){}
	listDATrClick(item,index){
		this.editabled.curItemIndex = index;
		//this.editabled.curItem = angular.copy(item);
	}
	listATrClick(item,index){
		//this.lists.curItemIndex = index;
	}
	copyNewRow(){
		this.editabled.items.push(angular.copy(this.editabled.items[this.editabled.curItemIndex]));
	}
	emptyMineTable(){
		this.editabled.items.length = 0;
	}
	submit(){
		this.confirm();
	}
	cancelAddRows(){
		this.bools.showMineTable = false;
	}
	addNewRow(){
		this.editabled.items.push(angular.copy(this.editabled.emptyObj));
	}
}
