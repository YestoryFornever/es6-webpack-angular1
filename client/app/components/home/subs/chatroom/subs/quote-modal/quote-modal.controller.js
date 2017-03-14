class QuoteModalController {
	constructor(quoteModalService,$uibModal) {
		this.quoteModalService = quoteModalService;
		this.$uibModal = $uibModal;
	}
	$onInit(){
		this.quoteList = this.resolve.modalData.quoteList;
		this.queryQuoteList();
	}
	ok() {
		this.modalInstance.close(this.quoteList);
	}
	cancel() {
		this.modalInstance.dismiss('cancel');
	}
	queryQuoteList(){
		let promise = this.quoteModalService.queryQuoteList();
		promise.then((data)=>{
			if(!data.status===200){alert(data);}
			if(data.data.status==="0"){
				this.quoteList = data.data.data;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{
			console.warn("查询议价详情异常");
		});
	}
	addQuote(){//打开发送报价弹窗
		let that = this;
		var modalInstance = that.$uibModal.open({
			animation: that.animationsEnabled,
			component:'nowBond',
			windowClass:'my-now-bond',
			size: 'wfxl',//'lg',//'sm',
			resolve: {}
		}).result.then(function (quotelist) {
			//
		}, function () {
			that.$log.info('Modal dismissed at: ' + new Date());
		});
	}
}
QuoteModalController.$inject = ['quoteModalService','$uibModal'];
export default QuoteModalController;