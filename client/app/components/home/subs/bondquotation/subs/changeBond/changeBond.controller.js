var BONDCONFIG = require('../../../../../../../bond.config.js');

class ChangeBondController {
	constructor(ChangeBondService,$scope) {
		this.name = 'changeBond';
		this.ChangeBondService =ChangeBondService;
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
		// this.changeInfo ={
		// 	drc:'',
		// 	bondOfrid:'',
		// 	bondid:'',
		// 	bondShrtnm:'',
		// 	num:'',
		// 	yldrto:'',
		// 	netprc:'',
		// 	wthrAnon:'',
		// 	wthrListg:'',
		// 	rmrk:'',

		// }
		console.log(this.resolve.changeDataForModal.changeInfo)
		// this.items = this.resolve.changeDataForModal.items;
		// this.changeInfo = this.resolve.changeDataForModal.changeInfo;
		// for(let key in this.changeInfo){
		// 	this.changeInfo[key] = this.resolve.changeDataForModal.changeInfo[key];
		// }
		this.changeInfo = this.resolve.changeDataForModal.changeInfo;
		this.changeInfo.drc = this.changeInfo.drc =="买入" ? "-1" : (this.changeInfo.drc =="卖出" ? "1" :"");
		this.changeInfo.num = parseFloat( this.changeInfo.num/10000);
		this.changeInfo.yldrto = parseFloat( this.changeInfo.yldrto*100);
		this.changeInfo.netprc = parseFloat( this.changeInfo.netprc);
	}
	ok() {
		let that = this;
		console.log(that.changeInfo)
		// this.quoteList.forEach(function(item,index) {
		// 	item.drc = that.drc;
		// },that)
		// this.modalInstance.close(this.selected.item);
		that.modalInstance.close(that.changeInfo);
	}
	changeInfoStatus(){
		if(this.changeInfo.wthrAnon == "0"){
			this.changeInfo.wthrAnon = "1"
		}
		if(this.changeInfo.wthrAnon == "1"){
			this.changeInfo.wthrAnon = "0"
		}
	}
	cancel() {
		this.modalInstance.dismiss('cancel');
	}
	netprcFn(item){//计算净价

		console.log(item);
		item.dealDate = this.tody;
		let reg = /\./g;
		let that = this;
		let promise = that.ChangeBondService.calSettlementAmountYieldForCM(item);
		promise.then((res)=>{
			console.log(res);
			if(res.data && res.data.data.cleanPrice){
				item.netprc = Math.round(res.data.data.cleanPrice*10000)/10000;
			}
		},(data)=>{
			console.warn("获取议价列表异常");
		});
	}
	yldrtoFn(item){//计算收益

		console.log(item);
		item.dealDate = this.tody;
		let reg = /\./g;
		let that = this;
		let promise = that.ChangeBondService.calSettlementAmountCleanPriceForCM(item);
		promise.then((res)=>{
			console.log(res);
			if(res.data && res.data.data.yield){
				item.yldrto = Math.round(res.data.data.yield*10000)/100;
			}
		},(data)=>{
			console.warn("获取议价列表异常");
		});
	}
}
ChangeBondController.$inject = ["ChangeBondService",'$scope'];
export default ChangeBondController;
