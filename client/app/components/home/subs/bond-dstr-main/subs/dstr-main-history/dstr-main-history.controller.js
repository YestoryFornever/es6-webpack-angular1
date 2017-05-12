class DstrMainHistoryController {
	constructor(BondDstrMainService, $stateParams, $state, pagetabService) {
		"ngInject";
		this.BondDstrMainService = BondDstrMainService;
		this.stateParams = $stateParams;
		// 到处申报列表
		this.data = [];
		this.pageNum = 1;
		this.pageSize = 10;
		this.msg = "";
		this._state = $state;

		pagetabService.activeTab({
            tabKey: 'home.newdebtinformationdetails',
            routeState: $state.$current.name,
            routeParams: angular.copy($stateParams),
        });
	}
	$onInit() {
		this.getCustSbrbHisList();
	}
	getCustSbrbHisList() {
		/*let tmp = {
			dstrBondId: this.stateParams.dstrBondId,
			issuId: this.stateParams.issuId,
			sndrTeamId: this.resolve.params.sid,
			rcptyTeamId: this.resolve.params.rid,
			pageNum: this.pageNum,
			pageSize: this.pageSize
		};
		console.info('参数：',tmp);*/
		this.BondDstrMainService.getCustSbrbHisList({// 路由传递过来的参数
			dstrBondId: this.stateParams.dstrBondId,
			issuId: this.stateParams.issuId,
			sndrTeamId: this.resolve.params.sid,
			rcptyTeamId: this.resolve.params.rid,
			pageNum: this.pageNum,
			pageSize: this.pageSize
		})
		.then(data=>{
			for (var i = 0; i < data.data.data.list.length; i++) {
				data.data.data.list[i].rcptySbrbEStatus = data.data.data.list[i].rcptySbrbEStatus + "";
			}
			this.sbrbSmy = data.data.data.sbrbSmy;
			this.data = data.data.data.list;
			this.pages = data.data.data.page;
			console.log(data, "申购历史");
		});
	};
	pageChange(page) {
		this.pageNum = page;
		this.getCustSbrbHisList();
	}
	close() {
		this.modalInstance.close();
	}
}
