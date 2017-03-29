class LineDownController {
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
	addBondList(){// 添加一条 数据
		this.ofrDscList.push({
			drc:'',//方向
			trmTp:'',//期限类型
			trmLwrLmtVal:'',//期限下限值
			trmUpLmVal:'',//期限上限值
			trmUnit:'',//期限单位
			amt:'',//金额
			amtUnit:'',//金额单位
			mode:'',//模式
			intrtTp:"",//利率类型
			intrtVal:"",//利率单位
			txnRst:'',//交易限制
			rmrk:'',//备注

		})
	}
	offlineAnalysisOfr(){//提取线下报价
		let reg = /\s/g;
		let arr = this.ofrDscListInfo ?  this.ofrDscListInfo.split(reg) :[];
		let promise = this.netCapitalQuoteService.offlineAnalysisOfr(
			arr
		);
		promise.then(function(res) {
			// body...
			if(res.status=="0"){
				this.ofrDscList = res.data;
			}
			console.log(res)
		});
	}
	/**
	 * /发布报价
	 * @return {[type]} [description]
	 */
	offlineAddOfr(){
		let promise = this.netCapitalQuoteService.offlineAddOfr(
			// this.ofrDscList
			[
				{
				"drc":"1","ctlg":"1","trmTp":"2",
				"dy1IntRtVal":"0.01","dy7IntRtVal":"0.07",
				"dy14IntRtVal":"0.14","dy21IntRtVal":"0.21",
				"mo1IntRtVal":"0.3","mo2IntRtVal":"0.6",
				"mo3IntRtVal":"0.9","mo6IntRtVal":"1.8",
				"mo9IntRtVal":"2.7","yr1IntRtVal":"3.6",
				"uDFTrm1":"11","uDFTrmUnit1":"1","uDFInRtVal1":"0.11",
				"uDFTrm2":"12","uDFTrmUnit2":"1","uDFInRtVal2":"0.12",
				"uDFTrm3":"13","uDFTrmUnit3":"1","uDFInRtVal3":"0.13",
				"uDFTrm4":"4","uDFTrmUnit4":"2","uDFInRtVal4":"1.2",
				"uDFTrm5":"5","uDFTrmUnit5":"3","uDFInRtVal5":"5.5"
				},
				{
				"drc":"2","ctlg":"2","trmTp":"1",
				"dy1IntRtVal":"0.01","dy7IntRtVal":"0.07",
				"dy14IntRtVal":"0.14","dy21IntRtVal":"0.21",
				"mo1IntRtVal":"0.3","mo2IntRtVal":"0.6",
				"mo3IntRtVal":"0.9","mo6IntRtVal":"1.8",
				"mo9IntRtVal":"2.7","yr1IntRtVal":"3.6",
				"uDFTrm1":"11","uDFTrmUnit1":"1","uDFInRtVal1":"0.11",
				"uDFTrm2":"12","uDFTrmUnit2":"1","uDFInRtVal2":"0.12",
				"uDFTrm3":"13","uDFTrmUnit3":"1","uDFInRtVal3":"0.13",
				"uDFTrm4":"4","uDFTrmUnit4":"2","uDFInRtVal4":"1.2",
				"uDFTrm5":"5","uDFTrmUnit5":"3","uDFInRtVal5":"5.5"
				}
		]
		);
		promise.then(function(res) {
			// body...
			if(res.status=="0"){
				this.ofrDscList = res.data;
			}
			console.log(res)
		});
	}
	deleteList(index){//删除一条数据
		this.ofrDscList.splice(index,1);
	}
}

