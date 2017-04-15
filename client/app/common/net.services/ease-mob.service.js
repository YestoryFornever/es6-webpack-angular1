app.service('easeMobService',function($rootScope){
	this.register = function(username,password,nickname){//注册环信
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
	};
	this.login = function(){
		this.init();
		//登录环信
		var options = {
			apiUrl: WebIM.config.apiURL,
			user:BONDCONFIG.USERINFO.uid,
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
	};
	this.sendMsg = function(message,extObj,userid){
		var id = this.conn.getUniqueId();		// 生成本地消息id
		var msg = new WebIM.message('txt', id);	// 创建文本消息
		let msgBody = {
			msg: message,					// 消息内容
			from: BONDCONFIG.USERINFO.uid,
			//接收消息对象（用户id）
			to: userid,
			ext: extObj,
			roomType: false,
			success: function (id, serverMsgId) {
				console.log('成功发送个人信息');
			}
		};
		msg.set(msgBody);
		msg.body.chatType = 'singleChat';
		this.conn.send(msg.body);
		this.setCache(msgBody,'o');
	};
	this.sendCmd = function(type,user){
		var id = this.conn.getUniqueId();// 生成本地消息id
		var msg = new WebIM.message('cmd', id);	// 创建文本消息
		msg.set({
			msg: '透传消息',
			from: BONDCONFIG.USERINFO.uid,
			to: user,//接收消息对象
			action : '透传消息',//用户自定义，cmd消息必填
			ext :{
				'bond_type':type
			},//用户自扩展的消息内容（群聊用法相同）
			success: function ( id,serverMsgId){
				console.log('成功发送命令消息');
			}//消息发送成功回调
		});
		this.conn.send(msg.body);
	};
	this.setCache = function(message,io){
		message.iotype = io;
		function curUser(message,io){
			return (io==="i"?message.from:message.to);
		}
		if(Object.prototype.toString.call(this.chatCache)!=='[object Array]')
			this.chatCache=[];
		if(this.chatCache.length>0){
			let hasUser = false;
			this.chatCache.forEach((item,index,arr)=>{
				if(item.userId==curUser(message,io)){
					item.chatcontent.push(message);
					hasUser = true;
				}
			});
			if(!hasUser){
				this.chatCache.push({
					userId:curUser(message,io),
					chatcontent:[message]
				});
			}
		}else{
			this.chatCache.push({
				userId:curUser(message,io),
				chatcontent:[message]
			});
		}
	};
	this.getCache = function(userid){
		if(this.chatCache&&this.chatCache.length>0){//如果存在聊天缓存，依次弹出
			let curChatListUn;
			for(let i=0;i<this.chatCache.length;i++){
				if(this.chatCache[i].userId === userid){
					curChatListUn = this.chatCache[i].chatcontent;
				}
			}
			return curChatListUn;
		}
		return false;
	};
	this.createMsgObj = (ext,msg,flag)=>{
		let result = false;
		if(ext && (ext.ext_msg_type||ext.bond_type)){
			let type = ext.ext_msg_type||ext.bond_type;
			switch(type){
				case "0"://无扩展消息
					if(msg){
						msg = msg.split("\n");
					}
					result = {
						drc:flag,
						type:'text',
						message:msg
					};
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
					result = {
						drc:flag,
						type:'quote',
						message:ext
					};
					break;
				case "21"://发送议价
					result = {
						drc:flag,
						type:'quote',
						message:ext
					};
					break;
				case "22":break;//发送金币
				case "23":
					result = {
						drc:flag,
						type:flag,
						message:msg
					};
					break;//拒绝报价
				case "24":
					result = {
						drc:flag,
						type:flag,
						message:msg
					};
					break;//交易报价
				case "25":
					result = {
						drc:flag,
						type:flag,
						message:msg
					};
					break;//撤销报价
				case "26":
					result = {
						drc:flag,
						type:flag,
						message:msg
					};
					break;//报价已交易
				case "27":
					result = {
						drc:flag,
						type:flag,
						message:msg
					};
					break;//修改报价
			}
		}else{
			if(msg){
				msg = msg.split("\n");
			}
			result = {
				drc:flag,
				type:'text',
				message:msg
			};
		}
		result.time=(new Date().getTime());
		// debugger;
		return result;
	};
	this.hasINIT = false;
	/*环信初始化*/
	this.init = function(){
		if(this.hasINIT)return false;
		this.conn = new WebIM.connection({
			isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
			https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
			url: WebIM.config.xmppURL,
			isAutoLogin: true,
			heartBeatWait: WebIM.config.heartBeatWait,
			autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
			autoReconnectInterval: WebIM.config.autoReconnectInterval
		});
		// var that = this;
		// listern，添加回调函数
		this.conn.listen({
			onOpened: function (message) {//连接成功回调，连接成功后才可以发送消息
				//如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
				//手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
				//所以无需调用conn.setPresence();
				console.log("环信连接成功");
			},
			//onTextMessage:text, //收到文本消息
			onTextMessage: function(message){
				$rootScope.$broadcast('ease:msg',message);
			},
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
			onCmdMessage: function(message){
				$rootScope.$broadcast('ease:cmd',message);
			},//收到命令消息
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
		this.hasINIT = true;
	};
});