class OnLineBondController {
	constructor(netCapitalQuoteService) {
		"ngInject";
		this.netCapitalQuoteService = netCapitalQuoteService;
		this.name = 'onLineBond';
		this.trmTpList={0:''};
		this.modeList={0:''};
		this.intrtTpList={0:''};
		this.searchConditions={
			drc:'',
			trmTp:"",//期限类型
			trmLwrLmtVal:'',//期限下限值
			trmLwrLmtUnit:'',//期限下限单位
			trmUpLmVal:'',//期限上限值
			trmUpLmUnit:'',//期限上限单位
			mode:'',//模式
			intrtTp:'',//利率类型
			intRtStrtVal:'',//利率开始值
			intRtEndVal:'',//利率结束值
			amtStrtVal:'',//金额开始值
			amtEndVal:'',//金额结束值
			cltnEStatus:'',//收藏状态
			pageNum:1,
			pageSize:50,

		}
	}
	$onInit(){
		this.drc = this.netCapitalQuoteService.drc;
		this.trmTp = this.netCapitalQuoteService.trmTp;
		this.mode = this.netCapitalQuoteService.mode;
		this.intrtTp = this.netCapitalQuoteService.intrtTp;
		this.getList();
		console.log(this.trmTp)
		console.log(this.trmTpList)
	}
	checked(){
		console.log(this.trmTpList)
	}
	getList(){
		this.searchConditions.trmTp = this.selectNewToStr(this.trmTpList);
		this.searchConditions.mode = this.selectNewToStr(this.modeList);
		this.searchConditions.intrtTp = this.selectNewToStr(this.intrtTpList);

		let promise  = this.netCapitalQuoteService.onlineQueryOfrHall(this.searchConditions);
		promise.then((res)=>{
			console.log(res);
			if(res.data.status =="0"){
				this.infoList = res.data.data.list;
				this.totalPage = res.data.data.page.totalPage;//总页数
			}
		},(data)=>{});
	}
	/**
	 * /复选  处理 联动问题
	 * @param  {[object]} obj [ list 对象]
	 * @param  {[number]} key [点击的那个按钮 value]
	 * @return {[type]}     [description]
	 */
	allOrNoAll(obj,key){
		if(key==0){
			for(let val in obj){
				obj[val] = false;
			}
			obj[0]="";
		}else{
			obj[0]= false;
		}
		let flag = true;
		angular.forEach(obj, function(value ,key){
			if(value != false ){
				flag = false;
			}
		})
		if(flag ){
			obj[0] ="";
		}
	}
	// 复选 发送处理
	selectNewToStr(obj,obj2){
		let arr =[];
		for(let key in obj){
			if(obj[key]){
				arr.push(obj[key]);
			}
		}
		if(obj2){
			for(let key in obj2){
				if(obj2[key]){
					arr.push(obj2[key]);
				}
			}
		}
		return arr.join(',');
	}
}

