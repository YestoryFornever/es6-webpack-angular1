class ChatRoomTimer{
	constructor(stamp){
		"ngInject";
		this.reset();
		if(undefined!==stamp)
			this._getTimeLeft(stamp);
	}
	onZero(){
		this.str = '已过期';
		this.counting = false;
	}
	onStop(time){}
	reset(){
		if(this.stop)
			this.stop();
		this.counting = true;
		this.str = '';
	}
	_getTimeLeft(stamp){
		let timeleft = 5*60*1000 - ((new Date()).getTime()-(new Date(stamp)).getTime());
		if(timeleft<0){
			this.time = 0;
			this.onZero();
		}else{
			this.time = timeleft;
		}
	}
}
class ChatroomController {
	/*刷新议价列表*/
	_refreshBargainList(){
		this.$scope.$broadcast('refresh-bargain-list');
	}
	/*切换当前议价对象（userid）*/
	changeBargain(bargain){
		this.showChatList = true;//显示聊天界面
		this.chatcontent = [];//清空聊天列表
		this.OBargain.negtprcUserId = bargain.userId;
		this.OBargain.bondNegtprcid = bargain.bondNegtprcid;
		this.OBargain.bondOfrid = bargain.bondOfrid;
		this.OBargain.iconUrl = bargain.iconUrl;
		this._refreshBargainDetail();

		let chatCache = this.easeMobService.getCache();
		if(chatCache&&chatCache.length>0){//如果存在聊天缓存，依次弹出
			let curChatListUn;
			for(let i=0;i<chatCache.length;i++){
				if(chatCache[i].userId === bargain.userId){
					curChatListUn = chatCache[i].chatcontent;
				}
			}
			if(curChatListUn&&curChatListUn.length>0){
				curChatListUn.forEach((item,index)=>{
					let m = item.iotype==="i"?item.data:item.msg;
					this.popMsg(item.ext,m,item.iotype);
				});
			}
		}
	}

	/*刷新议价详情*/
	_refreshBargainDetail(isQuote){//this.OBargain bondOfrid:报价id|bondNegtprcid:议价id|userId用户:id
		this.chatroomService.queryBargainDetail(this.OBargain)
			.then((data)=>{
				if(!data.status===200){alert(data);}
				if(data.data.status==="0"){
					this._showBargainMessage(data.data.data,isQuote);
				}else{
					alert(data.data.msg);
				}
			},(data)=>{
				console.warn("查询报价列表异常");
			});
		this.openBargainDrop();
		this.closeInputs();
	}
	/*填充议价详情*/
	_showBargainMessage(data,isQuote){
		data.userName && (this.friend.userName = data.userName);//切换用户姓名
		data.iconUrl && (this.OBargain.iconUrl = data.iconUrl);//切换用户头像
		let state = data.negtprcEStatus;
		switch(state){
			case '4':;
			case '6':
				//判断议价列表是否为空
				if(data.negtprcDtlList && data.negtprcDtlList.length>0){//不为空
					//判断最后一条议价（倒取第一条）里的用户id与当前用户id是否一致
					if(data.negtprcDtlList[data.negtprcDtlList.length-1].userId == BONDCONFIG.USERINFO.uid){
						this.btnState = {
							bargain:{enable:false,name:'议价'},
							publish:{enable:false,name:'发布'},
							reject:{enable:true,name:'拒绝'},
							deal:{enable:false,name:'交易'}
						};
					}else{
						this.btnState = {
							bargain:{enable:true,name:'议价'},
							publish:{enable:true,name:'发布'},
							reject:{enable:true,name:'拒绝'},
							deal:{enable:true,name:'交易'}
						};
					}
				}else{//为空
					//判断报价用户id与当前用户id是否一致
					if(data.ofrUserId == BONDCONFIG.USERINFO.uid){
						this.btnState = {
							bargain:{enable:false,name:'议价'},
							publish:{enable:false,name:'发布'},
							reject:{enable:true,name:'拒绝'},
							deal:{enable:false,name:'交易'}
						};
					}else{
						this.btnState = {
							bargain:{enable:true,name:'议价'},
							publish:{enable:true,name:'发布'},
							reject:{enable:true,name:'拒绝'},
							deal:{enable:false,name:'交易'}
						};
						if(isQuote){
							this.btnState = {
								bargain:{enable:true,name:'议价'},
								publish:{enable:true,name:'发布'},
								reject:{enable:false,name:'拒绝'},
								deal:{enable:false,name:'交易'}
							};
						}
					}
				}
				break;
			case '2':
				this.btnState = {
					bargain:{enable:false,name:'议价'},
					publish:{enable:false,name:'发布'},
					reject:{enable:false,name:'拒绝'},
					deal:{enable:false,name:'交易'}
				};
				break;
			case '3':
				this.btnState = {
					bargain:{enable:false,name:'议价'},
					publish:{enable:false,name:'发布'},
					reject:{enable:false,name:'拒绝'},
					deal:{enable:false,name:'已交易'}
				};
				break;
			case '5':
				this.btnState = {
					bargain:{enable:false,name:'议价'},
					publish:{enable:false,name:'发布'},
					reject:{enable:false,name:'已拒绝'},
					deal:{enable:false,name:'交易'}
				};
				break;
			case '7':
				this.btnState = {
					bargain:{enable:false,name:'议价'},
					publish:{enable:false,name:'发布'},
					reject:{enable:false,name:'拒绝'},
					deal:{enable:false,name:'已成交'}
				};
				break;
		}
		/**
		 * [showCurCounting 控制议价详情界面倒计时是否显示]
		 * @type {[boolean]}
		 * 通常倒计时是否显示与交易按钮是否显示同步，只有一种情况例外：从报价界面进入聊天界面且议价记录为空时。
		 */
		this.showCurCounting = this.btnState.deal.enable;
		if(isQuote)
			if(!(data.negtprcDtlList && data.negtprcDtlList.length>0))
				this.showCurCounting = false;
		/**
		 * [this.bargainDetailTime.reduction 重置倒计时]
		 * @param  {[number]} [时间戳]
		 */
		if(this.bargainDetailTime&&this.bargainDetailTime.reduction){
			this.bargainDetailTime.reduction(5*60*1000 - ((new Date()).getTime()-(new Date(stamp)).getTime()));
		}
		if(!this.bargainDetailTime.counting){
			this.btnState.deal.enable = false;//交易按钮不可用
		}
		/**
		 * [当前议价详情]
		 */
		this.IBargain = data;
		this.OBargain.msgNum = this.IBargain.msgNum;
		if(data.negtprcDtlList&&data.negtprcDtlList.length>0){
			let curb = data.negtprcDtlList[data.negtprcDtlList.length-1];
			this.OBargain.yield = this.chatroomUEService.__y(curb.yldrto,true);
			this.OBargain.netprc = this.chatroomUEService.__p(curb.netprc,true);
			this.OBargain.num = this.chatroomUEService.__n(curb.num,true);
			this.OBargain.setamt = curb.setamt;

			this.hideArrow = false;
			this.foldListH0 = false;
			if(data.negtprcDtlList.length === 1){
				this.foldListH1 = true;
			}else{
				this.foldListH1 = false;
			}
		}else{
			this.OBargain.yield = this.chatroomUEService.__y(this.IBargain.yldrto,true);
			this.OBargain.netprc = this.chatroomUEService.__p(this.IBargain.netprc,true);
			this.OBargain.num = this.chatroomUEService.__n(this.IBargain.num,true);
			this.OBargain.setamt = this.IBargain.setamt;

			this.hideArrow = true;
			this.foldListH1 = false;
			this.foldListH0 = true;
		}
		this._refreshBargainHistory(this.OBargain.negtprcUserId);
		this.openBargainDrop();
		this.closeInputs();
	}
	/*拒绝报价*/
	reject(){
		let promise = this.chatroomService.updateBargainState(this.IBargain,this.OBargain,'5');
		promise.then((data)=>{
			if(data.data.status=="0"){
				data.data.data.forEach((item)=>{
					this.sendCmd('23',item);
				});
			}
		},(data)=>{console.warn("更改用户状态异常");});
		this.sendCmd('23',this.friend.userId);
		this.afterRejectOrDeal();
		this.btnState = {
			bargain:{enable:false,name:'议价'},
			publish:{enable:false,name:'发布'},
			reject:{enable:false,name:'已拒绝'},
			deal:{enable:false,name:'交易'}
		};
	}
	/*报价成交*/
	deal(){
		let promise = this.chatroomService.updateBargainState(this.IBargain,this.OBargain,'3');
		promise.then((data)=>{
			if(data.data.status=="0"){
				data.data.data.forEach((item)=>{
					this.sendCmd('26',item);
				});
			}
		},(data)=>{console.warn("更改用户状态异常");});
		this.sendCmd('24',this.friend.userId);
		this.sendCmd('26',this.friend.userId);
		this.afterRejectOrDeal();
		this.btnState = {
			bargain:{enable:false,name:'议价'},
			publish:{enable:false,name:'发布'},
			reject:{enable:false,name:'拒绝'},
			deal:{enable:false,name:'已成交'}
		};
	}
	afterRejectOrDeal(){
		if(this.bargainDetailTime&&this.bargainDetailTime.stop)
			this.bargainDetailTime.stop();
	}
	
	/*发送报价弹窗*/
	sendQuote(){
		let that = this;
		var modalInstance = that.$uibModal.open({
			animation: that.animationsEnabled,
			component:'quotemodal',
			windowClass:'my-quote',
			size: 'xl',//'lg',//'sm',
			resolve: {
				modalData:function(){
					return that.dataForModal;
				}
			}
		}).result.then(function (quotelist) {
			let tmplist = quotelist;
			tmplist.forEach(function(item,index){
				if(item.checked){
					let curQuote = {
						bondCd:item.bondCd,//债券编码
						bondOfrid:item.bondOfrid,//报价id
						bondShrtnm:item.bondShrtnm,//债券简称
						bondid:item.bondid,//债券id
						drc:item.drc,//报价方向
						ext_message:"您收到一条新的报价",
						ext_msg_type:"20",
						netprc:item.netprc,//净价
						num:item.num,
						yldrto:item.yldrto,//收益率
						rsdtrm:item.rsdtrm,
						sbjRtg:item.sbjRtg,
						ofrUserId:(""+BONDCONFIG.USERINFO.uid)
					}
					this.quoteListChecked.push({
						'bondid':item.bondid,
						'drc':item.drc,//==="买入"?"-1":item.drc==="卖出"?"1":"",
						'num':item.num,
						'yldrto':item.yield,
						'netprc':item.netprc,
						'wthrAnon':item.wthrAnon,
						'wthrListg':item.wthrAnon,
						'rmrk':item.remark
					});
					let promise = that.chatroomService.sendBondQuote(item.bondOfrid,that.IBargain.negtprcUserId);
					promise.then((data)=>{//先通过后台获取议价ID再向环信发送议价对象
						if(data.data.status==="0"){
							curQuote.bondNegtprcid=data.data.data;//债券议价id
							// debugger;
							curQuote.udtTm = (new Date().getTime());
							this.sendMsg(curQuote);
							that._refreshBargainList();
						}
					},(data)=>{
						console.warn("发送报价异常");
					});
				}
			},that);
		}, function () {
			that.$log.info('报价窗口关闭');
		});
	}
	/*发布报价*/
	publishBargain(){
		let y = this.chatroomUEService.__y(this.OBargain.yield,false),
			p = this.chatroomUEService.__p(this.OBargain.netprc,false),
			n = this.chatroomUEService.__n(this.OBargain.num,false),
			s = this.OBargain.setamt;
		let promise = this.chatroomService.publishBargain(
			this.IBargain,
			y,p,n,s
		);
		promise.then((data)=>{
			this._refreshBargainDetail();
			this._refreshBargainList();
			this._refreshBargainHistory(this.OBargain.negtprcUserId);
			this.showCurCounting = false;
			if(data.data.status=="0"){
				this.sendMsg({
					'ext_msg_type':'21',
					'ext_message':'您收到一条议价',
					'bondid':this.IBargain.bondid,//债券id
					'bondShrtnm':this.IBargain.bondShrtnm,//债券简称
					'bondCd':this.IBargain.bondCd,//债券编码
					'drc':this.IBargain.ofrDrc,//报价方向
					'yldrto':this.chatroomUEService.__y(this.OBargain.yield,false),//议价收益率
					'netprc':this.chatroomUEService.__p(this.OBargain.netprc,false),//议价净价
					'num':this.chatroomUEService.__n(this.OBargain.num,false),//议价数量
					'bondOfrid':this.OBargain.bondOfrid,//报价id
					'bondNegtprcid':data.data.data//议价id
				});
			}
		},(data)=>{
			console.warn("添加议价明细异常");
		});
	}

	/*刷新议价记录（议价对象）*/
	_refreshBargainHistory(userId){//userId:议价用户
		let promise = this.chatroomService.getBargainHistory(userId);
		promise.then((data)=>{
			this.bargainHistory = data.data.data.map((item)=>{
				item.fold=true;
				return item;
			});
		},(data)=>{
			console.warn("更改用户状态异常");
		});
	}
	
	/*向聊天列表追加信息*/
	popMsg(ext,msg,flag){
		let msgObj = this.chatroomUEService.createMsgObj(ext,msg,flag);
		if(msgObj)
			this.chatcontent.push(msgObj);
		/*倒计时*/
		if(ext&&(ext.ext_msg_type=="20"||ext.ext_msg_type=="21")){
			// debugger;
			ext.timer = new ChatRoomTimer(ext.udtTm);
		}
		/*滚动条*/
		this.chatContentScroll();
	}
	/*发送信息*/
	sendMsg(extObj){
		if(!extObj && this.message===""){
			alert('发送内容为空');
			return false;
		}
		let msgNum = Number(this.OBargain.msgNum);
		if(msgNum!==0){//-1,1,2,3
			this.easeMobService.sendMsg(this.message,extObj,this.OBargain.negtprcUserId);
			this.popMsg(extObj,this.message,'o');
			if(!extObj){
				this.message = "";
			}
			if(msgNum>0){
				this.OBargain.msgNum = (msgNum-1);
				this.updateMsgNum(msgNum-1);
			}
		}else{
			alert('陌生人只能发送三条消息');
		}
	}

	updateMsgNum(num){
		this.chatroomService.updateMsgNum({
			'bondOfrid':this.IBargain.bondOfrid,
			'msgNum':num,
			'bondNegtprcid':this.IBargain.bondNegtprcid,
			'negtprcUserId':this.IBargain.negtprcUserId
		}).then((data)=>{
			console.log(data);
		},(data)=>{
			console.warn("更新消息条数异常");
		});
	}

	sendCmd(type,user){
		if(!type || !user)return;
		this.easeMobService.sendCmd(type,user);
	}
	/*点击聊天列表的报价*/
	showCurBargain(chat){
		this.OBargain.bondOfrid = chat.message.bondOfrid;
		this.OBargain.bondNegtprcid = chat.message.bondNegtprcid;
		!!chat.message.ofrUserId && (this.OBargain.negtprcUserId = chat.message.ofrUserId);
		this._refreshBargainDetail();
	}
	yieldKeyup(){
		if(event.target.value===this.focusValue){return false;}
		let yld = this.chatroomUEService.__y(this.OBargain.yield,false);
		let num = this.chatroomUEService.__n(this.OBargain.num,false);
		let promise = this.chatroomService.opYield(
			this.IBargain.bondid,
			num,
			yld
		);
		promise.then((data)=>{
			if(data.data.status==="0"){
				this.OBargain.netprc = this.chatroomUEService.__p(data.data.data.cleanPrice,true);
				this.OBargain.setamt = data.data.data.settlementAmount;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{});
	}
	netprcKeyup(){
		if(event.target.value===this.focusValue){return false;}
		let num = this.chatroomUEService.__n(this.OBargain.num,false);
		let prc = this.chatroomUEService.__p(this.OBargain.netprc,false);
		let promise = this.chatroomService.opNetprc(
			this.IBargain.bondid,
			num,
			prc
		);
		promise.then((data)=>{
			if(data.data.status==="0"){
				this.OBargain.yield = this.chatroomUEService.__y(data.data.data.yield,true);
				this.OBargain.setamt = data.data.data.settlementAmount;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{});
	}
	numKeyup(){
		if(event.target.value===this.focusValue){return false;}
		let yld = this.chatroomUEService.__y(this.OBargain.yield,false);
		let num = this.chatroomUEService.__n(this.OBargain.num,false);
		let promise = this.chatroomService.opNum(
			this.IBargain.bondid,
			num,
			yld
		);
		promise.then((data)=>{
			if(data.data.status==="0"){
				//this.OBargain.netprc = this.chatroomUEService.__p(data.data.data.cleanPrice,true);
				this.OBargain.setamt = data.data.data.settlementAmount;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{});
	}
	inputFocus(){
		this.focusValue = event.target.value;
	}
	/*UI控制*/
	toggleChatHistory(){//切换是否显示议价记录
		this.showChatHistory = !this.showChatHistory;
		this.$timeout(()=>{
			this.historyListHeight = document.getElementById('bargainAllHistory').clientHeight;
		},0);
	}
	openBargainDrop(){
		this.bargainfold = false;
	}
	closeBargainDrop(){
		this.bargainfold = true;
	}
	openInputs(){
		this.bargainInputFold = false;
	}
	closeInputs(){
		this.bargainInputFold = true;
	}
	closeChatList(){
		this.showChatList = false;
	}
	chatContentScroll(){
		setTimeout(()=>{
			var objDiv = document.getElementById("chat_content");
			!!objDiv && (objDiv.scrollTop = objDiv.scrollHeight);
		},10);
	}
	_countDownBroadcast(){
		this.$rootScope.$broadcast('count-down-broadcast');
	}
	toggleBargainListState(){
		this.unfoldBargain = !this.unfoldBargain;
	}
	togglehistorylist(bond){
		bond.fold = !bond.fold;
	}
	constructor($rootScope,$scope,$log,$state,$stateParams,$uibModal,$timeout,$interval,ProxyRequestService,chatroomService,easeMobService,chatroomUEService) {
		"ngInject";
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$state = $state;
		this.$uibModal = $uibModal;
		this.$log = $log;
		this.$timeout = $timeout;
		this.ProxyRequestService = ProxyRequestService;
		this.chatroomService = chatroomService;
		this.easeMobService = easeMobService;
		this.chatroomUEService = chatroomUEService;
	}
	$onInit(){
		//当前用户头像
		this.curUserUrl = '../../../../../resource/images/img_defaulthead_group.png';
		(!!BONDCONFIG.USERINFO.iconUrl) && (this.curUserUrl = BONDCONFIG.USERINFO.iconUrl);
		(!!BONDCONFIG.USERINFO.uid) && (this.curUserId = BONDCONFIG.USERINFO.uid);
		//测试数据
		this.$scope.bargain="议价记录";
		//弹窗交互数据
		this.dataForModal = {
			quoteList:[]
		};
		//待发送报价列表
		this.quoteListChecked = [];
		//展示弹窗是否显示动画
		this.animationsEnabled = true;
		//当前聊天好友(与好友、议价等列表交互)
		this.friend={};
		//显示议价记录
		this.showChatHistory = false;
		//待发送信息
		this.message = "";//"世界你好";
		//隐藏议价界面
		this.bargainfold = true;
		//隐藏议价输入框
		this.bargainInputFold = true;
		this.showChatList = false;
		this.unfoldBargain = false;
		this.showCurCounting = true;
		this.historyListHeight = '470';

		/**
		 * 倒计时预备对象创建
		 */
		this.bargainDetailTime = new ChatRoomTimer();
		let that = this;
		this.bargainDetailTime.onZero = function(time){
			this.str = '已过期';
			this.counting = false;
			that.btnState.deal.enable = false;//交易按钮不可用
		}

		this.OBargain = {
			bondNegtprcid:'',//议价id
			bondOfrid:'',//报价id
			negtprcUserId:'',//议价用户id
			bondid:'',//债券id
			yldrto:'',//收益率
			netprc:'',//净价
			num:'',//数量
			setamt:'',//结算金额
			iconUrl:'../../../../../resource/images/img_defaulthead_group.png'
		};
		this.IBargain = {
			yield:'',
			netprc:'',
			num:'',
			setamt:'',
			bondOfrid:'',//债券报价id
			bondNegtprcid:'',//债券议价id
			negtprcUserId:'',//议价用户
			bondid:'',//债券id
		};
		this.bargainHistory = [];
		this.chatcontent = [
			/*{
				type:'sys',
				message:'已拒绝'
			}*/
		];

		this.easeMobService.init((message)=>{
			message.ext.udtTm=(new Date().getTime());
			this.easeMobService.setCache(message,'i');
			// debugger;
			if(message.ext.ext_msg_type=="20"||message.ext.ext_msg_type=="21"){
				// 刷新议价列表
				this._refreshBargainList();
			}
			if(this.OBargain.negtprcUserId==message.from&&BONDCONFIG.USERINFO.uid==message.to){//当前聊天对象id与发送方id相同时
				if(message.ext.ext_msg_type=="21"){
					// 刷新议价界面
					this._refreshBargainDetail();
				}
				this.$scope.$apply(()=>{
					// console.info("消息类型:"+message.type);
					// console.info(message.data||"Text");
					this.popMsg(message.ext,message.data,'i');
				});
			}
			if(this.OBargain.negtprcUserId==message.to&&BONDCONFIG.USERINFO.uid==message.from){//当前聊天对象id与接收方id相同时
				if(message.ext.ext_msg_type=="21"){
					// 刷新议价界面
					this._refreshBargainDetail();
				}
				this.$scope.$apply(()=>{
					// console.info("消息类型:"+message.type);
					// console.info(message.data||"Text");
					this.popMsg(message.ext,message.data,'o');
				});
			}
		},(message)=>{
			console.log('收到命令消息',message.ext.bond_type);
			// console.log(this);
			// debugger;
			console.log(message);
			if(this.OBargain.negtprcUserId==message.from&&BONDCONFIG.USERINFO.uid==message.to){//当前聊天对象id与发送方id相同时
				switch(message.ext.bond_type){
					case "23":
						this.popMsg(message.ext,'对方已拒绝您的议价','sys');
						this.btnState = {
							bargain:{enable:false,name:'议价'},
							publish:{enable:false,name:'发布'},
							reject:{enable:false,name:'已拒绝'},
							deal:{enable:false,name:'交易'}
						};
						this.bargainDetailTime.stop();
						break;
					case "24":
						this.popMsg(message.ext,'对方已同意您的议价','sys');
						this.btnState = {
							bargain:{enable:false,name:'议价'},
							publish:{enable:false,name:'发布'},
							reject:{enable:false,name:'拒绝'},
							deal:{enable:false,name:'已成交'}
						};
						this.bargainDetailTime.stop();
						break;
					case "25":
						this.popMsg(message.ext,'该笔报价已撤销，去看看别的吧~','sys');
						this._refreshBargainDetail();
						break;
					case "26":
						this.popMsg(message.ext,'该笔报价已成交，去看看别的吧~','sys');
						this.btnState = {
							bargain:{enable:false,name:'议价'},
							publish:{enable:false,name:'发布'},
							reject:{enable:false,name:'拒绝'},
							deal:{enable:false,name:'已交易'}
						};
						this.bargainDetailTime.stop();
						break;
				}
			}
		});
		this.easeMobService.login();
		if(!BONDCONFIG.USERINFO.lid){console.warn('用户未登录');}
		this.chatContentScroll();
		/*来自报价大厅的跳转处理*/
		let ofrUserId = this.$state.params.ofrUserId;
		let bondOfrid = this.$state.params.bondOfrid;
		if(ofrUserId && bondOfrid){
			this.showChatList = true;//显示聊天界面
			this.chatcontent = [];//清空聊天列表
			this.OBargain.bondOfrid = bondOfrid;
			this.OBargain.bondNegtprcid = undefined;
			this.OBargain.negtprcUserId = ofrUserId;
			this._refreshBargainDetail(true);//参数表明是报价
		}
	}
	messageInput(){
		if(event.keyCode===13){
			this.sendMsg();
		}
	}
}