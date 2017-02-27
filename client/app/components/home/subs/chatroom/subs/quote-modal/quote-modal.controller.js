class QuoteModalController {
	constructor(quoteModalService) {
		this.quoteModalService = quoteModalService;
	}
	$onInit(){
		this.items = this.resolve.modalData.items;
		this.quoteList = this.resolve.modalData.quoteList;
		this.selected = {
			item: this.items[0]
		}
		this.searchList = [];
		this.searchConditions = {
			creditType:"",//债券类型
			creditSymbol:"",//主体评级
			dealDate:"2017-2-21",//处理时间
			rateType:"",//票面
			termType:"Y",//期限
			termStart:"0",//期限开始
			termEnd:"365",//期限结束
			pageNum:"1",//第几页
			pageSize:"20",//每一页有多少项
			orderCol:"sbjRtg",//以哪一列排序【sbjRtg主体评级】【rsdtrm	剩余期限】【yield 收益率】
			orderDirect:"desc"//desc倒序 asc正序
		};
	}
	ok() {
		this.modalInstance.close(this.selected.item);
	}
	cancel() {
		this.modalInstance.dismiss('cancel');
	}
	searchBonds(){
		let promise = this.quoteModalService.searchBonds();
		promise.then((data)=>{
			console.log(data);
			if(data.data.status==="0"){
				this.searchList = data.data.data;
			}
		},(data)=>{
			console.warn("获取议价列表异常");
		});
	}
	addQuote(item){
		console.log(item);
		if(item && !this.quoteList.includes(item)){
			item.wthrListg=true;
			this.quoteList.push(item);
		}else{
			let tmpItem = {
				checked:'',//是否选中
				drc:'',//方向
				bondid:'',//债券id
				bondCd:'',//债券代码
				bondShrtnm:'',//债券简称
				num:'',//数量
				yield:'',//收益
				netprc:'',//净价
				wthrAnon:'',//是否匿名
				wthrListg:true,//是否大厅挂牌
				remark:'',//备注
			};
			if(!this.quoteList.includes(tmpItem)){
				this.quoteList.push(tmpItem);
			}
		}
	}
}
QuoteModalController.$inject = ['quoteModalService'];
export default QuoteModalController;
