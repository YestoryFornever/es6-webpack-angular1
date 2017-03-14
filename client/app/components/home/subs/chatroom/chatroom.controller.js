var BONDCONFIG = require('../../../../../bond.config.js');
import 'easemob-websdk/dist/strophe-1.2.8.min.js';
var WebIM = require('easemob-websdk');
WebIM.config = require('../../../../../resource/js/easemob/webim.config.js');

class ChatroomController {
	/*刷新议价列表*/
	_refreshBargainList(){
		this.$scope.$broadcast('refresh-bargain-list');
	}

	/*切换当前议价对象（userid）*/
	changeBargain(bargain){
		//this._clearTimerList();//清空倒计时数组
		this.showChatList = true;//显示聊天界面
		this.chatcontent = [];//清空聊天列表
		this.OBargain.negtprcUserId = bargain.userId;
		this.OBargain.bondNegtprcid = bargain.bondNegtprcid;
		this.OBargain.bondOfrid = bargain.bondOfrid;
		this.OBargain.iconUrl = bargain.iconUrl;
		// this._btnStateReset(); //重置按钮状态在_showBargainMessage方法中进行
		this._refreshBargainDetail();
		
		if(this.chatCache.length>0){//如果存在聊天缓存，依次弹出
			let chatCache = this.chatCache;
			let curChatListUn;
			for(let i=0;i<chatCache.length;i++){
				if(chatCache[i].userId === bargain.userId){
					curChatListUn = chatCache[i].chatcontent;
				}
			}
			if(curChatListUn.length>0){
				curChatListUn.forEach((item,index)=>{
					let m = item.iotype==="i"?item.data:item.msg;
					this.popMsg(item.ext,m,item.iotype);
				});
			}
		}
	}

	/*刷新议价详情*/
	_refreshBargainDetail(){//this.OBargain bondOfrid:报价id|bondNegtprcid:议价id|userId用户:id
		this._resetTimer('');
		let promise = this.chatroomService.queryBargainDetail(this.OBargain);
		promise.then((data)=>{
			if(!data.status===200){alert(data);}
			if(data.data.status==="0"){
				// debugger;
				this._showBargainMessage(data.data.data);
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
	_showBargainMessage(data){
		data.userName && (this.friend.userName = data.userName);//切换用户姓名
		data.iconUrl && (this.OBargain.iconUrl = data.iconUrl);//切换用户头像
		let state = data.negtprcEStatus;
		// debugger;
		switch(state){
			case '4':;
			case '6':
				//判断议价列表是否为空
				if(data.negtprcDtlList && data.negtprcDtlList.length>0){//不为空
					//判断最后一条议价（倒取第一条）里的用户id与当前用户id是否一致
					if(data.negtprcDtlList[data.negtprcDtlList.length-1].userId == BONDCONFIG.USERINFO.uid){
						this.btnState = {
							bargain:false,
							publish:false,
							reject:true,
							deal:false
						};
					}else{
						this.btnState = {
							bargain:true,
							publish:true,
							reject:true,
							deal:true
						};
					}
				}else{//为空
					//判断报价用户id与当前用户id是否一致
					if(data.ofrUserId == BONDCONFIG.USERINFO.uid){
						this.btnState = {
							bargain:false,
							publish:false,
							reject:true,
							deal:false
						};
					}else{
						this.btnState = {
							bargain:true,
							publish:true,
							reject:true,
							deal:true
						};
					}
				}
				break;
			case '3':;
			case '5':;
			case '7':
				this.btnState = {
					bargain:false,
					publish:false,
					reject:false,
					deal:false
				};
				break;
		}
		/*let timer = this._getTimer(data.udtTm);
		let min5 = 5*60*1000;
		var timeleft = min5-timer.interval;
		if(timeleft>0){
			this.OBargain.udtTm = timeleft;
			this.counter = this.$interval(()=>{
				timeleft = timeleft - 1000;
				this.OBargain.udtTm = timeleft;
				if(timeleft<=0){
					this._resetTimer('已过期');
					this.btnState.deal = false;
				}
			}, 1000);
		}else{
			this.OBargain.udtTm = '已过期';
			this.btnState.deal = false;
		}*/
		this.IBargain = data;
		if(data.negtprcDtlList.length<=0){
			this.OBargain.yield = this.__y(this.IBargain.yldrto,true);
			this.OBargain.netprc = this.__p(this.IBargain.netprc,true);
			this.OBargain.num = this.__n(this.IBargain.num,true);
			this.OBargain.setamt = this.IBargain.setamt;
		}else{
			let curb = data.negtprcDtlList[data.negtprcDtlList.length-1];
			this.OBargain.yield = this.__y(curb.yldrto,true);
			this.OBargain.netprc = this.__p(curb.netprc,true);
			this.OBargain.num = this.__n(curb.num,true);
			this.OBargain.setamt = curb.setamt;
		}
		this._refreshBargainHistory(this.OBargain.userId);
		this.openBargainDrop();
		this.closeInputs();
	}
	/*重置计时器*/
	/*_resetTimer(str){
		if(this.counter){
			this.OBargain.udtTm = str;
			this.$interval.cancel(this.counter);
		}
	}*/
	/*刷新议价详情列表-暂时用不到*/
	/*_refreshBargainDetailList(){//this.OBargain bondOfrid:报价id|bondNegtprcid:议价id|userId用户:id
		let promise = this.chatroomService.queryBargainDetail(this.OBargain);
		promise.then((data)=>{
			if(!data.status===200){alert(data);}
			if(data.data.status==="0"){
				this.IBargain.negtprcDtlList = data.data.data.negtprcDtlList;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{
			console.warn("查询报价列表异常");
		});
		this._refreshBargainHistory(this.OBargain.userId);
		this.openBargainDrop();
		this.closeInputs();
	}*/
	/*拒绝报价*/
	reject(){
		let promise = this.chatroomService.updateBargainState(this.IBargain,this.OBargain,'5');
		promise.then((data)=>{},(data)=>{console.warn("更改用户状态异常");});
		this.btnState.bargain = false;
		this.btnState.publish = false;
		this.btnState.reject = false;
		this.btnState.deal = false;
	}
	/*报价成交*/
	deal(){
		let promise = this.chatroomService.updateBargainState(this.IBargain,this.OBargain,'3');
		promise.then((data)=>{},(data)=>{console.warn("更改用户状态异常");});
		this.btnState.bargain = false;
		this.btnState.publish = false;
		this.btnState.reject = false;
		this.btnState.deal = false;
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
							this.sendMsg(curQuote);
							that._refreshBargainList();
						}
					},(data)=>{
						console.warn("发送报价异常");
					});
				}
			},that);
		}, function () {
			that.$log.info('Modal dismissed at: ' + new Date());
		});
	}
	/*发布报价*/
	publishBargain(){
		let y = this.__y(this.OBargain.yield,false),
			p = this.__p(this.OBargain.netprc,false),
			n = this.__n(this.OBargain.num,false),
			s = this.OBargain.setamt;
		let promise = this.chatroomService.publishBargain(
			this.IBargain,
			y,p,n,s
		);
		promise.then((data)=>{
			this._refreshBargainDetail();
			this._refreshBargainList();
			this._refreshBargainHistory();
		},(data)=>{
			console.warn("添加议价明细异常");
		});
		this.sendMsg({
			'ext_msg_type':'21',
			'ext_message':'您收到一条议价',
			'bondid':this.IBargain.bondid,//债券id
			'bondShrtnm':this.IBargain.bondShrtnm,//债券简称
			'bondCd':this.IBargain.bondCd,//债券编码
			'drc':this.IBargain.drc,//报价方向
			'yldrto':this.__y(this.OBargain.yield,false),//议价收益率
			'netprc':this.__p(this.OBargain.netprc,false),//议价净价
			'num':this.__n(this.OBargain.num,false),//议价数量
			'bondOfrid':this.OBargain.bondOfrid,//报价id
			'bondNegtprcid':this.IBargain.bondNegtprcid//议价id
		});
	}

	/*刷新议价记录（议价对象）*/
	_refreshBargainHistory(userId){//userId:议价用户
		let promise = this.chatroomService.getBargainHistory(userId);
		promise.then((data)=>{
			this.bargainHistory = data.data.data;
		},(data)=>{
			console.warn("更改用户状态异常");
		});
	}
	
	/*向聊天列表追加信息*/
	popMsg(ext,msg,flag){
		if(ext && ext.ext_msg_type){
			switch(ext.ext_msg_type){
				case "0"://无扩展消息
					this.chatcontent.push({
						type:flag+'text',
						message:msg
					});
					break;
				case "1":break;//添加好友
				case "2":break;//解除好友关系
				case "3":break;//群内添加人
				case "4":break;//群内踢人
				case "5":break;//解散群-无法实现
				case "6":break;//退出群-主动退群无法实现
				case "7":break;//创建群
				case "8":break;//修改群名称
				case "9":break;//修改群公告
				case "10":break;//修改群头像
				case "11":break;//群主设置/取消群成员
				case "20"://发送报价
					this.chatcontent.push({
						type:flag+'quote',
						message:ext
					});
					break;
				case "21"://发送议价
					this.chatcontent.push({
						type:flag+'quote',
						message:ext
					});
					break;
				case "22":break;//发送金币
				case "23":break;//拒绝报价
				case "24":break;//交易报价
				case "25":break;//撤销报价
				case "26":break;//报价已交易
				case "27":break;//修改报价
			}
		}else{
			this.chatcontent.push({
				type:flag+'text',
				message:msg
			});
		}
		/*倒计时*/
		/*if(ext&&(ext.ext_msg_type=="20"||ext.ext_msg_type=="21")){
			if(ext.udtTm>0){
				var curTimer = this.$interval(()=>{
					ext.udtTm -= 1000;
					if(ext.udtTm<=0){
						this.$interval.cancel(curTimer);
						ext.udtTm = '已过期';
					}
				}, 1000);
			}else{
				ext.udtTm = '已过期';
			}
			this.timers.push(curTimer);
		}*/
		/*滚动条*/
		this.chatContentScroll();
	}
	/*_clearTimerList(){
		this.timers.forEach((item,index)=>{
			this.$interval.cancel(item);
		});
	}*/
	/*发送信息*/
	sendMsg(extObj){
		var id = this.conn.getUniqueId();		// 生成本地消息id
		var msg = new WebIM.message('txt', id);	// 创建文本消息
		let msgBody = {
			msg: this.message,					// 消息内容
			from: BONDCONFIG.USERINFO.uid,
			//接收消息对象（用户id）
			to: this.OBargain.negtprcUserId||BONDCONFIG.USERINFO.uid,
			ext: extObj,
			roomType: false,
			success: function (id, serverMsgId) {
				console.log('成功发送个人信息');
			}
		};
		msg.set(msgBody);
		msg.body.chatType = 'singleChat';
		if(!extObj && this.message===""){
			alert('发送内容为空');
			return false;
		}
		// debugger;
		this.popMsg(extObj,this.message,'o');
		this.conn.send(msg.body);
		this.cacheChatList(msgBody,'o');
		if(!extObj){
			this.message = "";
		}
	}
	/*缓存聊天列表*/
	cacheChatList(message,io){
		message.iotype = io;
		if(this.chatCache.length>0){
			let hasUser = false;
			this.chatCache.forEach((item,index,arr)=>{
				if(item.userId==(io==="i"?message.from:message.to)){
					item.chatcontent.push(message);
					hasUser = true;
				}
			});
			if(!hasUser){
				this.chatCache.push({
					userId:message.from,
					chatcontent:[message]
				});
			}
		}else{
			this.chatCache.push({
				userId:message.from,
				chatcontent:[message]
			});
		}
	}

	/*点击聊天列表的报价*/
	showCurBargain(chat){
		let curTime = new Date().getTime();
		chat.message.udtTm = curTime;
		this._showBargainMessage(chat.message);
	}
	/*环信初始化*/
	WebIMInit(){
		this.conn = new WebIM.connection({
			isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
			https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
			url: WebIM.config.xmppURL,
			isAutoLogin: true,
			heartBeatWait: WebIM.config.heartBeatWait,
			autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
			autoReconnectInterval: WebIM.config.autoReconnectInterval
		});
		var that = this;
		// listern，添加回调函数
		this.conn.listen({
			onOpened: function (message) {//连接成功回调，连接成功后才可以发送消息
				//如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
				//手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
				//所以无需调用conn.setPresence();
				console.log("环信连接成功");
			},
			onTextMessage: (function(){//收到文本消息
				return function (message) {
					// debugger;
					message.ext.udtTm = 5*60*1000;
					that.cacheChatList(message,'i');
					if(that.OBargain.negtprcUserId===message.from){//当前聊天对象id与发送方id相同时
						if(message.ext.ext_msg_type=="20"||message.ext.ext_msg_type=="21"){
							// 刷新议价列表
							that._refreshBargainList();
							// 刷新议价界面
							that._refreshBargainDetail();
							// 刷新议价历史
						}
						that.$scope.$apply(function(){
							// console.info("消息类型:"+message.type);
							// console.info(message.data||"Text");
							// debugger;
							that.popMsg(message.ext,message.data,'i');
						});
					}
				}
			})(),
			onEmojiMessage: function (message) {//收到表情消息
				// 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
				// 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
				// 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
				console.log('收到Emoji表情消息');
				var data = message.data;
				for (var i = 0, l = data.length; i < l; i++) {
					console.log(data[i]);
				}
			},
			onPictureMessage: function (message) {//收到图片消息
				console.log('收到图片消息');

				var options = {url: message.url};
				options.onFileDownloadComplete = function () {
					// 图片下载成功
					console.log('Image download complete!');
				};
				options.onFileDownloadError = function () {
					// 图片下载失败
					console.log('Image download failed!');
				};
				WebIM.utils.download.call(this.conn, options);       // 意义待查
			},
			onCmdMessage: function (message) {//收到命令消息
				console.log('收到命令消息');
			},
			onAudioMessage: function (message) {//收到音频消息
				console.log("Audio");
			},
			onLocationMessage: function (message) {//收到位置消息
				console.log("Location");
			},
			onFileMessage: function (message) {//收到文件消息
				console.log("File");
			},
			onVideoMessage: function (message) {//收到视频消息
				var node = document.getElementById('privateVideo');
				var option = {
					url: message.url,
					headers: {
						'Accept': 'audio/mp4'
					},
					onFileDownloadComplete: function (response) {
						var objectURL = WebIM.utils.parseDownloadResponse.call(this.conn, response);
						node.src = objectURL;
					},
					onFileDownloadError: function () {
						console.log('File down load error.')
					}
				};
				WebIM.utils.download.call(this.conn, option);
			},
			onPresence: function (message) {
				switch (message.type) {
					case 'subscribe':// 对方请求添加好友
						// 同意对方添加好友
						document.getElementById('agreeFriends').onclick = function (message) {
							this.conn.subscribed({
								to: 'asdfghj',
								message: "[resp:true]"
							});
							// 需要反向添加对方好友
							this.conn.subscribe({
								to: message.from,
								message: "[resp:true]"
							});
						};
						// 拒绝对方添加好友
						document.getElementById('rejectFriends').onclick = function (message) {
							this.conn.unsubscribed({
								to: message.from,
								message: "rejectAddFriend"// 拒绝添加好友回复信息
							});
						};
						break;
					case 'subscribed':// 对方同意添加好友，已方同意添加好友
						break;
					case 'unsubscribe':// 对方删除好友
						break;
					case 'unsubscribed':// 被拒绝添加好友，或被对方删除好友成功
						break;
					case 'joinChatRoomSuccess':// 成功加入聊天室
						console.log('join chat room success');
						break;
					case 'joinChatRoomFaild':// 加入聊天室失败
						console.log('join chat room faild');
						break;
					case 'joinPublicGroupSuccess':// 意义待查
						console.log('join public group success', message.from);
						break;
				}
			},//收到联系人订阅请求（加好友）、处理群组、聊天室被踢解散等消息
			onRoster: function (message) {//处理好友申请
				console.log('Roster');
			},
			onInviteMessage: function (message) {//处理群组邀请
				console.log('Invite');
			},
			onOnline: function () {//本机网络连接成功
				console.log('onLine');
			},
			onOffline: function () {//本机网络掉线
				console.log('offline');
			},
			onError: function (message) {//失败回调
				console.log('Error');
			},
			onBlacklistUpdate: function (list) {// 黑名单变动
				//查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
				console.log(list);
			}
		});
	}
	/*净价收益率反显*/
	__y(key,bool){
		if(bool){
			let reg =/\./;
			if(key ){key = key*100+'';
				if(reg.test(key)){
					key = key.split('.')[0]+ "." + (key.split('.')[1] ?  key.split('.')[1].substr(0,4) : '00');
				}
			}
		}else{
			return key/100;
		}
		return key;
	}
	__p(key,bool){
		if(bool){
			key = key.split('.')[0]+ "." + key.split('.')[1].substr(0,4);
		}
		return key;
	}
	__n(key,bool){
		if(bool){
			key = parseInt(key/10000);
		}else{
			return key*10000;
		}
		return key;
	}
	yieldKeyup(){
		let yld = this.__y(this.OBargain.yield,false);
		let num = this.__n(this.OBargain.num,false);
		let promise = this.chatroomService.opYield(
			this.IBargain.bondid,
			num,
			yld
		);
		promise.then((data)=>{
			if(data.data.status==="0"){
				this.OBargain.netprc = this.__p(data.data.data.cleanPrice,true);
				this.OBargain.setamt = data.data.data.settlementAmount;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{});
	}
	netprcKeyup(){
		let num = this.__n(this.OBargain.num,false);
		let prc = this.__p(this.OBargain.netprc,false);
		let promise = this.chatroomService.opNetprc(
			this.IBargain.bondid,
			num,
			prc
		);
		promise.then((data)=>{
			if(data.data.status==="0"){
				this.OBargain.yield = this.__y(data.data.data.yield,true);
				this.OBargain.setamt = data.data.data.settlementAmount;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{});
	}
	numKeyup(){
		let yld = this.__y(this.OBargain.yield,false);
		let num = this.__n(this.OBargain.num,false);
		let promise = this.chatroomService.opNum(
			this.IBargain.bondid,
			num,
			yld
		);
		promise.then((data)=>{
			if(data.data.status==="0"){
				//this.OBargain.netprc = this.__p(data.data.data.cleanPrice,true);
				this.OBargain.setamt = data.data.data.settlementAmount;
			}else{
				alert(data.data.msg);
			}
		},(data)=>{});
	}
	/*UI控制*/
	_btnStateReset(){
		this.btnState = {
			bargain:true,
			publish:true,
			reject:true,
			deal:true
		};
	};
	toggleChatHistory(){//切换是否显示议价记录
		this.showChatHistory = !this.showChatHistory;
	}
	toggleAnimation() {//切换弹窗显示是否使用动画效果
		this.animationsEnabled = !this.animationsEnabled;
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
			objDiv.scrollTop = objDiv.scrollHeight;
		},10);
	}

	_getTimer(timestamp){
		let result={};
		result.interval = (new Date()).getTime()-(new Date(timestamp)).getTime();
		let total = result.interval/1000;
		result.day = parseInt(total / (24*60*60));//计算整数天数
		let afterDay = total - result.day*24*60*60;//取得算出天数后剩余的秒数
		result.hour = parseInt(afterDay/(60*60));//计算整数小时数
		let afterHour = total - result.day*24*60*60 - result.hour*60*60;//取得算出小时数后剩余的秒数
		result.min = parseInt(afterHour/60);//计算整数分
		let afterMin = total - result.day*24*60*60 - result.hour*60*60 - result.min*60;//取得算出分后剩余的秒数
		result.sec = parseInt(afterMin);
		return result;
	}
	_countDownBroadcast(){
		this.$rootScope.$broadcast('count-down-broadcast');
	}
	constructor($rootScope,$scope,$log,$state,$stateParams,$uibModal,$interval,chatroomService) {
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$state = $state;
		this.$uibModal = $uibModal;
		this.$log = $log;
		/*this.$interval = $interval;*/
		this.chatroomService = chatroomService;
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
		this.showChatList = false;
		this.chatCache = [
			/*{
				userid:'',
				chatcontent:[]
			}*/
		];
		this.chatcontent = [//消息记录
			/*{
				type: 'itext',
				message: 'hello',
			},
			{
				type: 'otext',
				message: 'hi',
			},
			{
				type: 'itext',
				message: 'bye',
			},
			{
				type: 'iquote',
				message: {
					bondCd:"120301",
					bondNegtprcid:"7101",
					bondOfrid:"11801",
					bondShrtnm:"03沪轨道[120301]",
					bondid:"61943",
					drc:"1",
					ext_message:"您收到一条新的报价",
					ext_msg_type:"20",
					netprc:"93.3302000000000000",
					num:"350000.0000000000000000",
					yldrto:"0.120001",
				},
			},
			{
				type: 'oquote',
				message: {
					bondCd:"120301",
					bondNegtprcid:"7101",
					bondOfrid:"11801",
					bondShrtnm:"03沪轨道[120301]",
					bondid:"61943",
					drc:"1",
					ext_message:"您收到一条新的报价",
					ext_msg_type:"20",
					netprc:"93.3302000000000000",
					num:"350000.0000000000000000",
					yldrto:"0.120001",
				},
			}*/
		];
		this.WebIMInit();
		//登录环信
		var options = {
			apiUrl: WebIM.config.apiURL,
			user:BONDCONFIG.USERINFO.uid||'107802',
			pwd:"456123",
			appKey: WebIM.config.appkey,
			success: function () {
				console.log('登录环信成功');
			},
			error: function (e) {
				console.warn('登录环信错误');
			}
		};
		this.conn.open(options);
		if(!BONDCONFIG.USERINFO.lid){console.warn('用户未登录');}
		this.chatContentScroll();
		this._btnStateReset();
		this.timers=[];
		/*来自报价大厅的跳转处理*/
		let ofrUserId = this.$state.params.ofrUserId;
		let bondOfrid = this.$state.params.bondOfrid;
		if(ofrUserId && bondOfrid){
			this.showChatList = true;//显示聊天界面
			this.chatcontent = [];//清空聊天列表
			this.OBargain.bondOfrid = bondOfrid;
			this.OBargain.bondNegtprcid = undefined;
			this.OBargain.negtprcUserId = ofrUserId;
			this._refreshBargainDetail();
		}
		/*this.$interval(()=>{
			this._countDownBroadcast();
		},1000);
		this.$scope.$on('count-down-broadcast',(event,args)=>{
			console.log(event);
		});*/
	}

	/*$onChanges(changesObj){
		console.log("changesObj:"+changesObj);
	}
	$doCheck(){
		console.log('doCheck:');
	}
	$onDestroy(){
		console.log('onDestroy:');
	}
	$postLink(){
		console.log('postLink:');
	}*/
	/*register(){//注册环信
		var options = { 
			username: 'webstar_g',
			password: 'webstar_g',
			nickname: 'nickname',
			appKey: WebIM.config.appkey,
			success: function () {
				console.log('success');
			}, 
			error: function () {
				console.log('error');
			}, 
			apiUrl: WebIM.config.apiURL
		}; 
		this.conn.registerUser(options);
	}*/
	/*
	点击议价列表=》获取议价详情+议价详情列表+切换当前议价对象
	点击议价记录=》根据当前议价对象获取议价记录
	收到普通消息=》展示聊天记录
	收到报价消息=》切换当前议价对象+获取议价列表+获取议价详情+获取议价详情列表
	收到议价消息=》切换当前议价对象+获取议价列表+获取议价详情+获取议价详情列表
	点击拒绝=》改状态=》调整按钮状态
	点击交易=》改状态=》调整按钮状态
	点击议价=》出现操作区
	点击发布=》发送议价+获取议价详情列表
	更改数量
	更改利率
	更改净价
	*/
}
ChatroomController.$inject = ['$rootScope','$scope','$log','$state','$stateParams','$uibModal','$interval','chatroomService'];
export default ChatroomController;