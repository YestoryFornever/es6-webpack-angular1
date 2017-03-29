class BondTrialController {
	constructor(netBondTrialService,$scope,bondquotationService) {
		"ngInject";
		this.name = 'bondTrial';
	  	this.netBondTrialService = netBondTrialService;
	  	this.bondquotationService = bondquotationService;
	  	this.$scope = $scope;
		// this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	 //  	this.format = this.formats[0];
	 //  	this.altInputFormats = ['M!/d!/yyyy'];
	  	// this.popup1 = {
	   // 		opened: false
	   //  };
	    this.settlementDate ='';
	    this.infoList={};
	    this.oldValue='';
	    this.bondid='';

	}
	focusPrice(name){
		this.oldValue=this.getCalcIndicators[name];
	};
	$onInit(){
		this.getCalcIndicators ={//回显列表
			bondid:'',//债券id
			dealDate:this.tody,//交易日期
			settlementDate:'',//结算日期
			cleanPrice: '',//净价
			fullRate:'',//全价
			clearSpeed:'1',
			yield:'',//收益率
			dealNum:'',//数量
		}
		if(this.resolve.modalData){
			this.calculatorInfo =this.resolve.modalData.itemInfo;
			this.bondCd = this.resolve.modalData.itemInfo.bondCd ? this.resolve.modalData.itemInfo.bondCd :"";
			this.bondid = this.resolve.modalData.itemInfo.bondid ? this.resolve.modalData.itemInfo.bondid :"";
			if(this.bondid){
				this.search({"bondid":this.bondid});
			}
			this.getCalcIndicators.dealNum = this.resolve.modalData.itemInfo.num ? this.bondquotationService.__n(this.resolve.modalData.itemInfo.num,true) :0;
			this.getCalcIndicators.cleanPrice = this.resolve.modalData.itemInfo.netprc ? this.bondquotationService.__p(this.resolve.modalData.itemInfo.netprc,true) :0;
			this.getCalcIndicators.yield = this.resolve.modalData.itemInfo.yldrto ? this.bondquotationService.__y(this.resolve.modalData.itemInfo.yldrto,true) :0;
			this.search(this.resolve.modalData.itemInfo);
		}
		// 获取结算日期
		this.tody = new Date();
		this.changeTime();//获取当前日期
	    this.getCalSettlementDate(this.getCalcIndicators.clearSpeed);//获取结算日期
	}
	// 获取结算金额 和 净价
	getSettlementAmount(){
		let promise = this.netBondTrialService.calSettlementAmountYieldForCM(this.getCalcIndicators);
		promise.then((res)=>{
			if(res.data.status=="0"){
				this.settlementDate = res.data.data['settlementDate'];
				if(this.getCalcIndicators.yield !=''){
					this.calcIndicatorsForWeb('yield');
				}else if(this.getCalcIndicators.fullRate !=''){
					this.calcIndicatorsForWeb('fullRate');
				}else if(this.getCalcIndicators.cleanPrice !=''){
					this.calcIndicatorsForWeb('cleanPrice');
				}
			}
		},(data)=>{
		});
	}
	getMoneyForNum(){//根据数量获取结算金额
		if(this.getCalcIndicators.cleanPrice =="" && this.getCalcIndicators.yield == ""){
			return false;
		}
		if(this.getCalcIndicators.cleanPrice){
			let promise = this.netBondTrialService.calSettlementAmountCleanPriceForCM(this.getCalcIndicators);
			promise.then((res)=>{
				if(res.data&&res.data.data){
					this.settlementAmount = res.data.data.settlementAmount;
				}
			},(data)=>{
			});
		}else if(this.getCalcIndicators.yield){
			let promise = this.netBondTrialService.calSettlementAmountYieldForCM(this.getCalcIndicators);
			promise.then((res)=>{
				if(res.data&&res.data.data){
					this.settlementAmount = res.data.data.settlementAmount;
				}
			},(data)=>{
			});
		}
	}
	addZero(time){
		let arr = time.split(' ')[0].split("/");
		if(arr[1]<10){
			arr[1] = "0" + arr[1];
		}
		if(arr[2]<10){
			arr[2] = "0" + arr[2];
		}
		time = arr[0] + '-' + arr[1] + "-" + arr[2];
		time = time.substr(0,11);
		return time;
	}
	// 处理时间
	changeTime(date){
		if(date){
			let time =  new Date( date ).toLocaleString();
			let returnTime = this.addZero(time);
			return returnTime;

		}else{
			let tody = new Date().toLocaleString();
			let todyTime = this.addZero(tody);
			return todyTime;
		}
	}

	// 获取结算日期
	getCalSettlementDate(num){
		this.getCalcIndicators.dealDate = this.changeTime(this.tody);
		this.getCalcIndicators.clearSpeed =  num ? num :this.getCalcIndicators.clearSpeed;
		let promise = this.netBondTrialService.calSettlementDate(this.getCalcIndicators);
		promise.then((res)=>{
			if(res.data){
				this.settlementDate = res.data.data['settlementDate'];
				this.calcDaysList = res.data.data;
			}
			this.getMoneyForNum();
			this.calcIndicatorsYield();
		},(data)=>{
		});
	}
	// 获取指标数据  根据  净价  全价
	calcIndicatorsForWeb(name){
		this.getCalcIndicators.dealDate = this.changeTime(this.tody);
		this.getCalcIndicators.settlementDate = this.settlementDate;
		if(this.getCalcIndicators.cleanPrice =="" && this.getCalcIndicators.fullRate=="" && this.getCalcIndicators.yield==""){
			return false;
		}
		if(this.getCalcIndicators[name]==this.oldValue || this.getCalcIndicators[name]==''){
			return false;
		}
		let that =this;
		let promise = that.netBondTrialService.calcIndicatorsForWeb(that.getCalcIndicators,name);
		promise.then(function(res) {
			if(res.data && res.data.data ){
				that.getMoneyForNum();// 获取结算金额 和 收益率
				if(name == 'fullRate'){
					that.getCalcIndicators.yield = that.bondquotationService.__y(res.data.data.yield,true);
					that.getCalcIndicators.cleanPrice = that.bondquotationService.__p(res.data.data.cleanPrice,true);
				}
				if(name == 'cleanPrice'){
					that.getCalcIndicators.yield =  that.bondquotationService.__y(res.data.data.yield,true);
					that.getCalcIndicators.fullRate = that.bondquotationService.__p(res.data.data.fullPrice,true);
				}
				that.calcIndicatorsList =  res.data.data;
			}
		});
	}
	// 获取指标数据  根据  收益率 结算
	calcIndicatorsYield(name){
		this.getCalcIndicators.dealDate = this.changeTime(this.tody);
		this.getCalcIndicators.settlementDate = this.settlementDate;
		if( this.getCalcIndicators.yield==""){
			return false;
		}
		let that =this;
		let promise = that.netBondTrialService.calcIndicatorsForWeb(that.getCalcIndicators);
		promise.then(function(res) {
			if(res.data && res.data.data ){
				that.calcIndicatorsList = res.data.data;
				if( res.data.data.cleanPrice){
					that.getCalcIndicators.cleanPrice =  that.bondquotationService.__p(res.data.data.cleanPrice,true) ;
				}else{
					that.getCalcIndicators.cleanPrice = "";
				}
				if(res.data.data.fullPrice){
					that.getCalcIndicators.fullRate = that.bondquotationService.__p(res.data.data.fullPrice,true) ;
				}else{
					that.getCalcIndicators.cleanPrice = "";
				}
				that.calcIndicatorsList =  res.data.data;
				that.getMoneyForNum();// 获取结算金额 和 收益率
				
			}
		});
	}
	calcIndicatorsNumChange(num){

	}
	cancel() {
		this.modalInstance.close('cancel');
	}
	// 债券搜索   模糊查询
	queryQuote(val){
		let promise = this.netBondTrialService.fuzzyMatchingForBond({keyword:val});
		return promise.then(function(res) {
			if(res.data.data ){
				return res.data.data;
			}
		});

	}
	search(item){
		if(item.bondid){
			this.getCalcIndicators.bondid = item.bondid;
		}else{
			return false;
		}
		let that = this;
		let promise = that.netBondTrialService.queryDetailBondBaseInfo({bondid:item.bondid});
		promise.then(function(res) {
			if(res.data && res.data.data ){
				that['infoList'] = res.data.data;
				that.getCalSettlementDate();
			}
		});
	}
	dateChange(){
		this.getCalSettlementDate();
	}
}
