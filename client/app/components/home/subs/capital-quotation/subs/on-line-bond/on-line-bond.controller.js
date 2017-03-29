class OnLineBondController {
	constructor(netCapitalQuoteService) {
		"ngInject";
		this.netCapitalQuoteService = netCapitalQuoteService;
		this.name = 'onLineBond';
	}
	$onInit(){
		this.drc = this.netCapitalQuoteService.drc;
		this.trmTp = this.netCapitalQuoteService.trmTp;
		this.mode = this.netCapitalQuoteService.mode;
		this.intrtTp = this.netCapitalQuoteService.intrtTp;
		console.log(this.netCapitalQuoteService.drc)
	}
	
}

