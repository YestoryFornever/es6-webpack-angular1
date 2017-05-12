class BondDstrMainController {
	constructor(
		$http,
		$scope,
		$rootScope,
		$state,
		$uibModal,
		transferService,
		BondDstrMainService,
		easeMobService,
		FriendsModalService,
		userStatusService,
		DstrMainHistoryService,
		ProxyRequestService,
		AlertModalService,
		pagetabService,
		$stateParams
	){
		"ngInject";
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.$uibModal = $uibModal;
		this.transferService = transferService;
		this.BondDstrMainService = BondDstrMainService;
		this.easeMobService = easeMobService;
		this.FriendsModalService = FriendsModalService;
		this.userStatusService = userStatusService;
		this.DstrMainHistoryService = DstrMainHistoryService;
		this.ProxyRequestService = ProxyRequestService;
		this.AlertModalService = AlertModalService;
		this.pagetabService = pagetabService;
		this.$stateParams = $stateParams;


		this.name = 'bond-dstr-main';
		this.single = '';//'115202';
		this.multiple = [];//['115202','108701'];
		this.pubReportData = {};
		this.subSttstcs = {
			/*am:'3.3',
			mm:'2.1',
			my:'0.044',
			tet:new Date().getTime()*/
		};
		this.cusSttstcs = {};
		this.leader = {//当前团队负责人
			userId:"",//this.userStatusService.uid,
			userNm:""//this.userStatusService.userName
		};
		this.tabFlag = 'm';
		this.bools={
			showMineTable:false
		}
		this.ids = {
			issuId:'',
			dstrBondId:'',
			trm:'',
			enqrTp:''
		};
		this.getState();
		this.mine = {
			fields:[],
			query:{},
			items:[],
			curItemIndex:0,
			emptyObj:{
				createTime:new Date,
				dlvTp:"1",//交割方式(1上市2分销)
				rcptySbrbEStatus:"4",
				rcptyUserNm:this.userStatusService.userName,
				rmrk:"",//备注
				sbrbChnl:"4",//申购渠道(1平台2QQ3微信4录入)
				sbrbIntrt:"",//4.5,//票面利率(单位0.01)
				cprsvPftIntrt:"",//60.01,
				retFee:this.ids.trm>=360?0.1:0.1*this.ids.trm/360,//"",
				sbrbNum:"",//0.1,//申购量(单位元)
				sellrMod:"2",//销售方式(1折返2单反)
				sndrInstId:undefined,//发送方机构id
				sndrInstNm:"",//发送方机构
				sndrTeamId:undefined,//发送方团队id
				sndrTeamNm:"",//发送方团队
				sndrUserId:undefined,//发送方用户id
				sndrUserNm:"",//发送方用户
				name:""
			}
		};
		this.lists = {
			fields:[],
			query:{},
			items:[],
			page:{},
			curItemIndex:0
		};
		this.mineB = {
			fields:[],
			query:{},
			items:[],
			curItemIndex:0,
			showMineTable:false,
			emptyObj:{
				createTime:new Date,
				dlvTp:1,//交割方式(1上市2分销)
				rcptySbrbEStatus:4,
				rcptyUserNm:this.userStatusService.userName,
				rmrk:"",//备注
				sbrbChnl:1,//申购渠道(1平台2QQ3微信4录入)
				sbrbIntrt:"",//0.01,//利率(单位0.01)
				cprsvPftIntrt:"",//60.01,
				retFee:this.ids.trm>=360?0.1:0.1*this.ids.trm/360,//"",
				sbrbNum:"",//1000000,//申购量(单位元)
				sellrMod:1,//销售方式(1折返2单反)
				sndrInstId:undefined,//发送方机构id
				sndrInstNm:"",//发送方机构
				sndrTeamId:undefined,//发送方团队id
				sndrTeamNm:"",//发送方团队
				sndrUserId:undefined,//发送方用户id
				sndrUserNm:"",//发送方用户
				name:""
			}
		};
		this.listsB = {
			fields:[],
			query:{},
			items:[],
			page:{},
			curItemIndex:0,
			enabledSend:true
		};
		this.msgStatistics = {
			total:0,
			/*_114501:1,
			_5206:2,
			_5301:3,
			_5302:4,
			_5304:5,
			_5501:6*/
		};
		this.chatSingle = true;
		this.clsbidbtn = {
			label:'立即截标',
			enable:true
		}
		this.$scope.$on('refresh-cust-sbrb',(event,args)=>{
			this.getCustSbrbStat();
			this.getCustSbrbList();
		});
	}
	test(){
		console.log('test');
	}
	$onInit(){
		let tmpurl = this.exportExcelUrl||`e-bonddstr/bonddstr/exportPrimUdwrCustSbrbList?
			dstrBondId=${this.ids.dstrBondId}&issuId=${this.ids.issuId}&userId=${this.userStatusService.uid}`;
		this.download = this.ProxyRequestService._prefix+tmpurl+"&timestamp="+(new Date).getTime();
		this.getPnp();
		this.getBondSbrbStat();
		this.getCustSbrbStat();
		this.initListAD();
		this.initListA();
		this.initListBD();
		this.initListB();

		this.pagetabService.activeTab({
			tabKey: 'home.newdebtinformationdetails',
			routeState: this.$state.$current.name,
			routeParams: angular.copy(this.$stateParams),
		});
	}
	getBondSbrbStat(){//获取债券申购统计4.3.1
		this.BondDstrMainService.getBondSbrbStat({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId
		}).then(
			data=>{
				let rslt = data.data.data;
				this.subSttstcs = {
					am:rslt.whlTmsNum,
					mm:rslt.bdyTmsNum,
					my:rslt.bdyIntrt,
					tet:this.transferService.dater(new Date(rslt.clsbidTmL)),
				};
				if(rslt.beforeDeadLine=='1'){	
					this.clsbidbtn = {
						label:'立即截标',
						enable:true
					}
				}else if(rslt.beforeDeadLine=='2'){
					this.clsbidbtn = {
						label:'恢复申购',
						enable:true
					}
				}else if(rslt.beforeDeadLine=='3'){
					this.clsbidbtn = {
						label:'申购截止',
						enable:false
					}
				}
			},
			err=>console.warn(err)
		);
	}
	clsbidFn(){
		if(this.clsbidbtn.label=='立即截标'){
			this.immClsBid();
		}else{
			this.rsmSbrb();
		}
	}
	immClsBid(){//立即截标4.3.4
		this.AlertModalService.open('立即截标', '点击确定立即截止申购，您将不会再收到其他用户的申购信息' ,true)
		.then((res)=>{
			this.BondDstrMainService.immClsBid({
				issuId:this.ids.issuId,
				dstrBondId:this.ids.dstrBondId
			}).then(
				data=>{
					if(data.data.status=='0'){
						alert(data.data.msg);
						let rslt = data.data.data;
						this.getBondSbrbStat();
					}
				},
				err=>console.warn(err)
			);
		});
	}
	rsmSbrb(){//恢复申购
		this.pubReportData = {
			ids:this.ids
		};
		let that = this;
		var modalInstance = that.$uibModal.open({
			animation: true,
			component:'restorePurchase',
			windowClass:'restore-purchase',
			size: 'g lg',//'sm',
			resolve: {
				modalData:function(){
					return that.pubReportData;
				}
			}
		}).result.then(res=>{
			this.subSttstcs = res;
			this.getBondSbrbStat();
		}, ()=>{
			console.info('恢复申购窗口关闭');
		});
	}
	getCustSbrbStat(){//获取客户申购统计4.3.5
		this.BondDstrMainService.getCustSbrbStat({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
		}).then(
			data=>{
				let rslt = data.data.data;
				this.cusSttstcs = {
					sbrbTnum:rslt.sbrbTnum,
					bdyIntrt:rslt.bdyIntrt,//客户申购边际利率
					whlTmsNum:rslt.whlTmsNum,//全场倍数
					bdyTmsNum:rslt.bdyTmsNum,//边际倍数
					sbrbIntrt:(rslt.sbrbIntrtLwrLmt||"-")+"-"+(rslt.sbrbIntrtUpLm||"")//客户申购利率下限
				}
			},
			err=>console.warn(err)
		);
	}
	getCustSbrbListFn(pageNum='1',pageSize='20'){//获取客户申购列表
		return this.BondDstrMainService.getCustSbrbList({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			pageNum:pageNum,
			pageSize:pageSize
		});
	}
	getCustSbrbList(pageNum='1',pageSize='20'){//获取客户申购列表
		this.getCustSbrbListFn(pageNum,pageSize).then(
			data=>{
				let rslt = data.data.data;
				console.log(rslt);
				this.lists.items = rslt.list.map(item=>{
					item.checked=false;
					item.dlvTp=""+item.dlvTp;
					item.sellrMod=""+item.sellrMod;
					item.rcptySbrbEStatus=""+item.rcptySbrbEStatus;
					return item;
				});
				this.lists.items.CUST = this;
				this.lists.page = rslt.page;
			},
			err=>console.warn(err)
		);
	}
	getSndrInstTeamUserList(val){
		return this.BondDstrMainService.getSndrInstTeamUserList({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			enqrVal:val||null
		}).then(data=>{
				let rslt = data.data.data;
				return rslt;
			},
			err=>console.warn(err)
		);
	}
	updateCustSbrb(item){
		if(this.rhinoceros === event.target.value)return;
		let params = {
			sbrbId:item.sbrbId,
			sndrInstId:item.sndrInstId,
			sndrTeamId:item.sndrTeamId,
			sndrUserId:item.sndrUserId,
			sbrbIntrt:item.sbrbIntrt,
			sbrbNum:item.sbrbNum,//this.transferService.integers(item.sbrbNum,8),
			cprsvPftIntrt:item.cprsvPftIntrt,
			retFee:item.retFee,
			dlvTp:item.dlvTp,
			sellrMod:item.sellrMod,
			rmrk:item.rmrk
		};
		this.BondDstrMainService.updateCustSbrb({
			bondSbrbVOList:new Array(params)
		}).then(
			data=>{
				let rslt = data.data;
				if(rslt.status==="0"){
					console.info(rslt.msg);
					this.getCustSbrbStat();
				}
			},
			err=>console.warn(err)
		);
	}
	whlAlrdyRead(){//4.3.11	全部已读*
		this.AlertModalService.open('全部已读', '是否确认将全部消息设置为已读？' ,true)
		.then((res)=>{
			this.BondDstrMainService.whlAlrdyRead({
				issuId:this.ids.issuId,
				dstrBondId:this.ids.dstrBondId,
			}).then(
				data=>{
					let rslt = data.data;
					if(rslt.status==="0"){
						alert(rslt.msg);
						this.getCustSbrbStat();
						this.getCustSbrbList();
						this.bondallocationlist();
					}
				},
				err=>console.warn(err)
			);
		});
	}
	updateCustSbrbEstatus(item){//4.3.12	更新客户申购状态
		if(item.rcptySbrbEStatus=='7'){
			let con = confirm("点击拒绝将拒绝对方本次全部报价");
			if(con){
				this.BondDstrMainService.updateCustSbrbEstatus({
					sbrbId:item.sbrbId,
					rcptySbrbEStatus:item.rcptySbrbEStatus,
				}).then(
					data=>{
						let rslt = data.data;
						console.info(rslt.msg);
						if(rslt.status==="0"){
							this.getCustSbrbStat();
							this.getCustSbrbList();
							this.bondallocationlist();
						}
					},
					err=>{
						console.warn(err);
					}
				);
			}else{
				item.rcptySbrbEStatus=this.rhinoceros;
			}
		}else{
			this.BondDstrMainService.updateCustSbrbEstatus({
				sbrbId:item.sbrbId,
				rcptySbrbEStatus:item.rcptySbrbEStatus,
			}).then(
				data=>{
					let rslt = data.data;
					console.info(rslt.msg);
					if(rslt.status==="0"){
						this.getCustSbrbStat();
						this.getCustSbrbList();
						this.bondallocationlist();
					}
				},
				err=>{
					console.warn(err);
				}
			);
		}
	}
	alctWinBid(item){
		if(this.rhinoceros == event.target.value)return;
		item.winbidSndEStatus='1';
		item.winbidNum = event.target.value;
		/*this.listsB.items.forEach((item)=>{
			let x = item.winbidNum;
			item.winbidNum = 0;
			this.$scope.$apply(()=>{
				item.winbidNum = x;
			});
		});*/
		//item.winbidSndEStatus=this.rhinoceros == event.target.value?'2':'1';
		/*this.AlertModalService.open('中标分配', '更改中标状态后系统将不保证中标分配数据准确' ,true)
		.then((res)=>{
			if(item.winbidSndEStatus == '2'){//当且仅当该项已发送且值发生变动时调用该方法
				this.BondDstrMainService.alctWinBid({
					sbrbId:item.sbrbId,
					winbidEStatus:item.winbidEStatus,
					winbidNum:item.winbidNum
				}).then(
					data=>{
						let rslt = data.data;
						console.info(rslt.msg);
						if(rslt.status==="0"){
							this.bondallocationlist();
						}
					},
					err=>console.warn(err)
				);
			}
		});*/
	}
	sendAllWinbidList(){
		/*let arr = this.listsB.items.map(item=>{
			item.winbidSndEStatus='2';
			return item;
		});*/
		this.BondDstrMainService.sendAllWinbidList({
			bondSbrbVOList:this.listsB.items
		}).then(
			data=>{
				let rslt = data.data;
				console.info(rslt.msg);
				if(rslt.status==="0"){
					this.bondallocationlist();
				}
			},
			err=>console.warn(err)
		);
	}
	sendPartWinbidList(item){
		if(this.leader.userId!=this.userStatusService.uid){
			alert('只有负责人才能进行中标分配');
			return;
		}
		let arr = this.listsB.items.map(t=>{
			if(item.sbrbId==t.sbrbId){
				// console.log(t.winbidEStatus,item.winbidEStatus);
				t.winbidSndEStatus = '2';
			}
			return t;
		});
		this.BondDstrMainService.sendPartWinbidList({
			bondSbrbVOList:arr
		}).then(
			data=>{
				let rslt = data.data;
				console.info(rslt.msg);
				if(rslt.status==="0"){
					this.bondallocationlist();
				}
			},
			err=>{
				console.warn(err);
			}
		);
	}
	bondallocationlistFn(pageNum='1',pageSize='20'){//获取中标结果列表
		return this.BondDstrMainService.bondallocationlist({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			/*pageNum:pageNum,
			pageSize:pageSize*/
		});
	}
	bondallocationlist(pageNum='1',pageSize='20'){//获取中标结果列表
		this.bondallocationlistFn(pageNum,pageSize).then(
			data=>{
				let rslt = data.data.data;
				this.listsB.items = rslt.list;
				this.listsB.items = rslt.list.map(item=>{
					item.dlvTp = ""+item.dlvTp;
					item.sellrMod = ""+item.sellrMod;
					item.rcptySbrbEStatus = ""+item.rcptySbrbEStatus;
					item.winbidEStatus = ""+item.winbidEStatus;
					item.MYwinbidNum = Number(item.winbidNum||0)+Number(item.remainNum||0);
					return item;
				});
				this.listsB.items.CUST = this;
				this.listsB.page = rslt.page;
				this.listsB.enabledSend = this.listsB.items.some(item=>{
					return item.winbidEStatus!="undefined";
				});
			},
			err=>console.warn(err)
		);
	}
	exportPrimUdwrCustSbrbList(){
		var params = {
			dstrBondId: this.ids.dstrBondId,
			issuId: this.ids.issuId,
		};
		this.BondDstrMainService.exportPrimUdwrCustSbrbList(params).then(function (data) {
			console.log(data, "导出");
		}, function (err) {
			console.warn(err)
		});
	}
	//公共部分
	getPnp(){//获取负责人
		this.BondDstrMainService.getPnp({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
		})
		.then(
			data=>{
				let rslt = data.data.data;
				this.leader = rslt;
			},
			err=>{
				console.warn(err)
			}
		);
	}
	updatePnp(){//更新负责人
		this.BondDstrMainService.updatePnp({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
		})
		.then(
			data=>{
				alert(data.data.msg);
				this.leader = {
					userId:this.userStatusService.uid,
					userNm:this.userStatusService.userName
				};
			},
			err=>console.warn(err)
		);
	}
	clcCprsvPftIntrt(item){
		// debugger;
		this.BondDstrMainService.clcCprsvPftIntrt({
			sbrbIntrt:item.sbrbIntrt,
			retFee:item.retFee,
			trm:this.ids.trm||120
		}).then(data=>{
				let rslt = data.data.data;
				console.log(rslt);
				item.cprsvPftIntrt = rslt;
			},
			err=>console.warn(err)
		);
	}
	clcSbrbIntrt(item){
		// debugger;
		this.BondDstrMainService.clcSbrbIntrt({
			cprsvPftIntrt:item.cprsvPftIntrt,
			retFee:item.retFee,
			trm:this.ids.trm||120
		}).then(data=>{
				let rslt = data.data.data;
				console.log(rslt);
				item.sbrbIntrt = rslt;
			},
			err=>console.warn(err)
		);
	}
	deleteRcptySbrb(item){
		this.AlertModalService.open('删除申购', '确定删除该申购信息？' ,true)
		.then((res)=>{
			this.BondDstrMainService.deleteRcptySbrb({
				sbrbId:item.sbrbId,
			}).then(data=>{
					let rslt = data.data.data;
					if(data.data.status=='0'){
						this.getCustSbrbStat();
						this.getCustSbrbList();
					}
					console.log(rslt);
				},
				err=>console.warn(err)
			);
		});
	}
	publishSubscribe(){//发布
		this.pubReportData = {
			ids:this.ids
		};
		let that = this;
		var modalInstance = that.$uibModal.open({
			animation: true,
			component:'pubReportDialog',
			windowClass:'pub-report-dialog',
			size: 'g lg',//'sm',
			resolve: {
				modalData:function(){
					return that.pubReportData;
				}
			}
		}).result.then(res=>{
			this.subSttstcs = res;
			console.info('发布申购窗口关闭');
			this.getBondSbrbStat();
		}, ()=>{
			console.info('发布申购窗口关闭');
		});
	}
	transferFriends(){
		this.FriendsModalService.open((friend,group)=>{
			this.easeMobService.sendMsg('asdf',undefined,friend.oppositeUserId);
		});
	}
	/***/
	trClick(item,index){
		item.checked = !item.checked;
		let userid = Number(item.sndrUserId);
		this.single = userid;
		if(item.checked){
			!this.multiple.includes(userid) && this.multiple.push(userid);
			this.lists.items.forEach(it=>{
				if(it.sndrUserId==userid)it.checked=true;
			});
		}else{
			this.lists.items.forEach(it=>{
				if(it.sndrUserId==userid)it.checked=false;
			});
			let tmparr = this.lists.items.filter(item=>{
				return item.checked;
			}).map(item=>item.sndrUserId);
			this.multiple = [...new Set(tmparr)];
		}
		//如果是新消息,改为已读
		if(item.rcptySbrbEStatus=='3'){
			this.BondDstrMainService.updateCustSbrbEstatus({
				sbrbId:item.sbrbId,
				rcptySbrbEStatus:'4',
			}).then(
				data=>{
					let rslt = data.data;
					console.info(rslt.msg);
					if(rslt.status==="0"){
						this.getCustSbrbStat();
						this.getCustSbrbList();
						this.bondallocationlist();
					}
				},
				err=>{
					console.warn(err);
				}
			);
		}
		if(item.rcptyNewMsgInd=='1'){
			this.BondDstrMainService.updateRcptyNewMsgInd({
				sbrbId:item.sbrbId,
			}).then(
				data=>{
					let rslt = data.data;
					console.info(rslt.msg);
					if(rslt.status==="0"){
						this.getCustSbrbStat();
						this.getCustSbrbList();
						this.bondallocationlist();
					}
				},
				err=>{
					console.warn(err);
				}
			);
		}
	}
	trDbclick(item,index){
		// debugger;
		this.DstrMainHistoryService.open(item.sndrTeamId,item.rcptyTeamId);
	}
	toggleMsgTab(key){
		this.tabFlag=key;
		if('b'==key)
			this.bondallocationlist();
	}
	getState(){
		this.ids.dstrBondId = this.$state.params.dstrBondId;
		this.ids.issuId = this.$state.params.issuId;
		this.ids.trm = this.$state.params.trm;
		this.ids.enqrTp = this.$state.params.enqrTp;
		this.ids.issuNum = this.$state.params.issuNum;
	}
	inputFocus(){
		this.rhinoceros = event.target.value;
	}
	selectRequisitioner(item,index,key){
		let tmp;
		switch(key){
			case 'AD':tmp=this.mine;break;
			case 'A':
				tmp=this.lists;
				break;
			case 'BD':tmp=this.mineB;break;
			case 'B':tmp=this.listsB;break;
		}
		tmp.items[tmp.curItemIndex].sndrInstId = item.instId;
		tmp.items[tmp.curItemIndex].sndrInstNm = item.instNm;
		tmp.items[tmp.curItemIndex].sndrNm = item.name;
		tmp.items[tmp.curItemIndex].sndrTeamId = item.teamId;
		tmp.items[tmp.curItemIndex].sndrTeamNm = item.teamNm;
		tmp.items[tmp.curItemIndex].sndrUserId = item.userId;
		tmp.items[tmp.curItemIndex].sndrUserNm = item.userNm;
		if(key=="A"||key=="B"){
			this.updateCustSbrb(tmp.items[tmp.curItemIndex]);
		}
	}
	mineTableInit(){
		this.bools.showMineTable = true;
		switch(this.tabFlag){
			case 'm':
				if(this.mine.items.length<1){
					this.addNewRow();
				}
				break;
			case 'b':
				if(this.mineB.items.length<1){
					this.addNewRow();
				}
				break;
		}
	}
	addNewRow(){
		switch(this.tabFlag){
			case 'm':
				this.mine.items.push(angular.copy(this.mine.emptyObj));
				break;
			case 'b':
				this.mineB.items.push(angular.copy(this.mineB.emptyObj));
				break;
		}
	}
	validate(val,key,...more){
		switch(key){
			case '1':
				if(!/^\d+([.]\d{0,4})?$/.test(val)){
					return '只能输入数字和小数点，最多4位小数';
				}
				break;
			case '2':
				if(!/^\d+([.]\d{0,4})?$/.test(val)){
					return '只能输入数字和小数点，最多4位小数';
				}
				break;
			case '3':
				if(!/^\d+([.]\d{0,4})?$/.test(val)){
					return '只能输入数字和小数点，最多4位小数';
				}
				break;
			case '4':
				if(!/^\d+([.]\d{0,2})?$/.test(val)){
					return '只能输入数字和小数点，最多2位小数';
				}
				break;
			case 'winbidNum':
				let count = this.listsB.items.reduce((rslt,item)=>{
					return (more[0].sbrbId==item.sbrbId)?rslt:(rslt+Number(item.winbidNum||0));
				},0)+Number(val);
				if(count>this.ids.issuNum){//count>发行量
					// item.winbidNum = this.rhinoceros;
					return '超出发行量';
				}
				break;
		}
	}
	initListAD(){
		this.mine.items.CUST = this;
		this.mine.fields = [
			{
				label: '',
				tdClass:'td-class-1',
				thClass:'th-class-1',
				template: '<span></span>',
			},
			{
				label: '申购人',
				tdClass:'td-class-2',
				thClass:'th-class-2',
				template: `
					<span tooltip-placement="bottom"
						uib-tooltip="{{$item.name.name}}">
						<input
							ng-model="$item.name"
							uib-typeahead="item as item.name for item in items.CUST.getSndrInstTeamUserList($viewValue)"
							typeahead-template-url="templates/requisitioner.html"
							typeahead-on-select = "items.CUST.selectRequisitioner($item,$index,'AD')"
							placeholder="" type="text"/>
					</span>`,
				/*tdClick: function($item,ev){
					console.log($item);
				}*/
			},
			{
				label: '票面(%)',
				tdClass:'td-class-3',
				thClass:'th-class-3',
				template: `<span>
					<input ng-change="items.CUST.clcCprsvPftIntrt($item)" ng-model="$item.sbrbIntrt"
						ng-disabled="$item.sellrMod=='1'"
						validation-tooltip="items.CUST.validate($value,'1')"/>
				</span>`,
			},
			{
				label: '综收(%)',
				tdClass:'td-class-31',
				thClass:'th-class-31',
				template: `<span>
					<input ng-change="items.CUST.clcSbrbIntrt($item)" ng-model="$item.cprsvPftIntrt"
						ng-disabled="$item.sellrMod=='2'"
						validation-tooltip="items.CUST.validate($value,'2')"/>
				</span>`,
			},
			{
				label: '返费(元)',
				tdClass:'td-class-32',
				thClass:'th-class-32',
				template: `<span><input ng-model="$item.retFee"
					validation-tooltip="items.CUST.validate($value,'3')"/></span>`,
			},
			{
				label: '申购量(亿)',
				tdClass:'td-class-4',
				thClass:'th-class-4',
				template: `<span><input ng-model="$item.sbrbNum"
					validation-tooltip="items.CUST.validate($value,'4')"/></span>`,
			},
			{
				label: '交割方式',
				tdClass:'td-class-5',
				thClass:'th-class-5',
				template: `
					<span>
						<select ng-model="$item.dlvTp" name="dlvTp">
							<option value="1" ng-selected="$item.dlvTp=='1'">上市</option>
							<option value="2" ng-selected="$item.dlvTp=='2'">分销</option>
						</select>
					</span>`,
			},
			{
				label: '销售方式',
				tdClass:'td-class-6',
				thClass:'th-class-6',
				template: `
					<span>
						<select 
							ng-model="$item.sellrMod" name="sellrMod">
							<option value="1" ng-selected="$item.sellrMod=='1'">折价</option>
							<option value="2" ng-selected="$item.sellrMod=='2'">单返</option>
						</select>
					</span>`,
			},
			{
				label: '申购状态',
				tdClass:'td-class-7',
				thClass:'th-class-7',
				template: `<span>{{$item.rcptySbrbEStatus|applicationState}}</span>`,
			},
			{
				label: '申购渠道',
				tdClass:'td-class-8',
				thClass:'th-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'td-class-9',
				thClass:'th-class-9',
				template: '<span>{{$item.createTime|date:"MM-dd HH:mm"}}</span>',
			},
			{
				label: '联系人',
				tdClass:'td-class-10',
				thClass:'th-class-10',
				template: '<span>{{$item.rcptyUserNm}}</span>',
			},
			{
				label: '备注',
				tdClass:'td-class-11',
				thClass:'th-class-11',
				template: `<span tooltip-placement="bottom"
						uib-tooltip="{{$item.rmrk}}">
					<input ng-model="$item.rmrk"/>
				</span>`,
			},
			{
				label: '',
				tdClass:'td-class-12',
				thClass:'th-class-12',
				template: '<span></span>',
			},
			{
				label: '',
				tdClass:'td-class-13',
				thClass:'th-class-13',
				template: '<span></span>',
			}
		];
	}
	initListA(){
		let self = this;
		this.lists.items.CUST = this;
		this.lists.fields = [
			{
				label: '',
				tdClass:'td-class-1',
				thClass:'th-class-1',
				template: `<span>
					<img ng-if="$item.rcptyNewMsgInd=='1'" src="images/tag_new01.png" alt="">
				</span>`,
			},
			{
				label: '申购人',
				tdClass:'td-class-2',
				thClass:'th-class-2',
				//thNgHide:function(){return false? true : false;},
				template: `
					<span class="ellipsis" ng-if="$item.sbrbChnl!='4'" 
						tooltip-placement="bottom"
						uib-tooltip="{{$item.sndrInstNm}}-{{$item.sndrTeamNm}}-{{$item.sndrUserNm}}">
						{{$item.sndrInstNm}}-{{$item.sndrTeamNm}}-{{$item.sndrUserNm}}
					</span>
					<span ng-if="$item.sbrbChnl=='4'" tooltip-placement="bottom"
						uib-tooltip="{{$item.sndrNm}}">
						<input ng-model="$item.sndrNm"
							uib-typeahead="item as item.name for item in items.CUST.getSndrInstTeamUserList($viewValue)"
							typeahead-template-url="templates/requisitioner.html"
							typeahead-on-select = "items.CUST.selectRequisitioner($item,$index,'A')"
							placeholder="" type="text"/>
					</span>`,
				//thClick: function(){},
				//thNgClass: function($item){return {}},
				//tdClick: function($item,ev){}
			},
			{
				label: '票面(%)',
				tdClass:'td-class-3',
				thClass:'th-class-3',
				template: `
					<span ng-if="$item.sbrbChnl!='4'">{{$item.sbrbIntrt|addTwoLine}}</span>
					<span ng-if="$item.sbrbChnl=='4'">
						<input ng-focus="items.CUST.inputFocus()"
							ng-model="$item.sbrbIntrt" 
							ng-change="items.CUST.clcCprsvPftIntrt($item)"
							ng-blur="items.CUST.updateCustSbrb($item)"
							ng-disabled="$item.sellrMod=='1'"
							validation-tooltip="items.CUST.validate($value,'1')"/>
					</span>
				`,
			},
			{
				label: '综收(%)',
				tdClass:'td-class-31',
				thClass:'th-class-31',
				template: `<span ng-if="$item.sbrbChnl!='4'">{{$item.cprsvPftIntrt|addTwoLine}}</span>
					<span ng-if="$item.sbrbChnl=='4'">
						<input ng-focus="items.CUST.inputFocus()"
							ng-model="$item.cprsvPftIntrt"  
							ng-change="items.CUST.clcSbrbIntrt($item)"
							ng-blur="items.CUST.updateCustSbrb($item)"
							ng-disabled="$item.sellrMod=='2'"
							validation-tooltip="items.CUST.validate($value,'2')"/>
					</span>`,
			},
			{
				label: '返费(元)',
				tdClass:'td-class-32',
				thClass:'th-class-32',
				template: `<span ng-if="$item.sbrbChnl!='4'">{{$item.retFee|addTwoLine}}</span>
					<span ng-if="$item.sbrbChnl=='4'">
						<input ng-model="$item.retFee" ng-focus="items.CUST.inputFocus()"
							ng-blur="items.CUST.updateCustSbrb($item)"
							validation-tooltip="items.CUST.validate($value,'3')"/>
					</span>`
			},
			{
				label: '申购量(亿)',
				tdClass:'td-class-4',
				thClass:'th-class-4',
				template: `<span ng-if="$item.sbrbChnl!='4'">{{$item.sbrbNum}}</span>
					<span ng-if="$item.sbrbChnl=='4'">
						<input ng-focus="items.CUST.inputFocus()"
							ng-model="$item.sbrbNum" 
							ng-blur="items.CUST.updateCustSbrb($item)"
							validation-tooltip="items.CUST.validate($value,'4')"/>
					</span>`,
			},
			{
				label: '交割方式',
				tdClass:'td-class-5',
				thClass:'th-class-5',
				template: `<span ng-if="$item.sbrbChnl!='4'">{{$item.dlvTp|applicationTransaction}}</span>
					<span ng-if="$item.sbrbChnl=='4'">
						<select ng-model="$item.dlvTp" name="dlvTp" 
							ng-change="items.CUST.updateCustSbrb($item)">
							<option value="1" ng-selected="$item.dlvTp=='1'">上市</option>
							<option value="2" ng-selected="$item.dlvTp=='2'">分销</option>
						</select>
					</span>`,
			},
			{
				label: '销售方式',
				tdClass:'td-class-6',
				thClass:'th-class-6',
				template: `
					<span ng-if="$item.sbrbChnl!='4'">{{$item.sellrMod|applicationSale}}</span>
					<span ng-if="$item.sbrbChnl=='4'">
						<select ng-model="$item.sellrMod" name="sellrMod" 
							ng-change="items.CUST.updateCustSbrb($item)">
							<option value="1" ng-selected="$item.sellrMod=='1'">折价</option>
							<option value="2" ng-selected="$item.sellrMod=='2'">单返</option>
						</select>
					</span>`,
			},
			{
				label: '申购状态',
				tdClass:'td-class-7',
				thClass:'th-class-7',
				template: `
					<span ng-if="(($item.rcptySbrbEStatus!='3')&&($item.rcptySbrbEStatus!='4'))||($item.sbrbChnl=='4')">{{$item.rcptySbrbEStatus|applicationState}}</span>
					<span ng-if="($item.rcptySbrbEStatus=='3'||$item.rcptySbrbEStatus=='4')&&($item.sbrbChnl!='4')">
						<select ng-focus="items.CUST.inputFocus()"
							ng-model="$item.rcptySbrbEStatus" name="rcptySbrbEStatus" 
							ng-change="items.CUST.updateCustSbrbEstatus($item)">
							<option value="3" ng-if="$item.rcptySbrbEStatus=='3'" ng-selected="$item.rcptySbrbEStatus=='3'">新消息</option>
							<option value="4" ng-if="$item.rcptySbrbEStatus=='3'||$item.rcptySbrbEStatus=='4'" ng-selected="$item.rcptySbrbEStatus=='4'">已读</option>
							<option value="7" ng-selected="$item.rcptySbrbEStatus=='7'">拒绝</option>
						</select>
					</span>`,
			},
			{
				label: '申购渠道',
				tdClass:'td-class-8',
				thClass:'th-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'td-class-9',
				thClass:'th-class-9',
				template: '<span>{{$item.createTime|addTwoLine}}</span>',
			},
			{
				label: '联系人',
				tdClass:'td-class-10',
				thClass:'th-class-10',
				template: '<span>{{$item.rcptyUserNm|addTwoLine}}</span>',
			},
			{
				label: '备注',
				tdClass:'td-class-11',
				thClass:'th-class-11',
				template: `
					<span class="ellipsis" ng-if="$item.sbrbChnl!='4'" 
						uib-tooltip="{{$item.rmrk|addTwoLine}}">
						{{$item.rmrk|addTwoLine}}
					</span>
					<span ng-if="$item.sbrbChnl=='4'" tooltip-placement="bottom"
						uib-tooltip="{{$item.rmrk}}">
						<input ng-focus="items.CUST.inputFocus()"
						 ng-model="$item.rmrk" 
							ng-blur="items.CUST.updateCustSbrb($item)"/>
					</span>`,
			},
			{
				label: '',
				tdClass:'td-class-12',
				thClass:'th-class-12',
				template: `<span>
					<i class="fa fa-remove" ng-click="items.CUST.deleteRcptySbrb($item)" 
						ng-if="($item.rcptySbrbEStatus=='6'||$item.rcptySbrbEStatus=='7'||$item.rcptySbrbEStatus=='9')||($item.sbrbChnl=='4')"></i>
				</span>`,
			},
			{
				label: '',//群聊状态
				tdClass:'td-class-13',
				thClass:'th-class-13',
				template: `<span>
					<input type="checkbox" ng-checked="$item.checked"/>
				</span>`,
				tdClick: function($item,ev){// 关注
					/*$item.checked = !$item.checked;
					let userid = Number($item.sndrUserId);
					if($item.checked){
						self.single = userid;
						!self.multiple.includes(userid) && self.multiple.push(userid);
					}else{
						let tmparr = self.lists.items.filter(item=>{
							return item.checked;
						}).map(item=>item.sndrUserId);
						self.multiple = [...new Set(tmparr)];
					}*/
				},
				thNgHide:function(item){
					return self.chatSingle;
				},
				tdNgHide:function(item){
					return self.chatSingle;
				},
			},
			{
				label: '',//单聊状态
				tdClass:'td-class-13',
				thClass:'th-class-13',
				template: `<span>
					<div class="msgActived" 
						ng-show="$item.sndrUserId==items.CUST.single"></div>
					<div class="msgFlag" 
						ng-show="(items.CUST.msgStatistics['_'+$item.sndrUserId]>0)&&($item.sndrUserId!=items.CUST.single)">
							{{items.CUST.msgStatistics["_"+$item.sndrUserId]}}
						</div>
				</span>`,
				tdClick: function($item,ev){// 关注
					/*$item.checked = !$item.checked;
					let userid = Number($item.sndrUserId);
					if($item.checked){
						self.single = userid;
						!self.multiple.includes(userid) && self.multiple.push(userid);
					}else{
						let tmparr = self.lists.items.filter(item=>{
							return item.checked;
						}).map(item=>item.sndrUserId);
						self.multiple = [...new Set(tmparr)];
					}*/
				},
				thNgHide:function(item){
					return !self.chatSingle;
				},
				tdNgHide:function(item){
					return !self.chatSingle;
				},
			}
		];
	}
	initListBD(){
		this.mineB.items.CUST = this;
		this.mineB.fields = [
			{
				label: '',
				tdClass:'tdb-class-1',
				thClass:'thb-class-1',
				template: '<span></span>',
			},
			{
				label: '申购人',
				tdClass:'tdb-class-2',
				thClass:'thb-class-2',
				template: `
					<span>
						<input tooltip-placement="bottom"
							uib-tooltip="{{$item.name.name}}"
							ng-model="$item.name"
							uib-typeahead="item as item.name for item in items.CUST.getSndrInstTeamUserList($viewValue)"
							typeahead-template-url="templates/requisitioner.html"
							typeahead-on-select = "items.CUST.selectRequisitioner($item,$index,'BD')"
							placeholder="" type="text"/>
					</span>`,
				/*tdClick: function($item,ev){
					console.log($item);
				}*/
			},
			{
				label: '票面(%)',
				tdClass:'tdb-class-3',
				thClass:'thb-class-3',
				template: `<span>
					<input ng-change="items.CUST.clcCprsvPftIntrt($item)" ng-model="$item.sbrbIntrt"
						ng-disabled="$item.sellrMod=='1'"
						validation-tooltip="items.CUST.validate($value,'1')"/>
				</span>`,
			},
			{
				label: '综收(%)',
				tdClass:'tdb-class-31',
				thClass:'thb-class-31',
				template: `<span>
					<input ng-change="items.CUST.clcSbrbIntrt($item)" ng-model="$item.cprsvPftIntrt"
						ng-disabled="$item.sellrMod=='2'"
						validation-tooltip="items.CUST.validate($value,'2')"/>
				</span>`,
			},
			{
				label: '返费(元)',
				tdClass:'tdb-class-32',
				thClass:'thb-class-32',
				template: `<span>
					<input 
						ng-model="$item.retFee" 
						validation-tooltip="items.CUST.validate($value,'3')"/>
					</span>`,
			},
			{
				label: '申购量(亿)',
				tdClass:'tdb-class-4',
				thClass:'thb-class-4',
				template: `<span>
					<input 
						ng-model="$item.sbrbNum" 
						validation-tooltip="items.CUST.validate($value,'4')"/>
					</span>`,
			},
			{
				label: '交割方式',
				tdClass:'tdb-class-5',
				thClass:'thb-class-5',
				template: `
					<span>
						<select 
							ng-model="$item.dlvTp" name="dlvTp">
							<option value="1" ng-selected="$item.dlvTp=='1'">上市</option>
							<option value="2" ng-selected="$item.dlvTp=='2'">分销</option>
						</select>
					</span>`,
			},
			{
				label: '销售方式',
				tdClass:'tdb-class-6',
				thClass:'thb-class-6',
				template: `
					<span>
						<select 
							ng-model="$item.sellrMod" name="sellrMod" >
							<option value="1" ng-selected="$item.sellrMod=='1'">折价</option>
							<option value="2" ng-selected="$item.sellrMod=='2'">单返</option>
						</select>
					</span>`,
			},
			{
				label: '申购状态',
				tdClass:'tdb-class-7',
				thClass:'thb-class-7',
				template: `<span>{{$item.rcptySbrbEStatus|applicationState}}</span>`,
			},
			{
				label: '申购渠道',
				tdClass:'tdb-class-8',
				thClass:'thb-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'tdb-class-9',
				thClass:'thb-class-9',
				template: '<span>{{$item.createTime|date:"MM-dd HH:mm"}}</span>',
			},
			{
				label: '联系人',
				tdClass:'tdb-class-10',
				thClass:'thb-class-10',
				template: '<span>{{$item.rcptyUserNm}}</span>',
			},
			{
				label: '备注',
				tdClass:'tdb-class-11',
				thClass:'thb-class-11',
				template: `<span>
					<input tooltip-placement="bottom" uib-tooltip="{{$item.rmrk}}"
						ng-model="$item.rmrk"/></span>`,
			},
			{
				label: '中标状态',
				tdClass:'tdb-class-12',
				thClass:'thb-class-12',
				template: '<span>{{$item.winbidEStatus|addTwoLine}}</span>',
			},
			{
				label: '中标量(亿)',
				tdClass:'tdb-class-13',
				thClass:'thb-class-13',
				template: '<span>{{$item.winbidNum|addTwoLine}}</span>',
			},
			{
				label: '待分配(亿)',
				tdClass:'tdb-class-14',
				thClass:'thb-class-14',
				template: '<span>--</span>',
			},
			{
				label: '票面利率(%)',
				tdClass:'tdb-class-15',
				thClass:'thb-class-15',
				template: '<span>{{$item.winbidIntrt|addTwoLine}}</span>',//
			},
			{
				label: '发送状态',
				tdClass:'tdb-class-16',
				thClass:'thb-class-16',
				template: '<span>{{$item.sndrEStatus|addTwoLine}}</span>',
			}
		];
	}
	initListB(){
		this.listsB.items.CUST = this;
		this.listsB.fields = [
			{
				label: '',
				tdClass:'tdb-class-1',
				thClass:'thb-class-1',
				template: `<span>
					<img ng-if="$item.rcptySbrbEStatus=='3'" src="images/tag_new01.png" alt="">
				</span>`,
			},
			{
				label: '申购人',
				tdClass:'tdb-class-2',
				thClass:'thb-class-2',
				//thNgHide:function(){return false? true : false;},
				template: `
					<span class="ellipsis" uib-tooltip="{{$item.applyInfoStr}}" tooltip-placement="bottom">
						{{$item.applyInfoStr}}
					</span>`,
				//thClick: function(){},
				//thNgClass: function($item){return {}},
				//tdClick: function($item,ev){}
			},
			{
				label: '票面(%)',
				tdClass:'tdb-class-3',
				thClass:'thb-class-3',
				template: `
					<span>{{$item.sbrbIntrt|addTwoLine}}</span>`,
			},
			{
				label: '综收(%)',
				tdClass:'tdb-class-31',
				thClass:'thb-class-31',
				template: `<span>{{$item.cprsvPftIntrt|addTwoLine}}</span>`,
			},
			{
				label: '返费(元)',
				tdClass:'tdb-class-32',
				thClass:'thb-class-32',
				template: `<span>{{$item.retFee|addTwoLine}}</span>`
			},
			{
				label: '申购量(亿)',
				tdClass:'tdb-class-4',
				thClass:'thb-class-4',
				template: `<span>{{$item.sbrbNum}}</span>`,
			},
			{
				label: '交割方式',
				tdClass:'tdb-class-5',
				thClass:'thb-class-5',
				template: `<span>{{$item.dlvTp|applicationTransaction}}</span>`,
			},
			{
				label: '销售方式',
				tdClass:'tdb-class-6',
				thClass:'thb-class-6',
				template: `
					<span>{{$item.sellrMod|applicationSale}}</span>`,
			},
			{
				label: '申购状态',
				tdClass:'tdb-class-7',
				thClass:'thb-class-7',
				template: `
					<span>{{$item.rcptySbrbEStatus|applicationState}}</span>`,
			},
			{
				label: '申购渠道',
				tdClass:'tdb-class-8',
				thClass:'thb-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'tdb-class-9',
				thClass:'thb-class-9',
				template: '<span>{{$item.createTime|addTwoLine}}</span>',
			},
			{
				label: '联系人',
				tdClass:'tdb-class-10',
				thClass:'thb-class-10',
				template: '<span>{{$item.contactUser|addTwoLine}}</span>',
			},
			{
				label: '备注',
				tdClass:'tdb-class-11',
				thClass:'thb-class-11',
				template: `
					<span class="ellipsis"
						uib-tooltip="{{$item.rmrk|addTwoLine}}">{{$item.rmrk|addTwoLine}}</span>`,
			},
			{
				label: '中标状态',
				tdClass:'tdb-class-12',
				thClass:'thb-class-12',
				template: `
				<span ng-if="$item.rcptySbrbEStatus!='4'">--</span>
				<span ng-if="$item.rcptySbrbEStatus=='4'">
					<select  ng-disabled='items.CUST.leader.userId!=items.CUST.userStatusService.uid'
						ng-model="$item.winbidEStatus" 
						ng-focus="items.CUST.inputFocus()"
						ng-change="items.CUST.alctWinBid($item)">
						<option value="1" ng-selected="$item.winbidEStatus=='1'">中标</option>
						<option value="2" ng-selected="$item.winbidEStatus=='2'">部分中标</option>
						<option value="3" ng-selected="$item.winbidEStatus=='3'">未中标</option>
					</select>
				</span>`,
			},
			{
				label: '中标量(亿)',
				tdClass:'tdb-class-13',//name="xxx{{$item.$$hashKey}}"
				thClass:'thb-class-13',
				template: `
				<span ng-if="$item.rcptySbrbEStatus!='4'">--</span>
				<span ng-if="$item.rcptySbrbEStatus=='4'">
					<input ng-disabled='items.CUST.leader.userId!=items.CUST.userStatusService.uid' ng-model="$item.winbidNum" ng-focus="items.CUST.inputFocus()"
						validation-tooltip="items.CUST.validate($value,'winbidNum',$item)"
						ng-change="items.CUST.alctWinBid($item)"/>
				</span>`,
			},
			{
				label: '待分配(亿)',
				tdClass:'tdb-class-14',
				thClass:'thb-class-14',//{{$item.MYwinbidNum}}-{{$item.winbidNum}}=
				template: `<span 
					ng-class="{positive:$item.MYwinbidNum-$item.winbidNum>0,negative:$item.MYwinbidNum-$item.winbidNum<0}">
					{{($item.MYwinbidNum-$item.winbidNum)|number:2}}
				</span>`,
			},
			{
				label: '票面利率(%)',
				tdClass:'tdb-class-15',
				thClass:'thb-class-15',
				template: '<span>{{$item.winbidIntrt|addTwoLine}}</span>',
			},
			{
				label: '发送状态',
				tdClass:'tdb-class-16',
				thClass:'thb-class-16',
				template: `
				<span>
					<button class="btn" ng-if="$item.winbidSndEStatus=='1'" 
						ng-disabled="!items.CUST.listsB.enabledSend"
						ng-click="items.CUST.sendPartWinbidList($item)">
						发送
					</button>
					<button class="btn" style="color:#495d67;" 
						ng-if="$item.winbidSndEStatus=='2'">
						已发送
					</button>
				</span>`,
			}
		];
	}
}