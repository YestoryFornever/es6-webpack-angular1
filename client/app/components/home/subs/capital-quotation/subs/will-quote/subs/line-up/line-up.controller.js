class LineUpController {
	constructor(netCapitalQuoteService) {
		"ngInject";
		this.netCapitalQuoteService = netCapitalQuoteService;

		this.drc = this.netCapitalQuoteService.drc;
		this.trmTp = this.netCapitalQuoteService.trmTp;
		this.mode = this.netCapitalQuoteService.mode;
		this.intrtTp = this.netCapitalQuoteService.intrtTp;
		this.name = 'onLineBond';
		this.ofrDscListInfo ="";
		this.ofrDscList =[];
	}
	$onInit(){
	}
	addBondList(){
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
	/**
	 * 提取 线上 报价
	 * @return {[type]} [description]
	 */
	onlineAnalysisOfr(){
		let reg = /\s/g;
		let arr = this.ofrDscListInfo ?  this.ofrDscListInfo.split(reg) :[];
		
		let promise = this.netCapitalQuoteService.onlineAnalysisOfr({
			ofrDscList:arr
		});
		promise.then(function(res) {
			// body...
			if(res.data.status=="0"){
				this.ofrDscList = res.data.data;
			}
			console.log(res)
		});
	}
	/**
	 * /发布报价
	 * @return {[type]} [description]
	 */
	onlineAddOfr(){
		let promise = this.netCapitalQuoteService.onlineAddOfr(
			[
			    {
			        "drc": 1,
			        "trmTp": "6",
			        "trmUnit": "1",
			        "amt": "8900",
			        "amtUnit": "1",
			        "mode": "1,2,3",
			        "intrtTp": "2",
			        "intrtVal": "8.6",
			        "txnRst": "1,2,3,4,5",
			        "rmrk": "online test data 55566"
			    },
			    {
			        "drc": 2,
			        "trmTp": "11",
			        "trmLwrLmtVal": "30",
			        "trmUpLmVal": "60",
			        "trmUnit": "1",
			        "amt": "600",
			        "amtUnit": "2",
			        "mode": "2,3",
			        "intrtTp": "4",
			        "intrtVal": "9.8",
			        "txnRst": "1,2",
			        "rmrk": "online test data two 66677"
			    }
			]

			);
		promise.then(function(res) {
			
		});
	}
	deleteList(index){
		this.ofrDscList.splice(index,1);
	}

}

