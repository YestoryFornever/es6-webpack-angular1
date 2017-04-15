class nowBondController {
	constructor(nowBondService,AlertModalService,$state,NetBondquotationService) {
		"ngInject";
		this.nowBondService = nowBondService;
		this.AlertModalService = AlertModalService;
		this.NetBondquotationService = NetBondquotationService;
		this.$state = $state;
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
		this.searchConditions = {
			creditType:"",//债券类型
			creditSymbol:"",//主体评级
			dealDate:this.tody,//处理时间
			rateType:"",//票面
			termType:"Y",//期限
			termStart:"",//期限开始
			termEnd:"",//期限结束
			pageNum:"1",//第几页
			pageSize:"50",//每一页有多少项
			orderCol:"sbjRtg",//以哪一列排序【sbjRtg主体评级】【rsdtrm	剩余期限】【yield 收益率】
			orderDirect:"desc"//desc倒序 asc正序
		};
		this.isShow =false;//显示大厅挂牌
		
	}
	$onInit(){
		this.disabledButton =false;//禁用发送按钮
		this.face = this.nowBondService.face;
		console.log(this.face)
		this.faceList =[];
		this.bondTpList =[];
		this.sbjRtgList =[];
		this.bondTp = this.nowBondService.bondTp;
		this.sbjRtg = this.nowBondService.sbjRtg;
		if(this.resolve.modalData){
			this.isShow = false ;
			this.quoteList = this.resolve['modalData']['quoteList']  ;
			if(this.quoteList[0]){

				this.drc = this.quoteList[0].drc;
				this.quoteList[0].num = this.NetBondquotationService.__n( (this.quoteList[0].num ?  this.quoteList[0].num : "0") ,true);
				this.quoteList[0].wthrAnon = this.quoteList[0].wthrAnon =='0' ? false : true;
				this.quoteList[0].yield = this.NetBondquotationService.__y(this.quoteList[0].yldrto,true);
				this.quoteList[0].netprc = this.NetBondquotationService.__p(this.quoteList[0].netprc,true);
			}
		}else{
			this.isShow =true;
			this.quoteList =[];
		}
		this.searchBonds();
		this.hideRight = true;//隐藏右侧的搜索
		this.searchList = [];
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
		this._fields = ['bondTp', 'face', 'sbjRtg'];
	}

	// 计算收益率
	yield(item,searchList){
		let that = this;
		if(item && item.bondid){
			this.yieldInfo.bondid = item.bondid;
		}else if(searchList && searchList.bondid){
			this.yieldInfo.bondid = searchList.bondid;
		}
		if(item.num){
			// item.num =item.num<0? 0: item.num;
			this.yieldInfo.dealNum = item.num;
		}
		if(item.netprc ){//净价
			// if(item.netprc>200){
			// 	item.netprc = 200;
			// 	return false;
			// }else if(item.netprc<0){
			// 	item.netprc = 0;
			// 	return false
			// }else{
				this.yieldInfo.cleanPrice = item.netprc  ;
			// }
		}
		let reg = /\./g;
		let promise = that.nowBondService.calSettlementAmountCleanPriceForCM(this.yieldInfo);
		promise.then(function(res) {
			// body...
			if(res.data.data ){
				that.netprcInfo.yield =  res.data.data.yield;
				item.yield = that.NetBondquotationService.__y(res.data.data.yield,true);
				// item.yield = item.yield >100? 100: item.yield <0 ? 0: item.yield ;
			}
		});
	}
	// 计算净价
	netprc(item,searchList){
		if(item && item.bondid){
			this.netprcInfo.bondid = item.bondid;
		}else if(searchList && searchList.bondid){
			this.netprcInfo.bondid = searchList.bondid;
		}
		if(item.num){
			this.netprcInfo.dealNum = item.num;
		}
		if(item.yield){//收益
			// if(item.yield>100){
			// 	item.yield =100;
			// 	return false;
			// }else if(item.yield <0){
			// 	item.yield =0;
			// 	return false;
			// }else{
				this.netprcInfo.yield = item.yield/100;
			// }
		}
		let reg = /\./g;
		let that = this;
		let promise = that.nowBondService.calSettlementAmountYieldForCM(that.netprcInfo);
		promise.then(function(res) {
			// body...
			if(res.data.data ){
				if(res.data.data.cleanPrice){
					that.netprcInfo.cleanPrice =  res.data.data.cleanPrice;
					item['netprc'] = that.NetBondquotationService.__p (res.data.data.cleanPrice,true);
				}
			}
		});
	}
	// 数量
	makeNum(item,index){
		item = this.trim(item+'');
		item = parseInt(item) + '';
		if(!parseInt(item)){
			item = '';
			return item;
		}
		let reg = /^[1-9]\d*$/;
		if(!item.match(reg)){
			item = item.substr(0, item.length-1);
		}

		return item;
	}
	// 去空格
	trim(str) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
	showBondShrtnm(item,index){
		this.quoteList[index].bondShrtnm = item.bondShrtnm;
	}

	ok() {
		let that = this;
		let flag = true;
		
		if(that.quoteList.length==0){
			that.AlertModalService.open({
				'tittle':'',
				'content':'请输入信息',
			});
			flag = false;
			return false;
		}
		that.quoteListChecked =[];
		angular.forEach(that.quoteList, function(item,index) {
			item['bondid'] = item['bondid'] ? item['bondid'] : '';
			item['bondCd'] = item['bondCd'] ? item['bondCd'] :'';
			item.yldrto = item.yield ?  item.yield  :'';
			that.quoteListChecked.push({
				'bondid':item.bondid,
				'bondCd':item['bondCd'],
				'drc':item.drc,
				'num':item.num,
				'yldrto':item.yldrto,
				'netprc':item.netprc,
				'wthrAnon': item.wthrAnon ,
				'wthrListg':item.wthrListg ,
				'rmrk':item.remark
			})


		});
		angular.forEach(that.quoteListChecked, function(item,index) {
			item['drc'] = that.drc ;
			item.yldrto = item.yldrto ? that.NetBondquotationService.__y(item.yldrto,false)  :'';
			item.netprc = item.netprc ? that.NetBondquotationService.__p(item.netprc,false)  :'';
			item.num = item.num ? item.num*10000  :"";
			item.wthrAnon = item.wthrAnon ==true? '1' : item.wthrAnon ==false ? '0' : "1";
			item.wthrListg =item.wthrListg ==true? '1'  :  item.wthrListg ==false ? '0' : "1" ;
			item.bondid = that.quoteList[index].bondid ? that.quoteList[index].bondid :that.quoteList[index].bondCd.bondid;
			item.bondCd = that.quoteList[index].bondCd.bondCd ? that.quoteList[index].bondCd.bondCd :that.quoteList[index].bondCd;
			if(!item.bondid  ){
				that.AlertModalService.open('错误信息','债券代码或者简称 不能为空');
				flag = false;
				return false;
			}
			if(item.num==''   || item.num<0){
				that.AlertModalService.open('错误信息','数量不能为空，且大于0');
				flag = false;
				return false;
			}
			if(item.yldrto=='' || item.yldrto<0 || item.yldrto>100){
				that.AlertModalService.open('错误信息','收益率0至100');
				flag = false;
				return false;
			}
			if(item.netprc=='' ||  item.netprc<0 || item.netprc>200){
				that.AlertModalService.open('错误信息','净价0至200');
				flag = false;
				return false;
			}
			// item['drc'] = that.drc ;
			// item.yldrto = item.yldrto ? that.NetBondquotationService.__y(item.yldrto,false)  :'';
			// item.netprc = item.netprc ? that.NetBondquotationService.__p(item.netprc,false)  :'';
			// item.num = item.num ? item.num*10000  :"";
			// item.wthrAnon = item.wthrAnon ==true? '1' : item.wthrAnon ==false ? '0' : "1";
			// item.wthrListg =item.wthrListg ==true? '1'  : item.wthrListg =='0' ? "1"  : item.wthrListg ==false ? '0' : "1" ;
			// item.bondid = that.quoteList[index].bondid ? that.quoteList[index].bondid :that.quoteList[index].bondCd.bondid;
			// item.bondCd = that.quoteList[index].bondCd.bondCd ? that.quoteList[index].bondCd.bondCd :that.quoteList[index].bondCd;
		});
		if(flag){
			that.disabledButton = true;
			let promise = that.nowBondService.addBatchBondQuote(that.quoteListChecked );
			promise.then((res)=>{
				if(res.data.status=="0"){
					// that.searchList = data.data.data;
					that.AlertModalService.open(null,'操作成功');
					that.modalInstance.close();
					that.$state.go('home.bondquotation',{}, {reload: true});
				}else{
					let msg =res.data? res.data.msg : res.msg
					that.AlertModalService.open(null,msg);
				}
				that.disabledButton =false;
			},(res)=>{});
		}
		// else{
		// 	that.AlertModalService.open({
		// 		'tittle':'',
		// 		'content':'请输入完整信息',
		// 	});
		// }
	}
	cancel() {
		this.modalInstance.dismiss('cancel');
	}
	show(){
		this.hideRight = !this.hideRight;//隐藏右侧的搜索
	}
	searchBonds(){
		this.beforSaveScmInfo();
		this.searchConditions['rateType'] = this.makeSelect(this.face.data);
		let promise = this.nowBondService.searchBonds(this.searchConditions);
		promise.then((data)=>{
			if(data.data.status==="0"){
				this.searchList = data.data.data;
			}
		});
	}
	delete(index){
		this.quoteList.splice(index,1);
	}
	deleteRemark(item){
		if(item['remark'].length>=50){
			item.remark = item.remark.substr(0,50);
		}
	}
	addQuote(item1){
		let obj = angular.extend({}, item1);
		if(obj && this.quoteList.indexOf(obj)=='-1'){
			obj.wthrAnon=true;
			obj.wthrListg=true;
			this.quoteList.push(obj);
			if(obj.yield){
				obj.yield = this.NetBondquotationService.__y( obj.yield, true);
				this.netprc(obj,obj);
			}
			this.customSelected = obj;
		}
		else{
			let tmpItem = {
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
			if(this.quoteList.indexOf(tmpItem)=="-1"){
				this.quoteList.push(tmpItem);
			}
		}
	}
	onTitleClick(orderName){
		if(this.searchConditions['orderCol'] ==orderName){
			this.searchConditions['orderDirect'] =this.searchConditions['orderDirect'] =='desc' ? 'asc':'desc';
		}
		this.searchConditions['orderCol'] = orderName;
		this.searchBonds();
	}
	// 获取下拉 信息 年份 地区 行业
	bondTpFn(val){
		this.bondTp = val;
	}
	faceFn(val){
		this.face = val;
	}
	sbjRtgFn(val){
		this.sbjRtg['data'] = val;
	}
	makeSelect(obj){
		let newArr =[];
		for(let item of obj){
			// debugger
			if(item['checked']){
				newArr.push(item['id']);
				// for(let key2 of key['children']){
				// 	if(key2['checked']){
				// 		newArr.push(key2['id'])
				// 	}
				// }
			}
		}
		// newArr.join(',');
		return newArr.join(',');
	}
	initSelect(obj){
		for(let key of obj.data){
			if(key['checked']){
				key['checked'] =false;
				// for(let key2 of key['children']){
				// 	if(key2['checked']){
				// 		key2['checked'] = false;
				// 	}
				// }
			}
		}
		return obj;
	}
	// 债券搜索   模糊查询
	queryQuote(val){
		let promise = this.nowBondService.searchBondBreed({'keyword': val});
		return promise.then(function(res) {
			if(res.data.data ){
				return res.data.data;
			}
		});

	}
	/**
	 * 保存之前处理数据
	 * @return {[type]} [description]
	 */
	beforSaveScmInfo(){
		var valueArray = [];
		if (this.searchConditions['rgonSelecteds']) {
			valueArray = _.map(this.searchConditions['rgonSelecteds'], 'id');
			this.searchConditions['rgon'] = valueArray.join(',');
		};
		if (this.searchConditions['yrSelecteds']) {
			valueArray = _.map(this.searchConditions['yrSelecteds'], 'id');
			this.searchConditions['yr'] = valueArray.join(',');
		}else{
			this.searchConditions['yr'] = '';
		};
		if (this.searchConditions['idySelecteds']) {
			valueArray = _.map(this.searchConditions['idySelecteds'], 'id');
			this.searchConditions['idy'] = valueArray.join(',');
		};

		console.log(this.searchConditions, 'beforSaveScmInfo');
	}

	// 期限单位 D Y
	changeStatus(ev){
		this.isActive = true;
		if(this.searchConditions.termType =="D"){
			this.searchConditions.termType ="Y";
		}else{
			this.searchConditions.termType ="D";
		}
	}
	toDetail(item){
		this.modalInstance.dismiss('cansel');
		this.$state.go('home.acoupondetails',{bondid:(item.bondid)})
	}
}

