var BONDCONFIG = require('../../../../bond.config.js');


class BondTrialController {
	constructor(BondTrialService,$scope) {
		this.name = 'bondTrial';
	  	this.BondTrialService = BondTrialService;
	  	this.$scope = $scope;
	  	// thi ;

		this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  	this.format = this.formats[0];
	  	this.altInputFormats = ['M!/d!/yyyy'];
	  	this.popup1 = {
	   		opened: false
	    };
	    this.settlementDate ='';
	    this.infoList={};
	}

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
		console.log(this.resolve.modalData)
		if(this.resolve.modalData){
			this.calculatorInfo =this.resolve.modalData.itemInfo;
			this.bondCd = this.resolve.modalData.itemInfo.bondCd;
			this.getCalcIndicators.dealNum = parseInt(this.resolve.modalData.itemInfo.num/10000) ;
			this.getCalcIndicators.cleanPrice = parseFloat(this.resolve.modalData.itemInfo.netprc) ;
			this.getCalcIndicators.yield = parseFloat(this.resolve.modalData.itemInfo.yldrto)*100 ;
			this.search(this.resolve.modalData.itemInfo);
		}
		
		// 获取结算日期
		this.tody = new Date();
		this.changeTime();//获取当前日期
	  //   this.getCalcIndicators = {
	  //   	dealDate:this.tody,
			// clearSpeed:'1',
			// bondid:'',
	  //   }
	    this.getCalSettlementDate(this.getCalcIndicators.clearSpeed);//获取结算日期
	}
	// 获取结算金额 和 净价
	getSettlementAmount(){
		let promise = this.BondTrialService.calSettlementAmountYieldForCM(this.getCalcIndicators);
		promise.then((res)=>{
			console.log(res)
			// if(res.data){
			// 	this.settlementDate = res.data.data['settlementDate'];
			// 	if(this.getCalcIndicators.yield !=''){
			// 		this.calcIndicatorsForWeb('yield');
			// 	}else if(this.getCalcIndicators.fullRate !=''){
			// 		this.calcIndicatorsForWeb('fullRate');
			// 	}else if(this.getCalcIndicators.cleanPrice !=''){
			// 		this.calcIndicatorsForWeb('cleanPrice');
			// 	}
			// }
			// console.log(res);
		},(data)=>{
			console.warn("用户登录异常");
		});
	}
	yieldChange(num){
		let newNum = num*1;
		num = newNum.toFixed(6) ;
		// let reg = /\./;
		// if(reg.test(num)){
		// 	num = num +'';
		// 	num = num.split('.')[0]+ '.' + ( num.split('.')[1]? num.split('.')[1].substr(0,2) : '00');
		// }
		return num ;
	}
	numchangeTwo(num){
		let newNum = num*1;
		num = newNum.toFixed(4) ;
		// let reg = /\./;
		// if(reg.test(num)){
		// 	num = num +'';
		// 	num = num.split('.')[0]+ '.' + ( num.split('.')[1]? num.split('.')[1].substr(0,2) : '00');
		// }
		return num ;
	}
	getMoneyForNum(){//根据数量获取结算金额
		console.log(this.getCalcIndicators);
		if(this.getCalcIndicators.cleanPrice =="" && this.getCalcIndicators.yield == ""){
			return false;
		}
		if(this.getCalcIndicators.cleanPrice){
			let promise = this.BondTrialService.calSettlementAmountCleanPriceForCM(this.getCalcIndicators);
			promise.then((res)=>{
				if(res.data&&res.data.data){
					this.settlementAmount = res.data.data.settlementAmount;
				}
			},(data)=>{
				console.warn("用户登录异常");
			});
		}else if(this.getCalcIndicators.yield){
			let promise = this.BondTrialService.calSettlementAmountYieldForCM(this.getCalcIndicators);
			promise.then((res)=>{
				if(res.data&&res.data.data){
					this.settlementAmount = res.data.data.settlementAmount;
				}
			},(data)=>{
				console.warn("用户登录异常");
			});
		}
	}
	addZero(time){
		let arr = time.split(' ')[0].split("/");
		// console.log(arr)
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
		// console.log(this.getCalcIndicators)
		let promise = this.BondTrialService.calSettlementDate(this.getCalcIndicators);
		promise.then((res)=>{
			console.log(res)
			if(res.data){
				this.settlementDate = res.data.data['settlementDate'];
			}
			this.getMoneyForNum();
			this.calcIndicatorsYield();
			// console.log(res);
		},(data)=>{
			console.warn("用户登录异常");
		});
	}
	// 获取指标数据  根据  净价  全价
	calcIndicatorsForWeb(name){
		this.getCalcIndicators.dealDate = this.changeTime(this.tody);
		this.getCalcIndicators.settlementDate = this.settlementDate;
		if(this.getCalcIndicators.cleanPrice =="" && this.getCalcIndicators.fullRate=="" && this.getCalcIndicators.yield==""){
			return false;
		}
		let that =this;
		let promise = that.BondTrialService.calcIndicatorsForWeb(that.getCalcIndicators,name);
		promise.then(function(res) {
			console.log(res)
			if(res.data && res.data.data ){
				that.calcIndicatorsList = res.data.data;
				that.getMoneyForNum();// 获取结算金额 和 收益率
				if(name == 'fullRate'){
					that.getCalcIndicators.yield = that.yieldChange( res.data.data.yield ? res.data.data.yield : '')*100;
					that.getCalcIndicators.cleanPrice = that.numchangeTwo( res.data.data.cleanPrice? res.data.data.cleanPrice :''  );
				}
				if(name == 'cleanPrice'){
					that.getCalcIndicators.yield =  that.yieldChange( res.data.data.yield ? res.data.data.yield :'' )*100;
					that.getCalcIndicators.fullRate = that.numchangeTwo( res.data.data.fullPrice ? res.data.data.fullPrice:'' );
				}
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
		let promise = that.BondTrialService.calcIndicatorsForWeb(that.getCalcIndicators);
		promise.then(function(res) {
			console.log(res)
			if(res.data && res.data.data ){
				that.calcIndicatorsList = res.data.data;
				if( res.data.data.cleanPrice){
					that.getCalcIndicators.cleanPrice = that.numchangeTwo( res.data.data.cleanPrice ) ;
				}else{
					that.getCalcIndicators.cleanPrice = "";
				}
				if(res.data.data.fullPrice){
					that.getCalcIndicators.fullRate = that.numchangeTwo( res.data.data.fullPrice );
				}else{
					that.getCalcIndicators.cleanPrice = "";
				}
				that.calcIndicatorsList =  res.data.data;
				// that.getCalcIndicators.cleanPrice =  res.data.data.cleanPrice ;
				// that.getCalcIndicators.fullRate =  res.data.data.fullPrice ;
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
		let promise = this.BondTrialService.fuzzyMatchingForBond({keyword:val});
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
		let promise = that.BondTrialService.queryDetailBondBaseInfo({bondid:item.bondid});
		promise.then(function(res) {
			if(res.data && res.data.data ){
				console.log(res)
				that['infoList'] = res.data.data;
				that.getCalSettlementDate();
				
			}
		});
	}
	dateChange(){
		this.getCalSettlementDate();
	}
}
BondTrialController.$inject = ['BondTrialService','$scope'];
export default BondTrialController;
