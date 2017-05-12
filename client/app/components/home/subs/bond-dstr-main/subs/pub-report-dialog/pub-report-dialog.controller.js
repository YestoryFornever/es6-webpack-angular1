class PubReportDialogController {
	publishSubscribe(){//发布
		this.BondDstrMainService.updateBondSbrbStat({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			whlTmsNum:this.subSttstcs.am,
			bdyTmsNum:this.subSttstcs.mm,
			bdyIntrt:this.subSttstcs.my,
			clsbidTm:this.transferService.dater(this.subSttstcs.tet).getTime()
		})
		.then(
			data=>{
				console.info(data);
				this.ok();
			},
			err=>{
				console.warn(err);
				if(err.data.status!='0'){
					alert(err.data.msg);
				}
			}
		);
	}
	getBondSbrbStat(){//获取债券申购统计
		this.BondDstrMainService.getBondSbrbStat({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId
		})
		.then(
			data=>{
				let rslt = data.data.data;
				this.subSttstcs = {
					am:rslt.whlTmsNum,
					mm:rslt.bdyTmsNum,
					my:rslt.bdyIntrt,
					tet:this.transferService.dater(new Date(rslt.clsbidTmL)),
				};
			},
			err=>console.warn(err)
		);
	}
	ok() {
		this.modalInstance.close(this.subSttstcs);
	}
	cancel() {
		this.modalInstance.dismiss('cancel');
	}
	constructor($scope,$rootScope,$uibModal,BondDstrMainService,transferService) {
		"ngInject";
		this.name = 'pub-report-dialog';
		this.$scope = $scope;
		this.$rootScope = $rootScope;
		this.$uibModal = $uibModal;
		this.BondDstrMainService = BondDstrMainService;
		this.transferService = transferService;
		console.log(this.resolve.modalData);

		this.subSttstcs = {
			am:'',
			mm:'',
			my:'',
			tet:''
		};
	}
	$onInit(){
		this.ids = this.resolve.modalData.ids;
		this.getBondSbrbStat();
	}
}
