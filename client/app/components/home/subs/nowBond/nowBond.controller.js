var BONDCONFIG = require('../../../../../bond.config.js');

class nowBondController {
	constructor(nowBondService) {
		this.nowBondService = nowBondService;
		this.drc = '1';
		var mydate = new Date();
		let mon = mydate.getMonth()*1 + 1;
		let day = mydate.getDate()*1 ;

		if(mon<10){
			mon = "0" + mon;
		}
		if(day<10){
			day = "0" + day;
		}
		this.tody = mydate.getFullYear() + '-' + mon + '-' + day;
	}
	$onInit(){
		this.isShow = this.resolve.modalData.isShow ;
		this.searchBonds();
		console.log(this.tody)
		// this.searchBondBreedInfo = 
		// this.customSelected.bondCd = items[0].bondCd;
		this.hideRight = true;//隐藏右侧的搜索
		console.log(this.resolve.modalData.quoteList)
		console.log(this.resolve.modalData.isShow)
		this.items = this.resolve.modalData.items;
		this.quoteList = this.resolve.modalData.quoteList  ;
		if(this.quoteList[0]){
			this.quoteList[0].num = parseInt(this.quoteList[0].num/10000);
			this.quoteList[0].yield = parseFloat(this.quoteList[0].yldrto*100);
			this.quoteList[0].netprc = parseFloat(this.quoteList[0].netprc);
			// for(let key in this.quoteList[0]){

			// }
		}
		// this.quoteList = [];
		this.selected = {
			item: this.items[0]
		}
		this.searchList = [];
		this.searchConditions = {
			creditType:"",//债券类型
			creditSymbol:"",//主体评级
			dealDate:this.tody,//处理时间
			rateType:"",//票面
			termType:"D",//期限
			termStart:"",//期限开始
			termEnd:"",//期限结束
			pageNum:"1",//第几页
			pageSize:"50",//每一页有多少项
			orderCol:"sbjRtg",//以哪一列排序【sbjRtg主体评级】【rsdtrm	剩余期限】【yield 收益率】
			orderDirect:"desc"//desc倒序 asc正序
		};
		// 收益
		this.yieldInfo={
			bondid:'0',
			dealDate:this.tody,
			clearSpeed:'1',
			dealNum:'0',
			cleanPrice:'0',
			// yield:'0',
		}
		// 净价
		this.netprcInfo={
			bondid:'0',
			dealDate:this.tody,
			clearSpeed:'1',
			dealNum:'0',
			// cleanPrice:'0',
			yield:'0',
		}
	}

	// 计算收益率
	yield(item,searchList){
		console.log(item);
		console.log(searchList);
		let that = this;
		if(searchList.bondid){
			this.yieldInfo.bondid = searchList.bondid;
		}
		if(item.num){
			this.yieldInfo.dealNum = item.num;
		}
		if(item.netprc){//净价
			this.yieldInfo.cleanPrice = item.netprc;
		}
		let reg = /\./g;
		let promise = that.nowBondService.calSettlementAmountCleanPriceForCM(this.yieldInfo);
		promise.then(function(res) {
			// body...
			console.log(res)
			if(res.data.data ){
				// if(res.data.data.yield.match(reg)){
				// 	console.log(res.data.data.yield*100);
					
				// 	// res.data.data.yield = (res.data.data.yield*100 + '').split('.')[0] + "." +  (res.data.data.yield*100 + '').split('.')[1].substr(0,2);
				// }
				// let arr = res.data.data.yield.split('.');
				// let str = '';
				// str = (arr[0] + "." + arr[1].substr(0,4))*100+'%';
				
				that.netprcInfo.yield =  res.data.data.yield;
				item.yield =  (res.data.data.yield*100).toFixed(4);
			}
		});
	}
	// 计算净价
	netprc(item,searchList){

		console.log(item);
		console.log(searchList);
		// console.log(index);
		if(searchList.bondid){
			this.netprcInfo.bondid = searchList.bondid;
		}else{
			// return false;
		}
		if(item.num){
			this.netprcInfo.dealNum = item.num;
		}else{
			// return false;
		}
		if(item.yield){//收益
			this.netprcInfo.yield = item.yield/100;
		}else{
			// return false;
		}
		let reg = /\./g;
		let that = this;
		console.log(that.netprcInfo);
		let promise = that.nowBondService.calSettlementAmountYieldForCM(that.netprcInfo);
		promise.then(function(res) {
			// body...
			console.log(res)
			if(res.data.data ){
				console.log(item)
				console.log(res.data.data);
				if(res.data.data.cleanPrice){
					// if(res.data.data.cleanPrice.match(reg)){
					// 	res.data.data.cleanPrice = res.data.data.cleanPrice.split(".")[0] + "." + res.data.data.cleanPrice.split(".")[1].substr(0,2);
					// }
					that.netprcInfo.cleanPrice =  res.data.data.cleanPrice;
					item['netprc'] =(res.data.data.cleanPrice*1).toFixed(4);

					
				}
				
				// // debugger;
				// let arr = res.data.data.cleanPrice.split('.');
				// let str = '';
				// str = arr[0] + "." + arr[1].substr(0,4);
				// that.quoteList[index].netprc = str;
			}
		});
	}
	// 数量
	makeNum(item,index){
		console.log(item)
		item = this.trim(item+'');
		item = parseInt(item) + '';
		if(!parseInt(item)){
			item = '';
			return item;
		}
		console.log(this.quoteList)
		let reg = /^[1-9]\d*$/;
		if(!item.match(reg)){
			item = item.substr(0, item.length-1);
		}

		console.log(item );
		// this.calculator(item);
		return item;
		// if(reg.test(aa)){
		// 	console.log(aa)
		// }
	}
	// 去空格
	trim(str) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	showBondShrtnm(item,index){
		// console.log(this.customSelected)
		// console.log(index)
		// console.log(item.bondShrtnm)
		this.quoteList[index].bondShrtnm = item.bondShrtnm;
		// this.quoteList[index]['bondShrtnm'] = item['bondShrtnm'];
	}

	ok() {

		console.log(this.quoteList)
		console.log(this.drc)
		debugger
		let that = this;
		// debugger
		this.quoteList.forEach(function(item,index) {
			// body...

			item.drc = that.drc;
			console.log(item)
			item.bondCd = that.quoteList[index].bondCd;
			// item.yield = that.quoteList[index].bondCd;

		},that)
		// this.modalInstance.close(this.selected.item);
		that.modalInstance.close(that.quoteList);
	}
	cancel() {
		this.modalInstance.dismiss('cancel');
	}
	show(){
		this.hideRight = !this.hideRight;//隐藏右侧的搜索
	}
	searchBonds(){
		console.log(this.searchConditions)
		let promise = this.nowBondService.searchBonds(this.searchConditions);
		promise.then((data)=>{
			console.log(data);
			if(data.data.status==="0"){
				this.searchList = data.data.data;
			}
		},(data)=>{
			console.warn("获取议价列表异常");
		});
	}
	delete(index){
		console.log(index);
		this.quoteList.splice(index,1);
	}
	deleteRemark(item){
		if(item['remark'].length<=50){
			return false;
		}else{
			item.remark = item.remark.substr(0,50);
		}
	}
	addQuote(item1){
		console.log(item1);
		let obj = {};
		for (let key in item1){
			obj[key] = item1[key];
		}
		if(obj && !this.quoteList.includes(obj)){
			obj.wthrAnon=true;
			this.quoteList.push(obj);
			// if(obj.netprc){
			// 	obj.netprc = (obj.yield*100).toFixed(4);
			// 	this.yield(obj,obj);
			// }
			if(obj.yield){
				console.log(obj.yield)
				obj.yield = (obj.yield*100).toFixed(4);
				this.netprc(obj,obj);
			}
			this.customSelected = obj;
		}else{

			let tmpItem = {
				// drc:'',
				
					checked:'',//是否选中
					drc:'',//方向
					bondid:'',//债券id
					bondCd:'',//债券代码
					bondShrtnm:'',//债券简称
					num:'',//数量
					yield:'',//收益
					netprc:'',//净价
					wthrAnon:true,//是否匿名
					wthrListg:true,//是否大厅挂牌
					remark:'',//备注
				
			};
			if(!this.quoteList.includes(tmpItem)){
				this.quoteList.push(tmpItem);
			}
		}
	}
	// 债券搜索   模糊查询
	queryQuote(val){
		// this.searchBondBreedInfo.keyWord = val;
		// console.log(this.searchBondBreedInfo);
		// console.log(this.customSelected)
		let promise = this.nowBondService.searchBondBreed({'keyword': val});
		return promise.then(function(res) {
			// body...
			console.log(res)
			if(res.data.data ){
				// debugger;
				console.log(res.data.data)
				return res.data.data;
				// return [{name :123 ,id : 23} ,{name :22 , id : 34}]
			}
		});

	}
}
nowBondController.$inject = ['nowBondService'];
export default nowBondController;
