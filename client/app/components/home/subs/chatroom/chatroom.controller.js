class ChatRoomTimer{
	constructor(stamp,obj){
		"ngInject";
		if(undefined!==obj){
			for(let i in obj){
				this[i] = obj[i];
			}
		}
		this.reset(stamp);
	}
	onZero(){
		this.str = '已过期';
		this.counting = false;
	}
	onStop(time){}
	reset(stamp){
		if(undefined!==stamp){
			let timeleft = 5*60*1000 - ((new Date()).getTime()-(new Date(stamp)).getTime());
			if(timeleft>0){
				this.counting = true;
				this.time = timeleft;
			}else{
				this.time = 0;
				this.onZero();
			}
		}
	}
}
class ChatroomController {
	changeList(rt){
		this.$state.go(rt);
		switch(rt){
			case 'home.chatroom.friendslist':
				this.state.cur = 'f';
				this.state.bargain.killBargain = true;
				this.asideUlClass = 'friendslist';
				break;
			case 'home.chatroom.groupslist':
				this.state.cur = 'g';
				this.state.bargain.killBargain = true;
				this.asideUlClass = 'groupslist';
				break;
			case 'home.chatroom.bargainlist':
				this.state.cur = 'b';
				this.state.bargain.killBargain = false;
				this.asideUlClass = 'bargainlist';
				this._refreshBargainList();
				break;
		}
	}
	switchChatByFlag(flag,v){
		this.state.chat.onChat = true;//显示聊天界面
		this.state.chat.chatList = [];//清空聊天列表
		switch(flag){
			case 'f':
				this.state.bargain.killBargain = true;
				this.changeFriend(v);
				break;
			case 'g':
				this.state.bargain.killBargain = true;
				break;
			case 'b':
				// this.state.bargain.killBargain = false;移至创建倒计时对象之后
				this.changeBargain(v);
				break;
		}
		let curChatListUn = this.easeMobService.getCache(this.state.curFriend.userId);
		if(curChatListUn&&curChatListUn.length>0){
			curChatListUn.forEach((item,index)=>{
				let m = item.iotype==="i"?item.data:item.msg;
				this.popMsg(item.ext,m,item.iotype);
			});
		}
		this._refreshBargainHistory(this.state.curFriend.userId);
	}
	changeFriend(user){
		this.state.curFriend = {
			userName:user.userName,
			userId:user.oppositeUserId,
			userIcon:user.iconUrl
		};
	}
	changeBargain(bargain){
		this.state.curFriend = {
			userName:bargain.userName,
			userId:bargain.userId,
			userIcon:bargain.iconUrl
		};
		this.state.bargain.quoteId = bargain.bondOfrid;
		this.state.bargain.bargainId = bargain.bondNegtprcid;
		this._refreshBargainDetail();
	}
	/*议价列表*/
	_refreshBargainList(){
		this.$scope.$broadcast('refresh-bargain-list');
	}
	/*议价详情*/
	_refreshBargainDetail(isQuote){//this.OBargain bondOfrid:报价id|bondNegtprcid:议价id|userId用户:id
		this.chatroomService.queryBargainDetail({
			'bondOfrid':this.state.bargain.quoteId,
			'bondNegtprcid':this.state.bargain.bargainId,
			'negtprcUserId':this.state.curFriend.userId
		}).then((data)=>{
			if(!data.status===200){alert(data);}
			if(data.data.status==="0"){
				this.state.bargain.bondId = data.data.data.bondid;
				this._showBargainMessage(data.data.data,isQuote);
			}else{
				alert(data.data.msg);
			}
		},(data)=>{
			console.warn("查询议价详情异常");
		});
	}
	_showBargainMessage(data,isQuote){
		/**
		 * [来自报价大厅时切换用户姓名和头像]
		 */
		data.userName && (this.state.curFriend.userName = data.userName);//切换用户姓名
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
		this.state.bargain.onCounting = this.btnState.deal.enable;
		if(isQuote)
			if(!(data.negtprcDtlList && data.negtprcDtlList.length>0))
				this.state.bargain.onCounting = false;
		/**
		 * [this.bargainDetailTime.reduction 重置倒计时]
		 * @param  {[number]} [时间戳]
		 */
		if(this.bargainDetailTime&&this.bargainDetailTime.onZero){
			if(this.bargainDetailTime.reduction){
				let timeleft = 5*60*1000 - ((new Date()).getTime()-(new Date(data.udtTm)).getTime());
				if(timeleft>0){
					this.bargainDetailTime.reduction(timeleft);
				}else{
					this.bargainDetailTime.stop();
				}
				this.bargainDetailTime.reset(data.udtTm);
			}else{
				this.bargainDetailTime = new ChatRoomTimer(data.udtTm);
			}
		}else {
			this.bargainDetailTime = new ChatRoomTimer(data.udtTm,this.bargainDetailTime);
			let that = this;
			this.bargainDetailTime.onZero = function(time){
				this.str = '已过期';
				this.counting = false;
				that.btnState.deal.enable = false;//交易按钮不可用
			}
			if(this.bargainDetailTime.reduction){
				let timeleft = 5*60*1000 - ((new Date()).getTime()-(new Date(data.udtTm)).getTime());
				if(timeleft>0){
					this.bargainDetailTime.reduction(timeleft);
				}else{
					this.bargainDetailTime.stop();
				}
				this.bargainDetailTime.reset(data.udtTm);
			}
		}
		if(!this.bargainDetailTime.counting){
			this.btnState.deal.enable = false;//交易按钮不可用
		}
		this.state.bargain.killBargain = false;
		/**
		 * [当前议价详情]
		 */
		this.IBargain = data;
		this.state.chat.num = this.IBargain.msgNum;
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
		this.openBargainDrop();
		this.closeInputs();
	}
	/*拒绝报价*/
	reject(){
		this.chatroomService.updateBargainState({
			'bondOfrid':this.state.bargain.quoteId,//债券报价id
			'bondNegtprcid':this.state.bargain.bargainId,//债券议价id
			'negtprcUserId':this.state.curFriend.userId,//议价用户
			'negtprcEStatus':'5'
		}).then((data)=>{
			if(data.data.status=="0"){
				data.data.data.forEach((item)=>{
					this.sendCmd('23',item);
				});
			}
		},(data)=>{console.warn("更改用户状态异常");});
		this.sendCmd('23',this.state.curFriend.userId);
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
		this.chatroomService.updateBargainState({
			'bondOfrid':this.state.bargain.quoteId,//债券报价id
			'bondNegtprcid':this.state.bargain.bargainId,//债券议价id
			'negtprcUserId':this.state.curFriend.userId,//议价用户
			'negtprcEStatus':'3'
		}).then((data)=>{
			if(data.data.status=="0"){
				data.data.data.forEach((item)=>{
					this.sendCmd('26',item);
				});
			}
		},(data)=>{console.warn("更改用户状态异常");});
		this.sendCmd('24',this.state.curFriend.userId);
		this.sendCmd('26',this.state.curFriend.userId);
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
			animation: that.state.pop.onAnimations,
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
					that.chatroomService.sendBondQuote({
						'bondOfrid':item.bondOfrid,//债券报价id
						'negtprcUserId':that.state.curFriend.userId,//议价用户id
					}).then((data)=>{//先通过后台获取议价ID再向环信发送议价对象
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
		this.btnState.publish.enable=false;//busy-btn
		let y = this.chatroomUEService.__y(this.OBargain.yield,false),
			p = this.chatroomUEService.__p(this.OBargain.netprc,false),
			n = this.chatroomUEService.__n(this.OBargain.num,false),
			s = this.OBargain.setamt;
		this.chatroomService.publishBargain({
			'bondOfrid':this.state.bargain.quoteId,
			'bondNegtprcid':this.state.bargain.bargainId,//债券议价id
			'negtprcUserId':this.state.curFriend.userId,//议价用户
			'bondid':this.state.bargain.bondId,//债券id
			'yldrto':y,
			'netprc':p,
			'num':n,
			'setamt':s
		}).then((data)=>{
			this._refreshBargainDetail();
			this._refreshBargainList();
			this._refreshBargainHistory(this.state.curFriend.userId);
			this.state.bargain.onCounting = false;
			if(data.data.status=="0"){
				this.sendMsg({
					'ext_msg_type':'21',
					'ext_message':'您收到一条议价',
					'bondid':this.state.bargain.bondId,//债券id
					'bondShrtnm':this.IBargain.bondShrtnm,//债券简称
					'bondCd':this.IBargain.bondCd,//债券编码
					'drc':this.IBargain.ofrDrc,//报价方向
					'yldrto':this.chatroomUEService.__y(this.OBargain.yield,false),//议价收益率
					'netprc':this.chatroomUEService.__p(this.OBargain.netprc,false),//议价净价
					'num':this.chatroomUEService.__n(this.OBargain.num,false),//议价数量
					'bondOfrid':this.state.bargain.quoteId,//报价id
					'bondNegtprcid':data.data.data//议价id
				});
			}
		},(data)=>{
			console.warn("添加议价明细异常");
		});
	}

	/*刷新议价记录（议价对象）*/
	_refreshBargainHistory(userId){//userId:议价用户
		// debugger;
		this.chatroomService.getBargainHistory({
			'negtprcUserId':userId,//议价用户
		}).then((data)=>{
			this.state.history.historyList = data.data.data.map((item)=>{
				// debugger;
				item.fold=true;
				return item;
			});
		},(data)=>{
			console.warn("更改用户状态异常");
		});
	}
	
	/*向聊天列表追加信息*/
	popMsg(ext,msg,flag){
		let msgObj = this.easeMobService.createMsgObj(ext,msg,flag);
		if(msgObj)
			this.state.chat.chatList.push(msgObj);
		/*倒计时*/
		if(ext&&(ext.ext_msg_type=="20"||ext.ext_msg_type=="21")){
			if(ext.udtTm){
				ext.timer = new ChatRoomTimer(ext.udtTm,ext.timer);
			}
		}
		/*滚动条*/
		this.chatContentScroll();
	}
	/*发送信息*/
	sendMsg(extObj){
		if(!extObj && this.state.chat.message===""){
			alert('发送内容为空');
			return false;
		}
		let msgNum = Number(this.state.chat.num);
		if(msgNum!==0){//-1,1,2,3
			// debugger;
			this.easeMobService.sendMsg(this.state.chat.message,extObj,this.state.curFriend.userId);
			this.popMsg(extObj,this.state.chat.message,'o');
			if(!extObj){
				this.state.chat.message = "";
			}
			if(msgNum>0){
				this.state.chat.num = msgNum-1;
				this.updateMsgNum(msgNum-1);
			}
		}else{
			this.state.chat.chatList.push({type:'sys',message:'您和对方还不是好友，对方回复前，只可以发3条消息'});
			// this.popMsg(message.ext,'陌生人只能发送三条消息','sys');
		}
	}

	updateMsgNum(num){
		this.chatroomService.updateMsgNum({
			'bondOfrid':this.state.bargain.quoteId,
			'msgNum':num,
			'bondNegtprcid':this.state.bargain.bargainId,
			'negtprcUserId':this.state.curFriend.userId
		}).then(
			data=>console.log(data),
			data=>console.warn("更新消息条数异常")
		);
	}

	sendCmd(type,user){
		if(!type || !user)return;
		this.easeMobService.sendCmd(type,user);
	}

	/*点击聊天列表的报价*/
	showCurBargain(chat){
		this.state.bargain.quoteId = chat.message.bondOfrid;
		this.state.bargain.bargainId = chat.message.bondNegtprcid;
		!!chat.message.ofrUserId && (this.state.curFriend.userId = chat.message.ofrUserId);
		this._refreshBargainDetail();
	}
	yieldKeyup(){
		if(event.target.value===this.focusValue){return false;}
		this.yieldClick();
	}
	_getCurDate(){
		var curDate = new Date(),
			month = '' + (curDate.getMonth() + 1),
			day = '' + curDate.getDate(),
			year = curDate.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}
	yieldClick(){
		let yld = this.chatroomUEService.__y(this.OBargain.yield,false);
		let num = this.chatroomUEService.__n(this.OBargain.num,false);
		this.chatroomService.opYield({
			'bondid':this.state.bargain.bondId,
			'dealDate':this._getCurDate(),
			'clearSpeed':"0",
			'dealNum':num,
			'yield':yld,
		}).then((data)=>{
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
		this.chatroomService.opNetprc({
			'bondid':this.state.bargain.bondId,
			'dealDate':this._getCurDate(),
			'clearSpeed':"0",
			'dealNum':num,
			'cleanPrice':prc,
		}).then((data)=>{
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
		this.chatroomService.opNum({
			'bondid':this.state.bargain.bondId,
			'dealDate':this._getCurDate(),
			'clearSpeed':"0",
			'dealNum':num,
			'yield':yld,
		}).then((data)=>{
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
		this.state.history.onHistory = !this.state.history.onHistory;
		this.$timeout(()=>{
			this.state.history.historyListHeight = document.getElementById('bargainAllHistory').clientHeight;
		},0);
	}
	openBargainDrop(){
		this.state.bargain.offBargain = false;
	}
	openInputs(){
		this.state.bargain.offInput = false;
	}
	closeInputs(){
		this.state.bargain.offInput = true;
	}
	closeChatList(){
		this.state.chat.onChat = false;
	}
	chatContentScroll(){
		setTimeout(()=>{
			var objDiv = document.getElementById("chat_content");
			!!objDiv && (objDiv.scrollTop = objDiv.scrollHeight);
		},10);
	}
	toggleBargainListState(){
		this.state.bargain.unfoldBargainHistory = !this.state.bargain.unfoldBargainHistory;
	}
	togglehistorylist(bond){
		bond.fold = !bond.fold;
	}
	messageInput(){
		if(event.keyCode===13){
			this.sendMsg();
		}
	}
	_getUserInfo(){
		if(!BONDCONFIG.USERINFO.lid){console.warn('用户未登录');}
		(!!BONDCONFIG.USERINFO.iconUrl) && (this.state.curUser.headUrl = BONDCONFIG.USERINFO.iconUrl);//当前用户头像
		(!!BONDCONFIG.USERINFO.uid) && (this.state.curUser.userId = BONDCONFIG.USERINFO.uid);
	}
	initEaseMob(){
		this.easeMobService.login();
		this.$scope.$on('ease:msg',(event,message)=>{
			message.ext.udtTm=(new Date().getTime());
			this.state.chat.num!=-1&&this.updateMsgNum(-1);//对方回复消息后，消息条数限制置为-1
			if(message.ext.ext_msg_type=="20"||message.ext.ext_msg_type=="21"){
				// 刷新议价列表
				this._refreshBargainList();
			}
			if(this.state.curFriend.userId==message.from&&BONDCONFIG.USERINFO.uid==message.to){//当前聊天对象id与发送方id相同时
				if(message.ext.ext_msg_type=="21"){
					// 刷新议价界面
					this._refreshBargainDetail();
				}
				this.easeMobService.setCache(message,'i');
				this.$scope.$apply(()=>{
					// console.info("消息类型:"+message.type);
					// console.info(message.data||"Text");
					this.popMsg(message.ext,message.data,'i');
				});
			}
			if(this.state.curFriend.userId==message.to&&BONDCONFIG.USERINFO.uid==message.from){//当前聊天对象id与接收方id相同时
				if(message.ext.ext_msg_type=="21"){
					// 刷新议价界面
					this._refreshBargainDetail();
				}
				this.easeMobService.setCache(message,'o');
				this.$scope.$apply(()=>{
					// console.info("消息类型:"+message.type);
					// console.info(message.data||"Text");
					this.popMsg(message.ext,message.data,'o');
				});
			};
		});
		this.$scope.$on('ease:cmd',(event,message)=>{
			console.log('收到命令消息',message.ext.bond_type);
			if(this.state.curFriend.userId==message.from&&BONDCONFIG.USERINFO.uid==message.to){//当前聊天对象id与发送方id相同时
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
	}
	fromLobby(){
		/*来自报价大厅的跳转处理*/
		let ofrUserId = this.$state.params.ofrUserId;
		let bondOfrid = this.$state.params.bondOfrid;
		if(ofrUserId && bondOfrid){
			this.state.chat.onChat = true;//显示聊天界面
			this.state.chat.chatList = [];//清空聊天列表
			this.state.bargain.quoteId = bondOfrid;
			this.state.bargain.bargainId = undefined;
			this.state.curFriend.userId = ofrUserId;
			this._refreshBargainDetail(true);//参数表明是报价
		}
	}
	constructor(
		$rootScope,
		$scope,
		$log,
		$state,
		$stateParams,
		$uibModal,
		$timeout,
		$interval,
		ProxyRequestService,
		chatroomService,
		easeMobService,
		chatroomUEService
	){
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
		this.state = {
			cur:'',
			curUser:{
				userId:'',
				headUrl:'../../../../../resource/images/img_defaulthead_group.png',
			},
			curFriend:{
				userName:'',
				userId:'',
				userIcon:'../../../../../resource/images/img_defaulthead_group.png'
			},
			curGroup:{},
			bargain:{
				killBargain:false,
				offBargain:true,
				offInput:true,//隐藏议价输入框
				unfoldBargainHistory:false,
				onCounting:true,
				quoteId:'',
				bargainId:'',
			},
			chat:{
				onChat:false,
				chatList:[
					/*{
						type:'sys',
						message:'已拒绝'
					}*/
				],
				message:'',//待发送信息
				num:''
			},
			history:{
				onHistory:false,
				historyList:[],
				historyListHeight:'470'
			},
			pop:{
				onAnimations:true,//展示弹窗是否显示动画
				quote:{}
			}
		}
		this.bargainDetailTime = {};
		this._getUserInfo();
		//测试数据
		this.$scope.bargain="议价记录";
		//弹窗交互数据
		this.dataForModal = {
			quoteList:[]
		};

		let routeArr = this.$state.$current.name.split('.');
		this.asideUlClass = routeArr[routeArr.length-1];
		switch(this.asideUlClass){
			case 'friendslist':this.state.cur = 'f';break;
			case 'groupslist':this.state.cur = 'f';break;
			case 'bargainlist':this.state.cur = 'b';break;
			default:this.state.cur='b';
		}
		
		this.OBargain = {
			yldrto:'',//收益率
			netprc:'',//净价
			num:'',//数量
			setamt:'',//结算金额
		};
		this.IBargain = {};
		this.chatContentScroll();
		this.initEaseMob();
		this.fromLobby();
	}
}