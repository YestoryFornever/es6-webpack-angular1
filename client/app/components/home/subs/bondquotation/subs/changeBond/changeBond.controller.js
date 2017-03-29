class ChangeBondController {
	constructor(ChangeBondService,$scope,bondquotationService,easeMobService,netAlertModalService) {
		"ngInject";
		this.name = 'changeBond';
		this.ChangeBondService =ChangeBondService;
		this.bondquotationService =bondquotationService;
		this.easeMobService =easeMobService;
		this.netAlertModalService =netAlertModalService;
		this.$scope = $scope;
	}
	getTody(){
		var mydate = new Date();
		let mon = mydate.getMonth()*1 + 1;
		let day = mydate.getDate()*1 ;

		if(mon<10){
			mon = "0" + mon;
		}
		if(day<10){
			day = "0" + day;
		}
		let myTody = mydate.getFullYear() + '-' + mon + '-' + day;
		return myTody;
	}
	$onInit(){
		this.tody = this.getTody();
		if(this.resolve.changeDataForModal){
			this.changeInfo = this.resolve.changeDataForModal.changeInfo;
			this.changeInfo.drc = this.changeInfo.drc ;
			this.changeInfo.marketType = this.changeInfo.nameAll ;
			this.changeInfo.num = this.bondquotationService.__n( this.changeInfo.num,true);
			this.changeInfo.yldrto = this.bondquotationService.__y( this.changeInfo.yldrto,true);
			this.changeInfo.netprc = this.bondquotationService.__p( this.changeInfo.netprc,true);
		}
	}
	ok() {
		let that = this;
		let promise = that.bondquotationService.updateBondQuote(this.changeInfo);
		promise.then((res)=>{
			if(res.data.status=="0"){
				res.data.data.forEach((item)=>{
					that.easeMobService.sendCmd('27',item);
				});
				that.netAlertModalService.openBox({
					'tittle':'修改报价',
					'content':'修改报价成功',
				});
				that.modalInstance.close();
			}
		},(data)=>{});
	}
	changeInfoStatus(){
		if(this.changeInfo.wthrAnon == "0"){
			this.changeInfo.wthrAnon = "1"
		}else{
			this.changeInfo.wthrAnon = "0"
		}
	}
	cancel() {
		this.modalInstance.dismiss('cancel');

	}
	deleteRemark(item){
		if(item['rmrk'].length<=50){
			return false;
		}else{
			item.rmrk = item.rmrk.substr(0,50);
		}
	}
	netprcFn(item){//计算净价

		item.dealDate = this.tody;
		let reg = /\./g;
		let that = this;
		let promise = that.ChangeBondService.calSettlementAmountYieldForCM(item);
		promise.then((res)=>{
			if(res.data && res.data.data){
				item.netprc = that.bondquotationService.__p(res.data.data.cleanPrice,true);
			}
		},(data)=>{
		});
	}
	yldrtoFn(item){//计算收益

		item.dealDate = this.tody;
		let reg = /\./g;
		let that = this;
		let promise = that.ChangeBondService.calSettlementAmountCleanPriceForCM(item);
		promise.then((res)=>{
			if(res.data && res.data.data){
				item.yldrto = that.bondquotationService.__y( res.data.data.yield,true);
			}
		},(data)=>{
		});
	}
}
