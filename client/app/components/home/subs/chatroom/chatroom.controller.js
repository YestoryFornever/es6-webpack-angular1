var BONDCONFIG = require('../../../../../bond.config.js');
import 'easemob-websdk/dist/strophe-1.2.8.min.js';
var WebIM = require('easemob-websdk');
WebIM.config = require('../../../../../resource/js/easemob/webim.config.js');

import ModalInstanceTemplate from './subs/quote-modal/quote-modal.html';
import ModalInstanceCtrl from './subs/quote-modal/quote-modal.controller';

class ChatroomController {
	constructor($scope,$log,$state,$stateParams,$uibModal,chatroomService) {
		this.$scope = $scope;
		this.$state = $state;
		this.$uibModal = $uibModal;
		this.$log = $log;
		this.chatroomService = chatroomService;
	}
	$onInit(){
		this.name = 'chatroom';//组件名称
		this.$scope.bargain="议价记录";
		this.dataForModal = {//弹窗交互数据
			items:['item1', 'item2', 'item3'],
			quoteList:[]
		};
		this.quoteListChecked = [];//待发送报价列表
		this.animationsEnabled = true;//展示弹窗是否显示动画
		this.friend={};//当前聊天好友(与好友、议价等列表交互)
		this.showChatHistory = false;//显示议价记录
		this.message = "世界你好";//待发送信息
		this.bargainfold = false;//隐藏议价界面
		this.curBargain = {
			bondNegtprcid:'',
			bondid:'',
			userId:''
		};
		this.curBargainDetail = {
			yield:'',
			netprc:'',
			num:'',
			setamt:'',
			bondOfrid:'',//债券报价id
			bondNegtprcid:'',//债券议价id
			negtprcUserId:'',//议价用户
			iconUrl:'../../../../../resource/images/img_defaulthead_group.png',
			bondid:'',//债券id
		};
		this.bargainHistory = [];

		this.chatcontent = [//消息记录
			{
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
			}
		];
		this.WebIMInit();
		//console.log(BONDCONFIG.USERINFO.uid);
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
		if(BONDCONFIG.USERINFO.lid){
			// this.getFriends();
			this.queryQuoteList();
		}else{
			console.warn('用户未登录');
		}
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
	toggleChatHistory(){//切换是否显示议价记录
		// console.log(this.showChatHistory);
		this.showChatHistory = !this.showChatHistory;
	}
	toggleAnimation() {//切换弹窗显示是否使用动画效果
		this.animationsEnabled = !this.animationsEnabled;
	}
	popMsg(ext,msg,flag){//向聊天列表追加信息
		if(ext && ext.ext_msg_type){
			switch(ext.ext_msg_type){
				case "0"://无扩展消息
					this.chatcontent.push({
						type:flag+'text',
						message:msg
					});
					;break;
				case "1"://添加好友
					break;
				case "2"://解除好友关系
					break;
				case "3"://群内添加人
					break;
				case "4"://群内踢人
					break;
				case "5"://解散群-无法实现
					break;
				case "6"://退出群-主动退群无法实现
					break;
				case "7"://创建群
					break;
				case "8"://修改群名称
					break;
				case "9"://修改群公告
					break;
				case "10"://修改群头像
					break;
				case "11"://群主设置/取消群成员
					break;
				case "20"://发送报价
					this.chatcontent.push({
						type:flag+'quote',
						message:ext
					});
					/*bondid ==> 债券id
					bondShrtnm ==> 债券简称
					bondCd ==> 债券编码
					drc ==> 报价方向
					netprc ==> 净价
					yldrto ==> 收益率
					num ==> 数量
					bondOfrid ==> 报价id
					bondNegtprcid ==> 议价id*/
					break;
				case "21"://发送议价
					/*bondid ==> 债券id
					bondShrtnm ==> 债券简称
					bondCd ==> 债券编码
					drc ==> 报价方向
					netprc ==> 议价净价
					yldrto ==> 议价收益率
					num ==> 议价数量
					bondOfrid ==> 报价id
					bondNegtprcid ==> 议价id*/
					break;
				case "22"://发送金币
					break;
				case "23"://拒绝报价
					break;
				case "24"://交易报价
					break;
				case "25"://撤销报价
					break;
				case "26"://报价已交易
					break;
				case "27"://修改报价
					break;
			}
		}else{
			this.chatcontent.push({
				type:flag+'text',
				message:msg
			});
		}
		
		setTimeout(()=>{
			var objDiv = document.getElementById("chatcontent");
			objDiv.scrollTop = objDiv.scrollHeight;
		},10);
	}
	changeFriend(friend){
		this.chatcontent = [];//清空聊天列表
		this.curBargainDetail.bondOfrid = friend.bondOfrid;
		this.curBargainDetail.iconUrl = friend.iconUrl;
		let promise = this.chatroomService.queryBargainDetail(friend);
		promise.then((data)=>{
			console.log(data.data.data);
			this.curBargain = data.data.data;
			this.curBargainDetail.bondNegtprcid = this.curBargain.bondNegtprcid;
			this.curBargainDetail.bondid = this.curBargain.bondid;
			this.curBargainDetail.userId = this.curBargain.userId;
		},(data)=>{
			console.warn("查询议价详情异常");
		});
		this.getBargainHistory(friend.userId);
	}
	sendMsg(extObj){//发送普通消息
		/*let extObj = {
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
		};*/
		//if(!this.friend.userId){return};
		var id = this.conn.getUniqueId();		// 生成本地消息id
		var msg = new WebIM.message('txt', id);	// 创建文本消息
		let msgBody = {
			msg: this.message,					// 消息内容
			from: BONDCONFIG.USERINFO.uid,
			//接收消息对象（用户id） 用户桂林->114702 username0120
			to: '5501',//'107802',//5501
			//to: this.friend.userId,
			ext: extObj,
			roomType: false,
			success: function (id, serverMsgId) {
				console.log('成功发送个人信息');
			}
		};
		msg.set(msgBody);
		msg.body.chatType = 'singleChat';
		this.popMsg(extObj,this.message,'o');
		this.conn.send(msg.body);
	}
	addBargainDetail(){
		let promise = this.chatroomService.addBargainDetail(this.curBargainDetail);
		promise.then((data)=>{
			console.log(data);
		},(data)=>{
			console.warn("添加议价明细异常");
		});
	}
	openBargainDrop(){
		this.bargainfold = false;
	}
	closeBargainDrop(){
		this.bargainfold = true;
	}
	reject(){
		let promise = this.chatroomService.updateBargainState(this.curBargainDetail,'5');
		promise.then((data)=>{
			console.log(data);
		},(data)=>{
			console.warn("更改用户状态异常");
		});
	}
	deal(){
		let promise = this.chatroomService.updateBargainState(this.curBargainDetail,'3');
		promise.then((data)=>{
			console.log(data);
		},(data)=>{
			console.warn("更改用户状态异常");
		});
	}
	getBargainHistory(userId){
		let promise = this.chatroomService.getBargainHistory(userId);
		promise.then((data)=>{
			console.log(data.data.data);
			this.bargainHistory = data.data.data;
		},(data)=>{
			console.warn("更改用户状态异常");
		});
	}
	sendQuote(){//打开发送报价弹窗
		let that = this;
		var modalInstance = that.$uibModal.open({
			animation: that.animationsEnabled,
			component:'quotemodal',
			// windowClass:'full',
			size: 'xl',//'lg',//'sm',
			resolve: {
				modalData:function(){
					return that.dataForModal;
				}
			}
		}).result.then(function (selectedItem) {
			that.selected = selectedItem;
			let tmplist = that.dataForModal.quoteList;
			tmplist.forEach(function(item,index){
				if(item.checked){
					this.popMsg({
						bondCd:item.bondCd,
						bondNegtprcid:"7101",
						bondOfrid:"11801",
						bondShrtnm:item.bondShrtnm,
						bondid:item.bondid,
						drc:"1",
						ext_message:"您收到一条新的报价",
						ext_msg_type:"20",
						netprc:"93.3302000000000000",
						num:"350000.0000000000000000",
						yldrto:item.yield,
						rsdtrm:item.rsdtrm,
						sbjRtg:item.sbjRtg
					},'','o');
					this.quoteListChecked.push({
						'bondid':item.bondid,
						'drc':item.drc==="买入"?"-1":item.drc==="卖出"?"1":"",
						'num':item.num,
						'yldrto':item.yield,
						'netprc':item.netprc,
						'wthrAnon':item.wthrAnon,
						'wthrListg':item.wthrAnon,
						'rmrk':item.remark
					});
				}
			},that);
			let promise = that.chatroomService.addBatchBondQuote(that.quoteListChecked);
			promise.then((data)=>{
				// debugger;
				console.log(data);
			},(data)=>{
				console.warn("批量新增报价异常");
			});
		}, function () {
			that.$log.info('Modal dismissed at: ' + new Date());
		});
	}
	getFriends(){
		let promise = this.chatroomService.getFriends();
		promise.then((data)=>{
			console.log(data);
		},(data)=>{
			console.warn("用户登录异常");
		});
	}
	queryQuoteList(){
		let promise = this.chatroomService.queryQuoteList();
		promise.then((data)=>{
			console.log(data);
		},(data)=>{
			console.warn("获取议价列表异常");
		});
	}
	//-->
	register(){//注册环信
		var options = { 
			username: 'webstar_g',
			password: 'webstar_g',
			nickname: 'nickname',
			appKey: WebIM.config.appkey,
			success: function () {
				console.log('success');
			}, 
			error: function () {
				console.log('error')
			}, 
			apiUrl: WebIM.config.apiURL
		}; 
		this.conn.registerUser(options);
	}
	test(){
		debugger;
	}
	//-->
	WebIMInit(){//环信初始化
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
					// 在此接收和处理消息，根据message.type区分消息来源，私聊或群组或聊天室
					// debugger;
					that.popMsg(message.ext,message.data,'i');
					that.$scope.$digest();
					console.log("消息类型:"+message.type);
					console.log(message.data||"Text");
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
}
ChatroomController.$inject = ['$scope','$log','$state','$stateParams','$uibModal','chatroomService'];
export default ChatroomController;