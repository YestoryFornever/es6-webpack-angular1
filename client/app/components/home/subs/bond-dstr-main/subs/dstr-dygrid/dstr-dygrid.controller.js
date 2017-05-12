class DstrDygridController {
	constructor(
		$scope,
		$rootScope,
		$state,
		transferService,
		BondDstrMainService,
		UikitPager
	) {
		"ngInject";
		this.name = 'dstr-dygrid';
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$state = $state;
		this.BondDstrMainService = BondDstrMainService;
		this.UikitPager = UikitPager;
	}
	$onInit(){
		this.loading = false;
		if(this.noPager!='1'){
			this.Pager = new this.UikitPager(20, 5);//每页多少条
			let that = this;
			this.Pager.onSelected = function(page){
				that.diseditabled.page.currentPage = page;//当前页
				that.getList(page);
			}
		}
		this.getList();
	}
	getList(pageNum='1',pageSize='20'){
		this.loading = true;
		this.fnList({pageNum:pageNum,pageSize:pageSize})
		.then(data=>{
			this.loading = false;
			let rslt = data.data.data;
			let tmp = this.diseditabled.items.CUST;
			this.diseditabled.items = rslt.list.map(item=>{
				item.dlvTp=""+item.dlvTp;
				item.sellrMod=""+item.sellrMod;
				item.rcptySbrbEStatus=""+item.rcptySbrbEStatus;
				if(item.winbidEStatus)item.winbidEStatus=""+item.winbidEStatus;
				if(item.winbidNum||item.remainNum)item.MYwinbidNum = Number(item.winbidNum||0)+Number(item.remainNum||0);
				return item;
			});
			this.diseditabled.items.CUST = tmp;
			if(this.noPager!='1'){
				this.diseditabled.page = rslt.page;
				this.setPager();
			}
		});
	}
	addCustSbrb(){
		let tmparr = this.editabled.items.map(item=>{
			return Object.assign({},item);
		});
		this.BondDstrMainService.addCustSbrb({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			bondSbrbVOList:tmparr
		})
		.then(data=>{
				this.editabled.items.length=0;
				this.editabled.items.CUST.getCustSbrbStat();
				this.getList();
			},
			err=>console.warn(err)
		);
	}
	setPager(){
		this.Pager.setTotal(this.diseditabled.page.totalResult);//总条数
		this.Pager.setPage(this.diseditabled.page.currentPage);//当前页
	}
	listDATrClick(item,index){
		this.editabled.curItemIndex = index;
		//this.editabled.curItem = angular.copy(item);
	}
	listATrClick(item,index){
		this.diseditabled.curItemIndex = index;
		this.trClick({$item: item, $index: index});
	}
	listATrDbClick(item,index){
		this.trDbclick({$item:item,$index:index});
	}
	copyNewRow(){
		this.editabled.items.push(angular.copy(this.editabled.items[this.editabled.curItemIndex]));
	}
	emptyMineTable(){
		this.editabled.items.length = 0;
		this.editabled.items.push(angular.copy(this.editabled.emptyObj));
	}
	cancelAddRows(){
		this.bools.showMineTable = false;
	}
	addNewRow(){
		this.editabled.items.push(angular.copy(this.editabled.emptyObj));
	}
}
