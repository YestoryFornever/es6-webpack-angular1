var BONDCONFIG = require('../../../../bond.config.js');


class BondTrialController {
	constructor(BondTrialService) {
		this.name = 'bondTrial';
	  	this.BondTrialService = BondTrialService;

		this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  	this.format = this.formats[0];
	  	this.altInputFormats = ['M!/d!/yyyy'];
	  	this.popup1 = {
	   		opened: false
	    };
	    // 获取结算日期
	    this.tody = new Date();
	    this.sendGetDate = {
	    	dealDate:this.changeTime(),
			clearSpeed:'1',
			bondid:'',
	    }

	}
	$onInit(){
		console.log(this.sendGetDate)
		this.changeTime()
	}
	addZero(time){
		let arr = time.split(' ')[0].split("/");
		console.log(arr)
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
		console.log(this.tody)
		this.sendGetDate.dealDate = this.changeTime(this.tody);
		this.sendGetDate.clearSpeed =  num;
		let promise = this.BondTrialService.calSettlementDate(this.sendGetDate);
		promise.then((res)=>{
			if(res.data){
				this.settlementDate = res.data.data.settlementDate;
			}
			console.log(res);
		},(data)=>{
			console.warn("用户登录异常");
		});
	}


	// 债券搜索
	// keydown(){
	// 	let promise = this.BondTrialService.getFriends();
	// 	promise.then((data)=>{
	// 		console.log(data);
	// 	},(data)=>{
	// 		console.warn("用户登录异常");
	// 	});
	// }




	// 显示日期插件
	open1(){
		this.popup1.opened = true;
	}
	// 切换D Y
	changeStarus(en){
		// console.log($(en.target))
		$(en.target).html()=='D' ? $(en.target).html('Y') :$(en.target).html('D')
	}
	// 清除搜索框内容
	clearSeach(aa) {
		$(aa.target).offsetParent().find('.form-control').val('');
	}
}
BondTrialController.$inject = ['BondTrialService'];
export default BondTrialController;
