class MineQuotationController {
	constructor(netCapitalQuoteService) {
		"ngInject";
		this.netCapitalQuoteService = netCapitalQuoteService;
		this.name = 'mine';
	}
	$onInit(){
		this.offlineQueryOfrHall();
	}
	offlineQueryOfrHall(){
		let promise = this.netCapitalQuoteService.offlineQueryOfrHall({
			pageSize:'1',
			pageNum:'50',
		});

	}
	onlineQueryOfrHall(){
		let promise = this.netCapitalQuoteService.onlineQueryOfrHall({
			pageSize:'1',
			pageNum:'50',
		});

	}
}
