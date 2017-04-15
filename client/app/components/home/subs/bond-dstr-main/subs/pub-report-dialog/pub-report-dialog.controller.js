class PubReportDialogController {
	publishSubscribe(){//发布
		this.BondDstrMainService.updateBondSbrbStat({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			whlTmsNum:this.subSttstcs.am,
			bdyTmsNum:this.subSttstcs.mm,
			bdyIntrt:this.subSttstcs.my,
			clsbidTm:this.subSttstcs.tet
		})
		.then(
			data=>console.info(data),
			err=>console.warn(err)
		);
		this.ok();
	}
	getBondSbrbStat(){//获取债券申购统计
		this.BondDstrMainService.getBondSbrbStat({
			issuId:this.ids.issuId
		})
		.then(
			data=>{
				let rslt = data.data.data;
				// debugger;
				this.subSttstcs = {
					am:rslt.whlTmsNum,
					mm:rslt.bdyTmsNum,
					my:rslt.bdyIntrt,
					tet:new Date(rslt.clsbidTmL)
				};
			},
			err=>console.warn(err)
		);
	}
	ok() {
		this.modalInstance.close('close');
	}
	cancel() {
		this.modalInstance.dismiss('cancel');
	}
	constructor($scope,$rootScope,$uibModal,BondDstrMainService) {
		"ngInject";
		this.name = 'pub-report-dialog';
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$uibModal = $uibModal;
		this.BondDstrMainService = BondDstrMainService;

		console.log(this.resolve.modalData);

		this.subSttstcs = {
			am:'3.3',
			mm:'2.1',
			my:'0.044',
			tet:new Date().getTime()
		};
	}
	$onInit(){
		this.ids = this.resolve.modalData.ids;
		this.getBondSbrbStat();
	}
}
