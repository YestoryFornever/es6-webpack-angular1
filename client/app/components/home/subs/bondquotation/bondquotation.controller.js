// var echarts = require('echarts');

class BondquotationController {
	constructor(NetBondquotationService,$uibModal,$mdDialog,pagetabService,$state,AlertModalService,easeMobService,NetChangeBondService,nowBondService,SendAlertService,$timeout) {
		"ngInject";
		this.name ="债券报价";
		this.NetBondquotationService = NetBondquotationService;
		this.AlertModalService = AlertModalService;
		this.easeMobService = easeMobService;
		this.pagetabService = pagetabService;
		this.NetChangeBondService = NetChangeBondService;
		this.nowBondService = nowBondService;
		this.SendAlertService = SendAlertService;
		this.$uibModal = $uibModal;
		this.$state = $state;

		this.searchBondBreedInfo = {
			keyWord:'',
			queryFlag:'A',
			wthrFcs:'',
			pageNum:1,
			pageSize:50,
		}
		// 债券详情
		// this.bondDetail =  {};
		// 更新报价状态  关注 撤销
		this.careInfo = {
			bondOfrid:'',
			wthrFcs:'',
			wthrAlrdy:'',
			ofrEStatus:'',

		}
		this.orderList = [];
	}
	order(index,bool){
		this.orderList=[];
		this.is_one =null;
		this.is_two =null;
		this.is_three =null;
		this.is_four =null;
		this.is_five =null;
		this.is_six =null;
		this.is_seven =null;
		switch(index){
			case 1: this.is_one= bool==true ? true : bool==false?  false :null ;break;
			case 2: this.is_two= bool==true ? true : bool==false?  false :null ;break;
			case 3: this.is_three= bool==true ? true : bool==false?  false :null ;break;
			case 4: this.is_four= bool==true ? true : bool==false?  false :null ;break;
			case 5: this.is_five= bool==true ? true : bool==false?  false :null ;break;
			case 6: this.is_six= bool==true ? true : bool==false?  false :null ;break;
			case 7: this.is_seven= bool==true ? true : bool==false?  false :null ;break;
		}
		this.orderList.push(index);
		bool ? this.orderList.push(1): this.orderList.push(2);
		// if(bool ){
		// 	this.orderList.push(1);
		// }else{
		// 	this.orderList.push(2);
		// }
		this.getQueryQuoteList( );
	}
	$onInit(){

		this.location =this.NetBondquotationService.location;
		this.year =this.NetBondquotationService.year;
		this.section = this.NetBondquotationService.section;

		this.tabLablel=this.NetBondquotationService.tabLablel;
		// 地区 数据
		// 复选
		this.initMySelect();
		this.bond = this.NetBondquotationService.bondTp;
		/*BP差*/
		this.valtbpMns=this.NetBondquotationService.valtbpMns;
		this.yldrto=this.NetBondquotationService.yldrto;
		this.sbjRtg=this.NetBondquotationService.sbjRtg;
		//复选
		this.dbtitmRtg=this.NetBondquotationService.dbtitmRtg
		//复选
		this.issuEntp=this.NetBondquotationService.issuEntp;
		//复选;
		this.wrnt=this.NetBondquotationService.wrnt;
		//复选
		this.wrght=this.NetBondquotationService.wrght;
		//复选
		this.face=this.NetBondquotationService.face;
		//复选
		this.crclMkt=this.NetBondquotationService.crclMkt;
		//复选
		this.rsdtrm=this.NetBondquotationService.rsdtrm;
		//方案列表
		this.queryScmList=[];
		this.sendQueryScmListInfo={
			scmEStatus:'1'
		}
		// 新增方案
		this.addScmInfo = {
			scmNm:'',scmEStatus:'1',drc:'-1',yldrto:'',valtbpMns:'',bondTp:'',
			rsdtrm:'',sbjRtg:'',dbtitmRtg:'', issuPsn:'', issuEntp:'', ctou:'',
			wrnt:'', wrght:'', face:'', crclMkt:'', idy:'', rgon:'', yr:'2017',
		}
		//列表信息
		this.QueryQuoteList = [] ;
		this.sendQueryQuoteListInfo = {
			queryFlag:'A',
			wthrFcs:'0',
			bondid:'',
			ofrEStatus:'',
			pageNum:1,
			pageSize:50,
			order:'',
			desc:'',


		}
		this.currentPage = this.sendQueryQuoteListInfo.pageNum;
		this.scmid = '';
		this.getQueryScmList();//获取方案名称
		this.getQueryQuoteList();


	}
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
	initMySelect(){
		this.addScmInfo = {
			scmNm:'',scmEStatus:'1',drc:'-1',yldrto:'',valtbpMns:'',bondTp:'',
			rsdtrm:'',sbjRtg:'',dbtitmRtg:'', issuPsn:'', issuEntp:'', ctou:'',
			wrnt:'', wrght:'', face:'', crclMkt:'', idy:'', rgon:'', yr:'2017',
		}
		this.sbjRtgList={0:""};
		this.dbtitmRtgList={0:''};
		this.issuEntpList={0:''};
		this.wrntList={0:''};
		this.wrghtList={0:''};
		this.faceList={0:''};
		this.crclMktList={0:''};
		this.rsdtrmList={0:''};
		this.valtbpMnsList={0:'',1:''};
		this.yldrtoList={0:'',1:''};
		this.bondTpInit();
	}
	bondTpInit(){
		this.bondTpList1 ={1:"",2:'',3:'',4:'',5:""};
		this.bondTpList2 ={6:"",7:'',8:'',9:'',10:"",11:"",99:''};
	}
	// 获取结算行情
	getCBLatestWeekValuation(id){
		let promise = this.NetBondquotationService.getCBLatestWeekValuation({bondid :id});
			promise.then((res)=>{
				var axisData =[];
				var yieldData =[];
				var dealAmountData =[];
				for(let obj of res.data.data){
					axisData.push( obj.date );
					obj.yield = this.NetBondquotationService.__y(obj.yield/100,true) ;
					yieldData.push( obj.yield );
					dealAmountData.push(obj.dealAmount);
				}
				this.myChart = ({
				    tooltip : {
				        trigger: 'axis',
				        formatter: "{b} <br/> {a0}:  {c0} %  <br/> {a1}:  {c1} "
				    },
				    grid: { left: 'left', right: '4%',   bottom: '3%'},
				    xAxis : [{
					            type : 'category',
					            boundaryGap : false,
					            data : axisData
				    }],
				    yAxis : [{type : 'value'}],
				    series : [{
			            name:'收益率',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:yieldData
			        },{
			            name:'成交量',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data: dealAmountData
			        }]
				});
				
			});
		}
	//
	sendQuote(item){//打开发送报价弹窗
		let that = this;
		let promise = this.nowBondService.openNowBondModal(item);
		promise.then(function(res) {
			that.sendQueryQuoteListInfo.queryFlag = "A";
			that.getQueryQuoteList();
		},that);
	}
/****************处理 复选框数组******/
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
		let promise = this.NetBondquotationService.searchBondBreed(this.searchBondBreedInfo);
		return promise.then(function(res) {
			if(res.data.data ){
				return res.data.data;
			}
		});

	}
	// 发行人搜索
	fullName(val){
		let promise = this.NetBondquotationService.getIssuerListByFullName({'organizationFullName':val});
		return promise.then(function(res) {
			if(res.data.data ){
				return res.data.data;
			}
		});
	}
	/*获取报价列表*/
	getQueryQuoteList(id){
		this.QueryQuoteList =[];//解决 网速慢时显示 其他页面数据
		this.isCollapsed = false;
		if(id){
			this.sendQueryQuoteListInfo.queryFlag = id;
		}
		this.sendQueryQuoteListInfo.order = this.orderList.length>1	?	this.orderList[0]:'';
		this.sendQueryQuoteListInfo.desc  = this.orderList.length>1	?	this.orderList[1]:'';
		let promise = this.NetBondquotationService.queryQuoteList(this.sendQueryQuoteListInfo);
		promise.then((res)=>{
			if(res.data.status=='0'){
				this.QueryQuoteList = res.data.data;
				if(this.QueryQuoteList[0]){
					this.totalItems =	this.QueryQuoteList[0].page.totalResult;
				}
				if(this.QueryQuoteList.length>0){
					this.getDetail(this.QueryQuoteList[0]['bondid']);

				}
				this.getQueryScmList();
			}
		});
	}
	// 获取方案列表
	getQueryScmList(){
		let promise = this.NetBondquotationService.queryScmList(this.sendQueryScmListInfo);
		promise.then((res)=>{
			if(res.data.status=='0'){
				this.queryScmList = res.data.data;
			}
		});
	}
	//删除自选方案
	deleteScm(id){
		if(this.scmid){//删除按钮
			id = this.scmid;
		}
		let promise = this.NetBondquotationService.deleteScm({scmid :id});
		promise.then((res)=>{
			if(res.data.status=='0'){
				this.getQueryScmList();//获取方案名称
				this.AlertModalService.open({
					'tittle':'删除自选方案',
					'content':'删除自选方案成功',
				});
			}else{
				this.AlertModalService.open({
						'tittle':'',
						'content':res.data? res.data.msg : res.msg,
					});
			}
		});
	}
	// 新增  修改 自选方案
	addScm(id){
		if(this.changeScmid){
			this.addScmInfo.scmid = this.scmid;
		}
		if(!this.addScmInfo.scmNm){
			this.AlertModalService.open({
				'tittle':'',
				'content':'请输入方案名称',
			});
			return false;
		}
		this.inputFlse();//发送请求 不返显
		// 处理 复选
		this.addScmInfo.bondTp = this.selectNewToStr (this.bondTpList1 , this.bondTpList2) ;
		this.addScmInfo.sbjRtg = this.selectNewToStr( this.sbjRtgList );
		this.addScmInfo.dbtitmRtg = this.selectNewToStr( this.dbtitmRtgList );
		this.addScmInfo.wrght = this.selectNewToStr( this.wrghtList );
		this.addScmInfo.crclMkt = this.selectNewToStr( this.crclMktList );
		this.addScmInfo.rsdtrm = this.selectNewToStr( this.rsdtrmList );
		this.addScmInfo.issuEntp = this.selectNewToStr( this.issuEntpList );
		this.addScmInfo.wrnt = this.selectNewToStr( this.wrntList );
		this.addScmInfo.face = this.selectNewToStr( this.faceList );
		this.addScmInfo.valtbpMns = this.selectNewToStr( this.valtbpMnsList );
		this.addScmInfo.yldrto = this.selectNewToStr( this.yldrtoList );
		// 处理下拉
		this.addScmInfo.rgon = this.makeSelect(this.location);//地区
		this.addScmInfo.yr = this.makeSelect(this.year);//年份
		this.addScmInfo.idy = this.makeSelect(this.section);//行业
		if(!this.changeScmid){//添加
			this.newAddScm(this.addScmInfo);
		}else{//修改
			this.changeScm(this.addScmInfo);
		}
		
	}
	// 新增自选方案
	newAddScm(addScmInfo){
			let promise = this.NetBondquotationService.addScm(addScmInfo);
			promise.then((res)=>{
				if(res.data.status=='0' ){
					this.getQueryQuoteList();
					this.getQueryScmList();//获取方案名称
					this.AlertModalService.open({
							'tittle':'新增自选方案',
							'content':'新增自选方案成功',
						});
				}else{
					this.inputTrue();
					this.AlertModalService.open({
							'tittle':'',
							'content':res.data ? res.data.msg : res.msg,
						});
				}
			});
	}
	// 修改自选方案
	changeScm(addScmInfo){
		let promise = this.NetBondquotationService.updateScm(addScmInfo);
			promise.then((res)=>{
				if(res.data.status =='0' ){
					this.getQueryQuoteList();//方案列表
					this.getQueryScmList();//获取方案名称
					this.AlertModalService.open({
							'tittle':'修改自选方案',
							'content':'修改自选方案成功',
						});
				}else{
					this.inputTrue();
					this.AlertModalService.open({
							'tittle':'',
							'content':res.data ? res.data.msg : res.msg,
						});
				}
			});
	}
	inputTrue(){// 收益率 bp差 返显
		if(this.addScmInfo.valtbpMns){
			this.valtbpMnsList[0] = this.addScmInfo.valtbpMns.split(",")[0];
			this.valtbpMnsList[1] = this.addScmInfo.valtbpMns.split(",")[1];
		}
		if(this.addScmInfo.yldrto){
			this.yldrtoList[0] = this.addScmInfo.yldrto.split(",")[0];
			this.yldrtoList[1] = this.addScmInfo.yldrto.split(",")[1];
		}
		this.yldrtoList[0] = this.yldrtoList[0] ? this.NetBondquotationService.__y( this.yldrtoList[0] ,true) :null ;
		this.yldrtoList[1] = this.yldrtoList[1] ? this.NetBondquotationService.__y(  this.yldrtoList[1] ,true) :null;
		this.valtbpMnsList[0] = this.valtbpMnsList[0] ? this.NetBondquotationService.__BP( this.valtbpMnsList[0] ,true) :null ;//乘以1万
		this.valtbpMnsList[1] = this.valtbpMnsList[1] ? this.NetBondquotationService.__BP(  this.valtbpMnsList[1] ,true) :null;//乘以1万
	}
	inputFlse(){//发送请求 收益率 bp差
		this.yldrtoList[0] = this.yldrtoList[0] ? this.NetBondquotationService.__y( this.yldrtoList[0] ,false) :null ;
		this.yldrtoList[1] = this.yldrtoList[1] ? this.NetBondquotationService.__y(  this.yldrtoList[1] ,false) :null;
		this.valtbpMnsList[0] = this.valtbpMnsList[0] ? this.NetBondquotationService.__BP( this.valtbpMnsList[0],false  ):null ;//除以1万
		this.valtbpMnsList[1] = this.valtbpMnsList[1] ? this.NetBondquotationService.__BP( this.valtbpMnsList[1],false ) :null;//除以1万
		
	}
	// 获取详情
	onClick(item,index){
		this.index = index;
		this.getDetail(item.bondid);
	}
	getDetail(id,index,ev){
		if(ev){
			ev.stopPropagation();
		}
		let promise = this.NetBondquotationService.queryBondBaseInfo({bondid:id});
		promise.then((res)=>{
			if(res.data.status=="0"){
				this.bondDetail = res.data.data;
				this.nameAll = res.data.data.marketType;//修改报价 的 SH SZ IB
				this.bondDetail.bondid = id;
			}
		},(data)=>{});
		this.getCBLatestWeekValuation(id)
	}
	// 下拉
	newAddShow(){
		this.changeScmid =false;
		if(this.queryScmList.length>=5){
			this.AlertModalService.open({
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
		this.section = this.initSelect(this.section);
		this.year = this.initSelect(this.year);
		this.location = this.initSelect(this.location);
		this.initMySelect();
	}
	// 下拉自选方案
	changeAddShow(){
		this.changeScmid = true;
		this.isCollapsed =!this.isCollapsed;
		let id = this.sendQueryQuoteListInfo.queryFlag;
		let promise = this.NetBondquotationService.getScmDetail({'scmid':id});
		promise.then((res)=>{
			if(res.data.status=="0"){
				this.scmid = res.data.data.scmid;
				for(let key in this.addScmInfo){
					this.addScmInfo[key] = res.data.data[key];
					if(!this.addScmInfo[key]){
						this.addScmInfo[key] ='';
					}
				}
				this.inputTrue();
				// debugger
				this.bondTpToObj( this.addScmInfo['bondTp']);
				this.faceList =this.selectNewToObj(this.faceList,this.addScmInfo['face']);
				this.wrntList =this.selectNewToObj(this.wrntList,this.addScmInfo['wrnt']);
				this.issuEntpList =this.selectNewToObj(this.issuEntpList,this.addScmInfo['issuEntp']);
				this.rsdtrmList =this.selectNewToObj(this.rsdtrmList,this.addScmInfo['rsdtrm']);
				this.crclMktList =this.selectNewToObj(this.crclMktList,this.addScmInfo['crclMkt']);
				this.wrghtList =this.selectNewToObj(this.wrghtList,this.addScmInfo['wrght']);
				this.dbtitmRtgList =this.selectNewToObj(this.dbtitmRtgList,this.addScmInfo['dbtitmRtg']);
				this.sbjRtgList =this.selectNewToObj(this.sbjRtgList,this.addScmInfo['sbjRtg']);

			}
		});
	}
	bondTpToObj(str){
		if(!str){
			this.bondTpInit();
			this.addScmInfo.bondTp ='';
			return false;
		}else if(str.length==1){
			if(str>5){
				this.bondTpList2[str] = str;
			}else{
				this.bondTpList1[str] = str;
			}
		}else if(str.length>1){
			let arr = str.split(',');
			for(let value of arr){
				if(value>5){
					this.bondTpList2[value] =value;
				}else{
					this.bondTpList1[value] =value;
				}
			}
		}
	}
	selectNewToObj(obj,str){

		if(str >0 ){
			if(str.length ==1){
				obj[str] = str;
			}else if(str.length>1){
				let arr = str.split(',');
				for(let value of arr){
					obj[value] = value;
				}
			}
			obj[0] = false;
		}
		return obj;
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
		let promise = this.NetBondquotationService.updateQuoteState(this.careInfo,name);
		promise.then((res)=>{
			if(res.data.status=="0"){
				if(name == 'ofrEStatus'){
					res.data.data.forEach((item)=>{
						this.easeMobService.sendCmd('25',item);
					});
					this.AlertModalService.open({
						'tittle':'',
						'content':'操作成功',
					});
					this.getQueryQuoteList();
				}
			}
		});
	}
	upOrDownCheck(){
		let flag = false;
		for(let item in this.bondTpList2){
			if(this.bondTpList2[item]){
				flag =true;
			}
		}
		for(let item in this.bondTpList1){
			if(this.bondTpList1[item]){
				flag =true;
			}
		}
		if(flag){
			this.addScmInfo.bondTp = false;
		}else{
			this.addScmInfo.bondTp = '';
		}
	}
	checkedDownAll(list ,key){

		if(key==6 && this.bondTpList2['6'] ){
			this.addScmInfo.bondTp = false
			for(let item in this.bondTpList2){
				this.bondTpList2[item] = item;
			}
		}else if(key==6 && !this.bondTpList2[6]){

			for(let item in this.bondTpList2){
				this.bondTpList2[item] = false;
			}
			if(!this.bondTpList1['1']){
				this.addScmInfo.bondTp ='';
			}
		}else{
			this.upOrDownCheck();
		}
	}
	checkedUpAll(list,key){//债券类型  逻辑

		if(key ==1 && this.bondTpList1['1']){
			this.addScmInfo.bondTp = false
			for(let item in this.bondTpList1){
				this.bondTpList1[item] = item;
			}
		}else if(key ==1 && !this.bondTpList1[1]){
			for(let item in this.bondTpList1){
				this.bondTpList1[item] = false;
			}
			if(!this.bondTpList2['6']){
				this.addScmInfo.bondTp ='';
			}
		}else{
			this.upOrDownCheck();
		}
	}
	// openCalculator(item){//计算器 弹窗
	// 	this.NetBondquotationService.openCalculator(item);
	// }
	openChange(item ,ev,nameAll){//修改报价
		let promise = this.NetChangeBondService.openChange(item,this.nameAll);
		promise.then((res)=>{
			this.getQueryQuoteList();//刷新列表
		});
	}
	searchWthrFcs(){//筛选 是否关注
		this.sendQueryQuoteListInfo.wthrFcs = this.sendQueryQuoteListInfo.wthrFcs =="1"? this.sendQueryQuoteListInfo.wthrFcs ="0" :"1"
		this.getQueryQuoteList();
	}

	// deleteScmOrClear(){//删除按钮  自选方案
	// 	this.isCollapsed =!this.isCollapsed;
	// 	// if(this.scmid){
	// 	// 	this.deleteScm(this.scmid);
	// 	// }
	// }
	openFirendOrOnLine(item){//弹窗 发送 给好友 或者 大厅挂牌
		if(item && item['wthrListg'] =="0"){
			let promise = this.SendAlertService.openFirendOrOnLine(item);
			promise.then((res)=>{
				if(res['onLine']){
					item.num = item.num/10000;
					item.yldrto = item.yldrto*100;
					let promise3 = this.NetBondquotationService.updateBondQuote(item);
					promise3.then((res)=>{
						this.sendQueryQuoteListInfo.queryFlag = "A";
						this.getQueryQuoteList();
					})
				}
				if(res['friend']){
					this.NetBondquotationService.openFirend(item);
				}
			},(data)=>{});
		}else{
			this.NetBondquotationService.openFirend(item);
		}
	}
	// 分页
	pageNumChange(pageNow){
		this.sendQueryQuoteListInfo.pageNum = pageNow;
		this.getQueryQuoteList();
	}
	toDetail(item){
		this.$state.go('home.acoupondetails',{bondid:(item.bondid)})
	}
	activeTab1(){// 调到详情页面,添加也签
		this.pagetabService.activeTab({
			tabKey: 'home.acoupondetails',
			routeState:"home.acoupondetails",
			routeLabel:("详情"),
		});
	}



}
