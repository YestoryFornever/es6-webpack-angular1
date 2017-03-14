var BONDCONFIG = require('../../../../../bond.config.js');

import ModalInstanceTemplate from '../nowBond/nowBond.html';
import ModalInstanceCtrl from '../nowBond/nowBond.controller';

import ChangeModalInstanceTemplate from './subs/changeBond/changeBond.html';
import ChangeModalInstanceCtrl from './subs/changeBond/changeBond.controller';


var echarts = require('echarts');

class BondquotationController {
	constructor(bondquotationService,$uibModal,$mdDialog,AlertModalService,pagetabService) {
		this.name ="债券报价";
		this.bondquotationService = bondquotationService;
		this.AlertModalService = AlertModalService;
		this.pagetabService = pagetabService;
		this.$uibModal = $uibModal;
		// 基于准备好的dom，初始化echarts实例
		this.myChart = echarts.init(document.getElementById('settleChart'));
		this.searchBondBreedInfo = {
			keyWord:'',
			queryFlag:'A',
			wthrFcs:'',
			pageNum:1,
			pageSize:50,
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
		this.orderList=['',''];//列 升降序
	}
	myResize(){
		this.myChart.resize();
	}
	$onInit(){
		this.myResize();

		this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		this.format = this.formats[0];
		this.altInputFormats = ['M!/d!/yyyy'];

		// 地区 数据
		this.location = {
			"data":[
				{"label": "华东地区",'checked':false,'id':'1', "children": [
					{"label": "上海",'checked':false,'id':'11', "children": []},
					{"label": "江苏",'checked':false,'id':'12', "children": []},
					{"label": "安徽",'checked':false,'id':'13', "children": []},
					{"label": "浙江",'checked':false,'id':'14', "children": []},
					{"label": "山东",'checked':false,'id':'15', "children": []},
					{"label": "福建",'checked':false,'id':'16', "children": []},
					{"label": "江西",'checked':false,'id':'17', "children": []},
					{"label": "台湾",'checked':false,'id':'18', "children": []},
				]},
				{"label": "华北地区",'checked':false,'id':'2', "children": [
					{"label": "北京",'checked':false,'id':'21', "children": []},
					{"label": "天津",'checked':false,'id':'22', "children": []},
					{"label": "河北",'checked':false,'id':'23', "children": []},
					{"label": "山西",'checked':false,'id':'24', "children": []},
					{"label": "内蒙古",'checked':false,'id':'25', "children": []},

				]},
				{"label": "东北地区",'checked':false,'id':'3', "children": [
					{"label": "辽宁",'checked':false,'id':'31', "children": []},
					{"label": "吉林",'checked':false,'id':'32', "children": []},
					{"label": "黑龙江",'checked':false,'id':'33', "children": []},

				]},
				{"label": "华中地区",'checked':false,'id':'4', "children": [
					{"label": "河南",'checked':false,'id':'41', "children": []},
					{"label": "湖北",'checked':false,'id':'42', "children": []},
					{"label": "湖南",'checked':false,'id':'43', "children": []},

				]},
				{"label": "华南地区",'checked':false,'id':'5', "children": [
					{"label": "广东",'checked':false,'id':'51', "children": []},
					{"label": "广西",'checked':false,'id':'52', "children": []},
					{"label": "海南",'checked':false,'id':'53', "children": []},
					{"label": "香港",'checked':false,'id':'54', "children": []},
					{"label": "澳门",'checked':false,'id':'55', "children": []},

				]},
				{"label": "西南地区",'checked':false,'id':'6', "children": [
					{"label": "重庆",'checked':false,'id':'61', "children": []},
					{"label": "四川",'checked':false,'id':'62', "children": []},
					{"label": "云南",'checked':false,'id':'63', "children": []},
					{"label": "贵州",'checked':false,'id':'64', "children": []},
					{"label": "西藏",'checked':false,'id':'65', "children": []},

				]},
				{"label": "西北地区",'checked':false,'id':'7', "children": [
					{"label": "陕西",'checked':false,'id':'71', "children": []},
					{"label": "宁夏",'checked':false,'id':'72', "children": []},
					{"label": "甘肃",'checked':false,'id':'73', "children": []},
					{"label": "青海",'checked':false,'id':'74', "children": []},
					{"label": "新疆",'checked':false,'id':'75', "children": []},

				]},
			]
		};
		// 年份 数据
		this.year = {
			"data":[
				{"label": "2017",'checked':false,'id':'2017', "children": []},
				{"label": "2016",'checked':false,'id':'2016', "children": []},
				{"label": "2015",'checked':false,'id':'2015', "children": []},
				{"label": "2014",'checked':false,'id':'2014', "children": []},
				{"label": "2013",'checked':false,'id':'2013', "children": []},
				{"label": "2012",'checked':false,'id':'2012', "children": []},
				{"label": "2011",'checked':false,'id':'2011', "children": []},
				{"label": "2010",'checked':false,'id':'2010', "children": []},
				{"label": "2009",'checked':false,'id':'2009', "children": []},
				{"label": "2008",'checked':false,'id':'2008', "children": []},
				{"label": "2007",'checked':false,'id':'2007', "children": []},
				{"label": "2006",'checked':false,'id':'2006', "children": []},
				{"label": "2005",'checked':false,'id':'2005', "children": []},
				{"label": "2004",'checked':false,'id':'2004', "children": []},
				{"label": "2003",'checked':false,'id':'2003', "children": []},
				{"label": "2002",'checked':false,'id':'2002', "children": []},
				{"label": "2001",'checked':false,'id':'2001', "children": []},
				{"label": "2000",'checked':false,'id':'2000', "children": []},
				{"label": "1999",'checked':false,'id':'1999', "children": []},
				{"label": "1998",'checked':false,'id':'1998', "children": []},
				{"label": "1997",'checked':false,'id':'1997', "children": []},
				{"label": "1996",'checked':false,'id':'1996', "children": []},
				{"label": "1995",'checked':false,'id':'1995', "children": []},
				{"label": "1994",'checked':false,'id':'1994', "children": []},
				{"label": "1993",'checked':false,'id':'1993', "children": []},
				{"label": "1992",'checked':false,'id':'1992', "children": []},
				{"label": "1991",'checked':false,'id':'1991', "children": []},
				{"label": "1990",'checked':false,'id':'1990', "children": []},
			]
		};
		// section  行业
		this.section={
			"data":[
				{"label": "农、林、牧、渔业",'checked':false,'id':'A', "children": [
					{"label": "农业",'checked':false,'id':'1', "children": []},
					{"label": "林业",'checked':false,'id':'2', "children": []},
					{"label": "畜牧业",'checked':false,'id':'3', "children": []},
					{"label": "渔业",'checked':false,'id':'4', "children": []},
					{"label": "农、林、牧、渔服务业",'checked':false,'id':'5', "children": []},
				]},
				{"label": "采矿业",'checked':false,'id':'B', "children": [
					{"label": "煤炭开采和洗选业",'checked':false,'id':'6', "children": []},
					{"label": "石油和天然气开采业",'checked':false,'id':'7', "children": []},
					{"label": "黑色金属矿采选业",'checked':false,'id':'8', "children": []},
					{"label": "有色金属矿采选业",'checked':false,'id':'9', "children": []},
					{"label": "非金属矿采选业",'checked':false,'id':'10', "children": []},
					{"label": "开采辅助活动",'checked':false,'id':'11', "children": []},
					{"label": "其他采矿业",'checked':false,'id':'12', "children": []},
				]},
				{"label": "制造业",'checked':false,'id':'C', "children": [
					{"label": "农副食品加工业",'checked':false,'id':'13', "children": []},
					{"label": "食品制造业",'checked':false,'id':'14', "children": []},
					{"label": "酒、饮料和精制茶制造业",'checked':false,'id':'15', "children": []},
					{"label": "烟草制品业 ",'checked':false,'id':'16', "children": []},
					{"label": "纺织业",'checked':false,'id':'17', "children": []},
					{"label": "纺织服装、服饰业",'checked':false,'id':'18', "children": []},
					{"label": "皮革、毛皮、羽毛及其制品和制鞋业",'checked':false,'id':'19', "children": []},

				]},
				{"label": "电力、热力、燃气及水生产和供应业",'checked':false,'id':'D', "children": []},
				{"label": "建筑业",'checked':false,'id':'E', "children": []},
				{"label": "批发和零售业",'checked':false,'id':'F', "children": []},
				{"label": "交通运输、仓储和邮政业",'checked':false,'id':'G', "children": []},
				{"label": "住宿和餐饮业",'checked':false,'id':'H', "children": []},
				{"label": "信息传输、软件和信息技术服务业",'checked':false,'id':'I', "children": []},
				{"label": "金融业",'checked':false,'id':'J', "children": []},
				{"label": "房地产业",'checked':false,'id':'K', "children": []},
				{"label": "租赁和商务服务业",'checked':false,'id':'L', "children": []},
				{"label": "科学研究和技术服务业",'checked':false,'id':'M', "children": []},
				{"label": "水利、环境和公共设施管理业",'checked':false,'id':'N', "children": []},
				{"label": "居民服务、修理和其他服务业",'checked':false,'id':'O', "children": []},
				{"label": "教育",'checked':false,'id':'P', "children": []},
				{"label": "卫生和社会工作",'checked':false,'id':'Q', "children": []},
				{"label": "文化、体育和娱乐业",'checked':false,'id':'R', "children": []},
				{"label": "公共管理、社会保障和社会组织",'checked':false,'id':'S', "children": []},
				{"label": "国际组织",'checked':false,'id':'T', "children": []},
			]
		}
		this.bondTp=[];
		// 复选
		this.sbjRtg=[];
		//复选
		this.dbtitmRtg=[];
		//复选
		this.issuEntp=[];
		//复选
		this.wrnt=[];
		//复选
		this.wrght=[];
		//复选
		this.face=[];
		//复选
		this.crclMkt=[];
		//复选
		this.rsdtrm=[];

		// 输入框


		this.yldrto =['', ''];
		this.valtbpMns =['', ''];
		this.opRsdtrm =['', ''];
		//方案列表
		this.queryScmList=[];
		this.sendQueryScmListInfo={
			scmEStatus:'1'
		}
		//删除方案
		this.deleteScmInfo ={
			scmid:''
		}
		// 新增方案
		this.addScmInfo = {
			scmNm:'',scmEStatus:'1',drc:'-1',yldrto:'',valtbpMns:'',bondTp:'',opRsdtrmUt:'D',
			rsdtrm:'',sbjRtg:'',dbtitmRtg:'', issuPsn:'', issuEntp:'', ctou:'',
			wrnt:'', wrght:'', face:'', crclMkt:'', idy:'', rgon:'', yr:'2017',
		}
		//列表信息
		this.QueryQuoteList = [] ;
		this.sendQueryQuoteListInfo = {
			queryFlag:'A',
			wthrFcs:'',
			bondid:'',
			ofrEStatus:'',
			pageNum:1,
			pageSize:50,
			order:'',
			desc:'',


		}
		this.currentPage = this.sendQueryQuoteListInfo.pageNum;
		this.issuPsn = {};
		// this.isShow =true;
		this.quoteListChecked = [];//待发送报价列表
		this.animationsEnabled = true;//展示弹窗是否显示动画
		this.dataFriendModal ={//好友
			items:['item1', 'item2', 'item3'],
			friendObj:{}
		}
		this.dataCalculatorModal ={//计算器
			items:['item1', 'item2', 'item3'],
			itemInfo:{}
		}
		this.changeDataForModal = {//修改报价
			items:['item1', 'item2', 'item3'],
			changeInfo:{}
		}
		this.dataForModal = {//现券报价
			items:['item1', 'item2', 'item3'],
			isShow:false,
			quoteList:[],
		};
		this.scmid = '';
		this.getQueryScmList();//获取方案名称
		this.getQueryQuoteList();


	}
	// 获取结算行情
	getCBLatestWeekValuation(id){
		let promise = this.bondquotationService.getCBLatestWeekValuation({bondid :id});
			promise.then((res)=>{
				this.axisData =[];
				this.data =[];
				for(let obj of res.data.data){
					this.axisData.push( obj.date );
					obj.yield = obj.yield*100;
					this.data.push( obj.yield );
				}
				this.myChart.setOption({
					textStyle:{
						color:'#fff',
					},
					event: [
						  {
							type: "click",
						  }
						],
						tooltip: {
							trigger: 'axis',
							formatter: "{a} <br/>{b} : {c} %"
						},
						legend: {
						    orient: 'vertical',
						    left: 'left',
						},
						xAxis: {
						    gridIndex: 0,
						    type: 'category',
						    // data: this.xData,
						    data:this.axisData
						},
						yAxis:
						{
						  gridIndex: 0,
						  type: 'value',
						   axisLabel: {
								formatter: '{value} %'
							}
						},
						series:{
						    name: '访问来源',
						    type: 'line',
						    // data: this.yData,
						    data:this.data
						}
					});
				},(data)=>{
					// console.warn("批量新增报价异常");
				});
			}
	//
	sendQuote(item){//打开发送报价弹窗
		let that = this;
		let flag = true;
		var modalInstance = that.$uibModal.open({
			animation: that.animationsEnabled,
			component:'nowBond',
			windowClass:'my-now-bond',
			size: 'wfxl',//'lg',//'sm',
			resolve: {
				modalData:function(){
					// console.log(aa)
					if(item){
						that.dataForModal.quoteList = [];
						that.dataForModal.quoteList.push(item);
					}else{
						that.dataForModal.quoteList = [];
					}
					return that.dataForModal;
				}
			}
		}).result.then(function (selectedItem) {
			that.selected = selectedItem;
			let tmplist = that.dataForModal.quoteList;
			that.quoteListChecked =[];//清空数组
			tmplist.forEach(function(item,index){
				if(item.num!='' && item.yield!='' && item.netprc!=''){
					that.quoteListChecked.push({
						'bondid':item.bondCd.bondid ? item.bondCd.bondid : item.bondid,
						'drc':item.drc,
						'num':item.num*10000,
						'yldrto':item.yield/100,
						'netprc':item.netprc,
						'wthrAnon':(item.wthrAnon===true? '1' : (item.wthrAnon===false ? '0':''))  ,
						'wthrListg':"1"  ,
						'rmrk':item.remark
					});
				}else{
					that.AlertModalService.openBox({
						'tittle':'',
						'content':'修改报价成功',
					});
					flag = false;
					return false;

				};
			},that);
			if(flag){
				let promise = that.bondquotationService.addBatchBondQuote(that.quoteListChecked);
				promise.then((res)=>{
					if(res.data){
						that.AlertModalService.openBox({
							'tittle':'',
							'content':res.data.msg,
						});
						that.getQueryQuoteList(null,"A");
					}
				},(data)=>{
					console.warn("批量新增报价异常");
				});
			}
		});
	}
/****************处理 复选框数组******/
	objToStr(obj){
		let arr = [];
		$.each(obj, function(index, val) {
			if(val){
				arr.push(val)
			}
		});
		return arr.join(',');
	}



/*************债券搜索 查询 *******/
	// 查询
	search(){
		this.sendQueryQuoteListInfo.bondid = this.customSelected.bondid;
		this.getQueryQuoteList();
	}
	// 债券搜索   模糊查询
	queryQuote(val){
		this.searchBondBreedInfo.keyWord = val;
		this.searchBondBreedInfo.queryFlag = this.sendQueryQuoteListInfo.queryFlag;
		let promise = this.bondquotationService.searchBondBreed(this.searchBondBreedInfo);
		return promise.then(function(res) {
			if(res.data.data ){
				return res.data.data;
			}
		});

	}
	// 发行人搜索
	fullName(val){
		let promise = this.bondquotationService.getIssuerListByFullName({'organizationFullName':val});
		return promise.then(function(res) {
			if(res.data.data ){
				return res.data.data;
			}
		});
	}
	/*获取报价列表*/
	getQueryQuoteList(ev,id){
		this.isCollapsed = false;
		if(ev){
			$(ev.target).parent('tr').find('i').hide();
			$(ev.target).find('i').show() ;
		}else{
			this.orderList =[ '',''];
		}
		if((this.orderList[0] == this.sendQueryQuoteListInfo.order) && this.orderList[0] !=''){//排序
			if(this.orderList[1] == '1'){
				this.orderList[1] = '2';
			}else{
					this.orderList[1] = '1';
			}
		}
		if(id){
			this.sendQueryQuoteListInfo.queryFlag = id;
		}
		this.sendQueryQuoteListInfo.order =this.orderList[0];
		this.sendQueryQuoteListInfo.desc  = this.orderList[1];
		let promise = this.bondquotationService.queryQuoteList(this.sendQueryQuoteListInfo);
		promise.then((res)=>{
			if(res.data){
				if(res.data.status=='0'){
					this.QueryQuoteList = res.data.data;

					for(let obj of this.QueryQuoteList){
							if(obj.ofrEStatus =="1"){
								obj.ofrEStatus = '有效';
							}else if(obj.ofrEStatus =="2"){
								obj.ofrEStatus = '撤销';
							}else if(obj.ofrEStatus =="3"){
								obj.ofrEStatus = '成交';
							}
							if(obj.drc =='1'){
								obj.drc = '卖出';
							}
							if(obj.drc =='-1'){
								obj.drc = '买入';
							}
							if(obj.wthrListg =='1'){
								obj.wthrListg = '报价大厅';
							}
							if(obj.wthrListg =='0'){
								obj.wthrListg = '定向发送';
							}
					}
					if(this.QueryQuoteList[0]){
						this.totalItems =	this.QueryQuoteList[0].page.totalResult;
					}
					if(this.QueryQuoteList.length>0){
						this.getDetail(this.QueryQuoteList[0]['bondid']);

					}
					this.getQueryScmList();
				}
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
				}
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
				this.AlertModalService.openBox({
					'tittle':'删除自选方案',
					'content':'删除自选方案成功',
				});
				// alert(res.data.msg)
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	// 新增自选方案
	addScm(id){
		if(this.changeScmid){
			this.addScmInfo.scmid = this.scmid;
		}
		if(this.yldrto[0] ){
			this.yldrto[0] = this.yldrto[0]/100+'';
		}
		if(this.yldrto[1] ){
			this.yldrto[1] = this.yldrto[1]/100+'';
		}
		this.addScmInfo.yldrto = this.yldrto.join(',');
		this.addScmInfo.valtbpMns =  this.valtbpMns.join(',') ;
		this.addScmInfo.opRsdtrm = this.opRsdtrm.join(',') ;
		if(this.addScmInfo.yldrto ==','){
			this.addScmInfo.yldrto = '';
		}
		if(this.addScmInfo.opRsdtrm ==','){
			this.addScmInfo.opRsdtrm = '';
		}
		if(this.addScmInfo.valtbpMns ==','){
			this.addScmInfo.valtbpMns = '';
		}
		// 处理 复选
		this.addScmInfo.bondTp = this.objToStr(this.bondTp);
		this.addScmInfo.sbjRtg = this.objToStr(this.sbjRtg);
		this.addScmInfo.dbtitmRtg = this.objToStr(this.dbtitmRtg);
		this.addScmInfo.issuEntp = this.objToStr(this.issuEntp);
		this.addScmInfo.wrnt = this.objToStr(this.wrnt);
		this.addScmInfo.wrght = this.objToStr(this.wrght);
		this.addScmInfo.face = this.objToStr(this.face);
		this.addScmInfo.crclMkt = this.objToStr(this.crclMkt);
		this.addScmInfo.rsdtrm = this.objToStr(this.rsdtrm);
		// 处理下拉
		this.addScmInfo.rgon = this.makeSelect(this.location);//地区
		this.addScmInfo.yr = this.makeSelect(this.year);//年份
		this.addScmInfo.idy = this.makeSelect(this.section);//行业

		if(!this.changeScmid){//添加
			let promise = this.bondquotationService.addScm(this.addScmInfo);
			promise.then((res)=>{
				if(res.data ){
					this.getQueryQuoteList();
					this.AlertModalService.openBox({
							'tittle':'新增自选方案',
							'content':'新增自选方案成功',
						});
				}
			},(data)=>{
			});
		}else{//修改
			let promise = this.bondquotationService.updateScm(this.addScmInfo);
			promise.then((res)=>{
				if(res.data ){
					this.getQueryQuoteList();
					this.AlertModalService.openBox({
							'tittle':'修改自选方案',
							'content':'修改自选方案成功',
						});
				}
			},(res)=>{});
		}
		
	}
	// 获取详情
	getDetail(id){
		let promise = this.bondquotationService.queryBondBaseInfo({bondid:id});
		promise.then((res)=>{
			console.log(res);
			if(res.data){
				this.bondDetail = res.data.data;
				this.bondDetail.bondid = id;
				this.bondDetail.nameAll = res.data.data.marketType;
				if (this.bondDetail.nameAll == "银行间") {
					this.bondDetail.nameAll = "IB";
				} else if (this.bondDetail.nameAll == "沪市") {
					this.bondDetail.nameAll = "SH";
				} else if (this.bondDetail.nameAll == "深市") {
					this.bondDetail.nameAll = "SZ";
				}
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
		this.getCBLatestWeekValuation(id)
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
	// 下拉
	newAddShow(){
		this.changeScmid =false;
		if(this.queryScmList.length>=5){
			this.AlertModalService.openBox({
				'tittle':'',
				'content':'最多添加5个自选方案',
			});
			return false;
		}
		this.isCollapsed =!this.isCollapsed;
		// 新增方案
		for(let key in this.addScmInfo){
			if(key !='drc' || key !='scmEStatus' || key !='yr'){
				this.addScmInfo[key] = '';
			}
		}
		this.addScmInfo = {
			scmNm:'',scmEStatus:'1',drc:'-1',yldrto:'',valtbpMns:'',bondTp:'',opRsdtrmUt:'D',
			rsdtrm:'',sbjRtg:'',dbtitmRtg:'', issuPsn:'', issuEntp:'', ctou:'',
			wrnt:'', wrght:'', face:'', crclMkt:'', idy:'', rgon:'', yr:'2017',
		}
		this.section = this.initSelect(this.section);
		this.year = this.initSelect(this.year);
		this.location = this.initSelect(this.location);

		this.bondTp = [];
		this.sbjRtg = [];
		this.dbtitmRtg = [];
		this.issuEntp = [];
		this.wrnt = [];
		this.wrght = [];
		this.face = [];
		this.crclMkt = [];
		this.rsdtrm = [];
	}
	initArr(arr){
		for(let i of arr){
			arr[i] = '';
		}
		return arr;
	}
	// 下拉自选方案

	changeAddShow(){
		this.changeScmid = true;
		this.isCollapsed =!this.isCollapsed;
		let id = this.sendQueryQuoteListInfo.queryFlag;
		let promise = this.bondquotationService.getScmDetail({'scmid':id});
		promise.then((res)=>{
			if(res.data.data){
				this.scmid = res.data.data.scmid;
				for(let key in this.addScmInfo){
					this.addScmInfo[key] = res.data.data[key];
					if(!this.addScmInfo[key]){
						this.addScmInfo[key] ='';
					}
					if(key == 'yldrto'){
						this.yldrto = this.numInput( this.addScmInfo[key]  ,'yldrto');
					}
					if(key == 'valtbpMns'){
						this.valtbpMns = this.numInput( this.addScmInfo[key]  ,'valtbpMns');
					}
					if(key == 'opRsdtrm'){
						this.opRsdtrm = this.numInput( this.addScmInfo[key]  ,'opRsdtrm');
					}
					if( this.addScmInfo[key] ==''){
						this.addScmInfo.opRsdtrmUt ="D";
					}
					this['bondTp'] = this.strtoArr(this['bondTp'], this.addScmInfo['bondTp']);
					this['rsdtrm'] =this.strtoArr(this['rsdtrm'], this.addScmInfo['rsdtrm']);
					this['sbjRtg'] =this.strtoArr(this['sbjRtg'], this.addScmInfo['sbjRtg']);
					this['dbtitmRtg'] =this.strtoArr(this['dbtitmRtg'], this.addScmInfo['dbtitmRtg']);
					this['issuEntp'] =this.strtoArr(this['issuEntp'], this.addScmInfo['issuEntp']);
					this['wrnt'] =this.strtoArr(this['wrnt'], this.addScmInfo['wrnt']);
					this['wrght'] =this.strtoArr(this['wrght'], this.addScmInfo['wrght']);
					this['face'] =this.strtoArr(this['face'], this.addScmInfo['face']);
					this['crclMkt'] =this.strtoArr(this['crclMkt'], this.addScmInfo['crclMkt']);
				}
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	strtoArr(bond,val){
		let newarr = [];
		if(!val){
			return ;
		}
		// debugger
		if(val.length==1){
			newarr[(val-1)] = val;

			// return newarr;
		}else if(val.length>1){
			var  arr = val.split(',');
			$.each(arr, function(index, value) {
				newarr[(value-1)] = value;
			});
		}
		for(let i =0; i< newarr.length; i++){
			if(!newarr[i]){
				newarr[i] = '';
			}
		}
		return newarr;
	}
	// 获取下拉 信息 年份 地区 行业
	yearFn(val){
		this.year = val;
	}
	locationFn(val){
		this.location = val;
	}
	sectionFn(val){
		this.section['data'] = val;
	}
	makeSelect(obj){
		let newArr =[];
		for(let key of obj.data){
			if(key['checked']){
				newArr.push(key['id']);
				for(let key2 of key['children']){
					if(key2['checked']){
						newArr.push(key2['id'])
					}
				}
			}
		}
		return newArr.join(',');
	}
	initSelect(obj){
		for(let key of obj.data){
			if(key['checked']){
				key['checked'] =false;
				for(let key2 of key['children']){
					if(key2['checked']){
						key2['checked'] = false;
					}
				}
			}
		}
		return obj;
	}
	changeCareInfo(item,name,ev){//撤销 和 关注
		ev.stopPropagation();
		this.careInfo.bondOfrid = item.bondOfrid;
		this.careInfo.wthrFcs = item.wthrFcs;
		this.careInfo.ofrEStatus = item.ofrEStatus;
		if(name == 'ofrEStatus'){
			this.careInfo.ofrEStatus = '2';
		}
		if(name == 'wthrFcs'){
			if(this.careInfo.wthrFcs =='0'){
				this.careInfo.wthrFcs ='1';
				item.wthrFcs = true;
			}else{
				this.careInfo.wthrFcs = '0';
				item.wthrFcs = false;
			}
		}
		let promise = this.bondquotationService.updateQuoteState(this.careInfo,name);
		promise.then((res)=>{
			if(res.data.data){
				if(name == 'ofrEStatus'){
					item.ofrEStatus = '撤销';
				}
				this.AlertModalService.openBox({
					'tittle':'',
					'content':'操作成功',
				});
			}
		},(data)=>{
			// console.warn("获取议价列表异常");
		});
	}
	allCheck(name){//债券类型  逻辑
		if(this.addScmInfo[name] ==''){
			for(let key in this[name]){
				this[name][key] = "" ;
			}
		}
	}
	checkedUpAll(){//债券类型  逻辑
		if(this.bondTp[0] =="1"){
			this.addScmInfo.bondTp ="''";
			this.bondTp[1] = '2';
			this.bondTp[2] = '3';
			this.bondTp[3] = '4';
			this.bondTp[4] = '5';
		}else{
			this.bondTp[1] = '';
			this.bondTp[2] = '';
			this.bondTp[3] = '';
			this.bondTp[4] = '';
		}
		if(this.bondTp[0] ==false && this.bondTp[5] ==false){
			this.addScmInfo.bondTp ='';
		}
	}
	checkedDownAll(){//债券类型  逻辑
		if(this.bondTp[5] =="6"){
			this.addScmInfo.bondTp ="''";
			this.bondTp[6] = '7';
			this.bondTp[7] = '8';
			this.bondTp[8] = '9';
			this.bondTp[9] = '10';
			this.bondTp[10] = '11';
			this.bondTp[98] = '99';
		}else{
			this.bondTp[6] = '';
			this.bondTp[7] = '';
			this.bondTp[8] = '';
			this.bondTp[9] = '';
			this.bondTp[10] = '';
			this.bondTp[98] = '';
		}
		if(this.bondTp[0] ==false && this.bondTp[5] ==false){
			this.addScmInfo.bondTp ='';
		}
	}
	allCheckFalse(name){
		this.addScmInfo[name]= "''";

	}
	// 期限单位 D Y
	changeStarus(ev){
		this.isActive = true;
		if(this.addScmInfo.opRsdtrmUt =="D"){
			this.addScmInfo.opRsdtrmUt ="Y";
		}else{
			this.addScmInfo.opRsdtrmUt ="D";
		}
	}
	trim(str){
		let reg = /(^\s*)|(\s*$)/g;
		str.replace(reg,'');
		return str;

	}
	checkNumYldrto(index){
		this['yldrto'][index] = this.trim( this['yldrto'][index] );
		let reg = /^[0-9]{1,6}(\.[0-9]{0,4})?$/;
		console.log(reg.test(this['yldrto'][index]))
		if( !reg.test(this['yldrto'][index]) ){
			this['yldrto'][index] = this['yldrto'][index].substr(0,this['yldrto'][index].length-1);
		}
	}
	checkNumValtbpMns(name,index){
		let reg = /^\+?[1-9]\d*$/;
		if(!reg.test(this[name][0])){
			this[name][index] =this[name][index].substr(0,this[name][index].length-1);
		}
		if(!parseInt(this[name][index])){
			this[name][index] ='';
		}
	}
	inputNum(arr){
		let str = '';
		// debugger
		if(arr['0'] && arr['1']){
			if(parseInt(arr[0]) || parseInt(arr[1])){
				arr[0] = arr[0]/100 ;
				arr[1] = arr[1]/100 ;
			}
		}
		str = arr.join(',');
		return str;
	}
	numInput(str ,name){
		if(!str){
			return ['',''];
		}
		let arr =[];
		arr[0] = str.split(',')[0];
		arr[1] = str.split(',')[1];
		if(name =='yldrto'){
				arr[0] = (arr[0]*1).toFixed(4)*100  ;
				arr[1] =  (arr[1]*1).toFixed( 4 )*100;
		}
		if(name =='valtbpMns'){
				arr[0] = arr[0]*10000 ;
				arr[1] = arr[1]*10000;
		}
		return arr;

	}
	stopPre(ev){
		ev.stopPropagation();
		return false;
	}
	openCalculator(item){//计算器 弹窗
		this.bondquotationService.openCalculator(item);
	}
	openChange(item ,ev,nameAll){//修改报价
		ev.stopPropagation();
		let that = this;
		that.$uibModal.open({
			  animation: that.animationsEnabled,
			  component:"changeBond",
			  windowClass:'my-change-bond',
			  size: 'xl',
			  resolve: {
				changeDataForModal: function () {
					for(let key in item){
						that.changeDataForModal.changeInfo[key] = item[key];
					}
					that.changeDataForModal.changeInfo.nameAll = nameAll;
					return  that.changeDataForModal;
				}
			  }
			}).result.then(function(res){
				let sendObjInfo = that.changeDataForModal.changeInfo;
				let promise = that.bondquotationService.updateBondQuote(sendObjInfo);
				promise.then((res)=>{
					if(res.data){
						that.getQueryQuoteList();
						that.AlertModalService.openBox({
							'tittle':'修改报价',
							'content':'修改报价成功',
						});
					}
				},(data)=>{
				});
			},function(res) {
				that.getQueryQuoteList();
			})
	}
	openFirend(item){//打开好友弹窗

		let that =this;
		that.dataFriendModal.friendObj = item;
		that.$uibModal.open({
			animation: that.animationsEnabled,
			component:'acoupond',
			size: 'xl',//'lg',//'sm',
			resolve: {
				friendModal:function(){
					return that.dataFriendModal ;
				}
			}
		}).result.then(function (selectedItem) {},that);
	}
	// 分页
	pageNumChange(pageNow){o
		this.sendQueryQuoteListInfo.pageNum = pageNow;
		this.getQueryQuoteList();
	}
	activeTab1(){// 调到详情页面
		this.pagetabService.activeTab({
			tabKey: 'home.acoupondetails',
			routeState:"home.acoupondetails",
			routeLabel:("详情"),
		});
	}


}
BondquotationController.$inject = ['bondquotationService','$uibModal','$mdDialog','AlertModalService','pagetabService'];
export default BondquotationController;
