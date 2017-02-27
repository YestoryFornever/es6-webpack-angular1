var BONDCONFIG = require('../../../../../bond.config.js');
var echarts = require('echarts');

class BondquotationController {
	constructor(bondquotationService,$http) {
		this.name ="债券报价";
		this.bondquotationService = bondquotationService;
		this.$http = $http;

		this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  	this.format = this.formats[0];
	  	this.altInputFormats = ['M!/d!/yyyy'];

	  	this.popup1 = {
	   		opened: false
	    };

		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('settleChart'));

		// 绘制图表
		var axisData = ["11-1","11-2","11-3","11-4","11-5","11-6","11-7"];
		 // ['3.00','3.05','3.10','3.15','3.20','3.25','3.30']
		var data = axisData.map(function (item, i) {
		    return Math.round(Math.random() * 3 * (i + 1));
		});
		var links = data.map(function (item, i) {
		    return {
		        source: i,
		        target: i + 1
		    };
		});
		links.pop();
		myChart.setOption({
			title: { text: '结算行情' },
			tooltip: {},
			xAxis: {
				type : 'category',
        		boundaryGap : false,
				data: axisData
			},
			yAxis: {
				type : 'value'
			},
			series: [
				{
					type: 'graph',
		            layout: 'none',
		            coordinateSystem: 'cartesian2d',
		            symbolSize: 10,

		            label: {
		                normal: {
		                    show: false
		                }
		            },
		            edgeSymbol: ['circle', 'arrow'],
		            edgeSymbolSize: [1, 5],
		            data: data,
		            links: links,
		            lineStyle: {
		                normal: {
		                    color: '#fff'
		                }
		            }
				}
			]
		});
		window.onresize = function(){
			myChart.resize();
		};
		this.tableH = '3';
		
		// 方案列表
		this.queryScmList=[];
		this.sendQueryScmListInfo ={
			scmEStatus:'1'
		}
		// 删除方案
		this.deleteScmInfo ={
			scmid:''
		}
		// 新增方案
		this.addScmInfo = {
			scmNm:'',
			scmEStatus:'1',
			drc:'',
			yldrto:'',
			valtbpMns:'',
			bondTp:'',
			rsdtrm:'',
			sbjRtg:'',
			dbtitmRtg:'',
			issuPsn:'',
			issuEntp:'',
			ctou:'',
			wrnt:'',
			wrght:'',
			face:'',
			crclMkt:'',
			idy:'',
			rgon:'',
			yr:'',

		}
		// 复选
		this.bondTp={
			bondTp1:'',
			bondTp2:'',
			bondTp3:'',
			bondTp4:'',
			bondTp5:'',
			bondTp6:'',
			bondTp7:'',
			bondTp8:'',
			bondTp9:'',
			bondTp10:'',
			bondTp11:'',
			bondTp99:'',
		}

		//列表信息
		this.QueryQuoteList = [] ;
		this.sendQueryQuoteListInfo = {
			queryFlag:'A',
			wthrFcs:'',
			bondid:'',
			ofrEStatus:'',
			pageNum:'1',
			pageSize:'10',
			desc:'',
			orderColumn:'',


		}
		// 债券搜索
		// this.searchBondList = [
		// 	{
		// 		bondid:'',
		// 		bondCd:'',
		// 		bondShrtnm:'',
		// 		sbjRtg:'',
		// 		rsdtrm:'',

		// 	}
		// ];
		this.customSelected ='';
		this.searchBondBreedInfo = {
			keyWord:'',
			queryFlag:'A',
			wthrFcs:'',
			pageNum:'1',
			pageSize:'10',

		}
		// 债券详情
		this.bondDetail =  {};
		// 更新报价状态  关注 撤销
		this.careInfo = {
			bondOfrid:'',
			wthrFcs:'',
			wthrAlrdy:'',
			ofrEStatus:'',

		}
		
	}
	$onInit(){
		this.getQueryScmList();//获取方案名称
		this.getQueryQuoteList();
	}
	// 查询
	search(){
		this.sendQueryQuoteListInfo.bondid = this.customSelected.bondid;
		this.getQueryQuoteList();
		// console.log(this.customSelected)
	}

	// 债券搜索   模糊查询
	queryQuoteList(val){
		this.searchBondBreedInfo.keyWord = val;
		console.log(this.searchBondBreedInfo);
		console.log(this.customSelected)
		let promise = this.bondquotationService.searchBondBreed(this.searchBondBreedInfo);
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
	aaa(){
		console.log(this.checkModel)
	}
	// 获取报价列表
	getQueryQuoteList(id){
		// let flag = id ? id :
		if(id){
			this.sendQueryQuoteListInfo.queryFlag = id;
		}
		// this.sendQueryQuoteListInfo.queryFlag = (id ? id : "A");
		let promise = this.bondquotationService.queryQuoteList(this.sendQueryQuoteListInfo);
		promise.then((res)=>{
			console.log(res);
			if(res.data){
				if(res.data.status=='0'){
					this.QueryQuoteList = res.data.data;
					if(this.QueryQuoteList.length>0){
						this.getDetail(this.QueryQuoteList[0]['bondid']);
					}
				}else{
					// alert(res.data.msg)
				}
			}else{
				alert(res.msg)
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	// 获取方案列表
	getQueryScmList(){
		let promise = this.bondquotationService.queryScmList(this.sendQueryScmListInfo);
		promise.then((res)=>{
			console.log(res);
			if(res.data){
				if(res.data.status=='0'){
					this.queryScmList = res.data.data;
				}else{
					// alert(res.data.msg)
				}
			}else{
				alert(res.msg)
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	//删除自选方案
	deleteScm(id){
		this.deleteScmInfo.scmid = id;
		let promise = this.bondquotationService.deleteScm(this.deleteScmInfo);
		promise.then((res)=>{
			console.log(res);
			if(res.data){
				this.getQueryScmList();//获取方案名称
				// alert(res.data.msg)
			}else{
				alert(res.msg)
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	// 新增自选方案
	addScm(){
		let promise = this.bondquotationService.addScm(this.addScmInfo);
		promise.then((res)=>{
			console.log(res);
			if(res.data){
				this.getQueryScmList();
			}
			else{
				alert(res.msg)
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	// 获取详情
	getDetail(id){
		let promise = this.bondquotationService.queryBondBaseInfo({bondid:id});
		promise.then((res)=>{
			console.log(res);
			if(res.data){
				this.bondDetail = res.data.data
			}
			else{
				alert(res.msg)
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	// 单条信息 添加 取消 关注
	addCare(item,ev){
		ev.stopPropagation();
		this.careInfo.bondOfrid = item['bondOfrid'];

		console.log(item['wthrFcs'])
		if(item['wthrFcs'] =="0"){
			this.careInfo.wthrFcs ="1";
		}
		if(item['wthrFcs'] =="1"){
			this.careInfo.wthrFcs ="0";
		}
		console.log(this.careInfo)

		let promise = this.bondquotationService.updateQuoteState(this.careInfo);
		promise.then((res)=>{
			// console.log(res);
			this.getQueryQuoteList();
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}















	// 筛选列表 是否关注
	changeStatus(){
		if(this.sendQueryQuoteListInfo.wthrFcs){
			this.sendQueryQuoteListInfo.wthrFcs = '';
		}else{
			this.sendQueryQuoteListInfo.wthrFcs = '1';
		}
		this.getQueryQuoteList();
	}

	show(){
		console.log(111)
	}
	getValue(xxx,fff){
		console.log(fff);
	}
	open1(){
		this.popup1.opened = true;
	}
	openDialog(){//打开弹窗
		$(".modal-dialog").show("slow");
	}
	closeDialog(){//关闭弹窗
		$(".modal-dialog").hide("slow");
	}
}
BondquotationController.$inject = ['bondquotationService','$http'];
export default BondquotationController;
