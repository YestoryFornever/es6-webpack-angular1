
class CashofferController {
	constructor(cashofferService,$uibModal) {
		this.name = 'cashoffer';
		this.$uibModal = $uibModal;
		this.cashofferService = cashofferService ;
		// 新增报价
		this.addBatchBondQuoteInfo = {
			drc:'',
			list:{
				bondid:'',
				num:'',
				yldrto:'',
				netprc:'',
				wthrAnon:'',
				wthrListg:'',
				rmrk:'',
			}
		}
		this.tbodyArr = [] ;
		this.tbody = {
			bondid:'',
			num:'',
			yldrto:'',
			netprc:'',
			wthrAnon:'',
			wthrListg:'',
			rmrk:'',
		}
		this.tbodyArr.push(this.body)
		this.selected = undefined;
		this.searchInfo = {
			keyword:''
		}
	}
	$onInit(){
		this.addBatchBondQuote();
	}
	// 新增报价
	addBatchBondQuote(){
		console.log(this.addBatchBondQuoteInfo)
		let promise = this.cashofferService.addBatchBondQuote(this.addBatchBondQuoteInfo);
		promise.then((res)=>{
			console.log(res);
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	// 模糊搜索
	getLocation(val){
		// let promise = this.cashofferService.fuzzyMatchingForBond(this.searchInfo);
		// promise.then((res)=>{
		// 	console.log(res);
		// },(data)=>{
		// 	// console.warn("获取议价列表异常");
		// });

	}
}
CashofferController.$inject = ['cashofferService','$uibModal'];
export default CashofferController;
