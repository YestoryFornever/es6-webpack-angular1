class LineDownQuotationController {
	constructor(netCapitalQuoteService) {
		"ngInject";
		this.name = 'lineDownQuotation';
		this.netCapitalQuoteService = netCapitalQuoteService;
	}
	$onInit(){
		this.drc = this.netCapitalQuoteService.drc;
		this.trmTp = this.netCapitalQuoteService.trmTp;
		this.uDFTrm = this.netCapitalQuoteService.uDFTrm;
		this.mode = this.netCapitalQuoteService.mode;
		this.intrtTp = this.netCapitalQuoteService.intrtTp;
		this.ctlg = this.netCapitalQuoteService.ctlg;
		this.searchConditions={
			drc:"",//方向
			trmTp:"",//期限
			trmLwrLmtVal:"",//期限下限值
			trmLwrLmtUnit:"",//期限下限值单位
			trmUpLmVal:"",//期限上限值
			trmUpLmUnit:"",//期限上限单位
			ctlg:"",//种类
			cltnEStatus:"",//收藏状态
			pageNum:1,
			pageSize:50,

		}
		this.getList();
		this.drcList={0:""};
		this.ctlgList={0:""};
		this.trmTpList={0:""};

	}
	/**
	 * 查询线下资金列表
	 */
	getList(){
		let promise  = this.netCapitalQuoteService.offlineQueryOfrHall(this.searchConditions);
		promise.then((res)=>{
			console.log(res);
			if(res.data.status =="0"){
				this.infoList = res.data.data.list;
				this.totalPage = res.data.data.page.totalPage;//总页数
			}
		},(data)=>{});
	}
}
