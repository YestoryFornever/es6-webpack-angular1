// var BONDCONFIG = require('../../../../../../bond.config.js');
// import 'easemob-websdk/dist/strophe-1.2.8.min.js';
// var WebIM = require('easemob-websdk');
// WebIM.config = require('../../../../../../resource/js/easemob/webim.config.js');

class AcoupondController {
	constructor(acoupondService, $state, $stateParams) {
		"ngInject";
		this.name = 'acoupond';
		this.acoupondService = acoupondService;
		this.$stateParams = $stateParams;


		this.chatcontent = [];
		// 我的好友我的群
		// 1.获取好友列表
		this.friengsgroups = {

		};
		this.friendLists = []; //定义一个变量存放后台返回的好友列表数组

		this.groupList = {
			userId: '',
			// userId: '5501',
			usrAhr: ''
		}
		this.grouplists = []; //定义一个变量存放后台返回的群众列表数组
		this.alls = []; //存放右侧好友列表的数据
		this.all_grounp = []; //存放右侧好友群组的数据
		// 发送
		this.sendId = {
			bondOfrid: '',
			// bondOfrid:'8202',
			negtprcUserId: ''
		};
		// 查找我的好友我的群
		this.searchInfo = {
			queryValue: ''
		};
		this.pppp = {
			bondCd: '', //债券编码
			bondOfrid: '', //报价id
			bondShrtnm: '', //债券简称
			bondid: "", //债券id
			drc: "", //报价方向
			ext_message: "您收到一条新的报价",
			ext_msg_type: "20",
			netprc: "", //净价
			num: "",
			yldrto: "", //收益率
			rsdtrm: "",
			sbjRtg: "",
			ofrUserId: ("" + BONDCONFIG.USERINFO.uid),
			
		};
	}

	$onInit() {
		// let BONDCONFIG = require('../../../../../../bond.config.js');
		this.findId = BONDCONFIG
		this.lid = this.findId.JH.lid;
		console.log(this.lid);
		// 环信初始化
		this.WebIMInit();
		var options = {
			apiUrl: WebIM.config.apiURL,
			user: BONDCONFIG.USERINFO.uid || '107802',
			pwd: "456123",
			appKey: WebIM.config.appkey,
			success: function() {
				console.log('登录环信成功');
			},
			error: function(e) {
				console.warn('登录环信错误');
			}
		};
		this.conn.open(options);
		//当前聊天好友数组列表(与好友、议价等列表交互)
		this.friend = {
			userId: ''
		};
		this.group = {
			userId: ''
		};
		this.message = "你好！";
		this.obj_1 = this.resolve;
		console.log(this.obj_1)
		this.target = false;
		this.target1 = false;
		this.fridentShow();
		this.groupShow();

		//好友
		this.tag == false;
		// 群主
		this.gruop_tag == false;
		// this.queryBondBaseInfo(this.$stateParams.bondid);
		// 初始化函数

		// 初始化我的好友列表
		this.friendgroups();
		// 初始化我的群列表
		this.getLists();
		// this.obj_1=that.dataFriendModal;
		this.bondNegtprcid='';

	}



	// 展开、收起
	doCheck() {
		this.target = !this.target;
		var bx = document.getElementById("box");
		console.log(this.target);

	}
	doCheck1() {
			this.target1 = !this.target1;
			var bx = document.getElementsByClassName("box");
			console.log(this.target1);

		}
		// 关闭搜索
	searchCloce() {
		var inp = document.getElementById("ip");
		inp.value = "";
		// inp.placeholder="16国开10";
		console.log(inp);
	}


	// 弹窗功能
	openDialog() { //打开弹窗
		$(".modal-dialog").slideDown("slow");
	}
	closeDialog() { //关闭弹窗
			this.modalInstance.close();
			// $(".modal-content").slideUp("slow");
			this.friendgroups();
			// 初始化我的群列表
			this.getLists();

		}
		// 关闭已选择用户群
	cancelClose(id) {
			// var str=this.all_grounp.join('')
			var arr3 = [];

			for (var i = 0; i < this.all_grounp.length; i++) {
				if (this.all_grounp[i].groupGrpid != id) {
					arr3.push(this.all_grounp[i]);
					// this.all_grounp=this.all_grounp.splice(i)
				}
			}
			for (var i = 0; i < this.grouplists.length; i++) {
				if (this.grouplists[i].groupGrpid == id) {
					var arr1 = $(".checkAll_group_body input");
					arr1[i].checked = false;
				}
			}
			this.all_grounp = arr3;
			console.log(this.all_grounp);
			// this.groupChecked();
			// $(".rtClose").remove();
		}
		// 关闭已选择好友
	fdClose(id) {
			var arr4 = [];

			for (var i = 0; i < this.alls.length; i++) {
				if (this.alls[i].oppositeUserId != id) {
					arr4.push(this.alls[i]);
					// this.all_grounp=this.all_grounp.splice(i)
				}
			}
			for (var i = 0; i < this.friendLists.length; i++) {
				if (this.friendLists[i].oppositeUserId == id) {
					var arr = $(".checkBody input");
					arr[i].checked = false;
				}
			}
			this.alls = arr4;
			console.log(this.alls);



			// $('.fdrtClose').remove();
		}
		// 我的好友我的群
		// 1.获取好友列表
	friendgroups() {

			// this.queryBondBaseInfo.bondid=id;
			let promise = this.acoupondService.myFriends(this.friengsgroups);
			promise.then((res) => {
				console.log(res);

				if (res.data) {
					if (res.data.status == '0') {
						console.log(res.data.data);
						for (var i in res.data.data) {
							if (res.data.data[i].realCertifyState == '3') {
								res.data.data[i].realCertifyState = "实名认证";
							} else if (res.data.data[i].realCertifyState == '0') {
								res.data.data[i].realCertifyState = "未认证";
							} else if (res.data.data[i].realCertifyState == '1') {
								res.data.data[i].realCertifyState = "认证中";
							}
						}
						this.friendLists = res.data.data;
						// this.grouplists=res.data.data.userRep052VOList;
						console.log(this.friendLists);
						// console.log(this.grouplists);

					} else {

					}
				} else {
					alert(res.msg)
				}



			}, (data) => {

			});
		}
		//获取群列表
	getLists() {
			// this.groupList.userId=this.lid;
			let promise = this.acoupondService.groupMy(this.groupList);
			promise.then((res) => {
				console.log(res);

				if (res.data) {
					if (res.data.status == '0') {
						this.grouplists = res.data.data;
						console.log(this.grouplists);


					} else {

					}
				} else {
					alert(res.msg)
				}



			}, (data) => {

			});
		}
		// 查询我的好友我的群

	searchAllGroup() {
			console.log(this.searchInfo);
			let promise = this.acoupondService.searchFriendsGroups(this.searchInfo);
			promise.then((res) => {
				console.log(res);
				if (res.data) {
					if (res.data.status == '0') {

						console.log(res.data.data.userRep051VOList[0]);
						for (var i = 0; i < res.data.data.userRep051VOList.length; i++) {
							if (res.data.data.userRep051VOList[i]) {
								if (res.data.data.userRep051VOList[i]['realCertifyState'] == '3') {
									res.data.data.userRep051VOList[i]['realCertifyState'] = "实名认证";
								} else if (res.data.data.userRep051VOList[i]['realCertifyState'] == '0') {
									res.data.data.userRep051VOList[i]['realCertifyState'] = "未认证";
								} else if (res.data.data.userRep051VOList[i]['realCertifyState'] == '1') {
									res.data.data.userRep051VOList[i]['realCertifyState'] = "认证中";
								}

							}



						}
						this.friendLists = res.data.data.userRep051VOList;

						this.grouplists = res.data.data.userRep052VOList;

					} else {

					}
				} else {
					alert(res.msg)
				}



			}, (data) => {

			});
		}
		// 右侧列表的数据
		// 点击复选框获取好友信息数据
	checked() {
			var arr = $(".checkBody input");
			this.alls = [];
			// console.log(arr);
			for (var i = 0; i < arr.length; i++) {
				console.log(arr[i]);
				console.log(arr[i].checked);
				if (arr[i].checked) {
					if (this.alls.indexOf(this.friendLists[i]) == -1) {
						this.alls.push(this.friendLists[i])
					}

				}
				console.log(this.alls);

			}

		}
		// 点击复选框获取群组信息数据
	groupChecked() {
			this.tg = !this.tg;

			var arr1 = $(".checkAll_group_body input");
			this.all_grounp = [];
			for (var i = 0; i < arr1.length; i++) {
				// console.log(arr1[i]);
				// console.log(arr1[i].checked);
				if (arr1[i].checked) {
					if (this.all_grounp.indexOf(this.grouplists[i]) == -1) {
						this.all_grounp.push(this.grouplists[i])
					}

				}
				console.log(this.all_grounp);
			}

		}
		// 发送报价
	sendOffer() {
		this.sendId.bondOfrid = this.obj_1.friendModal.friendObj.bondOfrid;
		console.log(this.obj_1.friendModal.friendObj.drc);
		if (this.obj_1.friendModal.friendObj.drc == '卖出') {
			this.obj_1.friendModal.friendObj.drc = 1;
		} else if (this.obj_1.friendModal.friendObj.drc == '买入') {
			this.obj_1.friendModal.friendObj.drc = -1;
		}
		this.pppp.bondCd = this.obj_1.friendModal.friendObj.bondCd; //债券编码
		this.pppp.bondOfrid = this.obj_1.friendModal.friendObj.bondOfrid; //报价id
		this.pppp.bondShrtnm = this.obj_1.friendModal.friendObj.bondShrtnm; //债券简称
		this.pppp.bondid = this.obj_1.friendModal.friendObj.bondid; //债券id
		this.pppp.drc = this.obj_1.friendModal.friendObj.drc; //报价

		this.pppp.netprc = this.obj_1.friendModal.friendObj.netprc; //净价
		this.pppp.num = this.obj_1.friendModal.friendObj.num;
		this.pppp.yldrto = this.obj_1.friendModal.friendObj.yldrto; //收益率
		this.pppp.rsdtrm = this.obj_1.friendModal.friendObj.rsdtrm;
		this.pppp.sbjRtg = this.obj_1.friendModal.friendObj.sbjRtg;

		var array_1 = [];
		var array_2 = [];
		for (var i = 0; i < this.alls.length; i++) {
			array_1.push(this.alls[i].oppositeUserId)
		}
		//判断是选择好友还是选择群组

		for (var i = 0; i < this.all_grounp.length; i++) {
			array_2.push(this.all_grounp[i].ringlGroupid)
		}
		if (array_1.length > 0) {
			this.sendId.negtprcUserId = array_1.join(',');
			// console.log(this.sendId);
			let promise = this.acoupondService.sendBondPrice(this.sendId);
			promise.then((res) => {
				console.log(res);
				if (res.data) {
					if (res.data.status == '0') {

						// if(res.data.data.length>1){
						let arr_arr=[];
						arr_arr=res.data.data.split(',');
							for(var i=0;i<arr_arr.length;i++){
								
								this.pppp.bondNegtprcid = arr_arr[i];
								console.log(arr_arr[i]);
								this.bondNegtprcid=arr_arr[i];
								// debugger;
								this.sendMsg(this.pppp, array_1[i]);
							}
						// }
						// this.pppp.bondNegtprcid = res.data.data;

						
					}
				} else {
					alert(res.msg)
				}

				this.closeDialog();


			}, (data) => {

			});

		}
		if (array_2.length > 0) {

			// var str_one = array_2.join(',')
			for(var i=0,len=array_2.length;i<len;i++){
				debugger;
				console.log(array_2[i]);
				this.sendGroupText(this.pppp, array_2[i]);
			}
			
			this.closeDialog();
		}
		console.log(this.sendId);
	}

	/*向聊天列表追加信息*/
	popMsg(ext, msg, flag) {
		if (ext && ext.ext_msg_type) {
			switch (ext.ext_msg_type) {
				case "0": //无扩展消息
					this.chatcontent.push({
						type: flag + 'text',
						message: msg
					});
					break;
				case "1":
					break; //添加好友
				case "2":
					break; //解除好友关系
				case "3":
					break; //群内添加人
				case "4":
					break; //群内踢人
				case "5":
					break; //解散群-无法实现
				case "6":
					break; //退出群-主动退群无法实现
				case "7":
					break; //创建群
				case "8":
					break; //修改群名称
				case "9":
					break; //修改群公告
				case "10":
					break; //修改群头像
				case "11":
					break; //群主设置/取消群成员
				case "20": //发送报价
					this.chatcontent.push({
						type: flag + 'quote',
						message: ext
					});
					break;
				case "21": //发送议价
					this.chatcontent.push({
						type: flag + 'quote',
						message: ext
					});
					break;
				case "22":
					break; //发送金币
				case "23":
					break; //拒绝报价
				case "24":
					break; //交易报价
				case "25":
					break; //撤销报价
				case "26":
					break; //报价已交易
				case "27":
					break; //修改报价
			}
		} else {
			this.chatcontent.push({
				type: flag + 'text',
				message: msg
			});
		}

		/*倒计时*/
		// if(ext&&(ext.ext_msg_type=="20"||ext.ext_msg_type=="21")){
		// debugger;
		// ext.timer = new Timer(ext.udtTm);
		// }
		/*滚动条*/
		// this.chatContentScroll();
	}


	sendMsg(extObj, str) { //发送普通消
		console.log(extObj);
		
		var arr = str.split(',');
		var id = this.conn.getUniqueId();
		var msg = new WebIM.message('txt', id);
		for (var i = 0, len = arr.length; i < len; i++) {
			// this.friend.userId = arr[i];
			let msgBody = {
				msg: this.message, // 消息内容
				from: BONDCONFIG.USERINFO.uid,
				//接收消息对象（用户id）
				to: arr[i],
				ext: extObj,
				roomType: false,
				success: function(id, serverMsgId) {
					alert('报价发送成功');
				}
			};
			msg.set(msgBody);
			msg.body.chatType = 'singleChat';
			this.conn.send(msg.body);
		}

	}
	sendGroupText(extObj, id) {//发送群消息
		console.log(extObj);
		console.log(id);
		var id = this.conn.getUniqueId(); // 生成本地消息id
		var msg = new WebIM.message('txt', id); // 创建文本消息
		var msgBody = {
			msg: this.message, // 消息内容
			from: BONDCONFIG.USERINFO.uid,
			to: id, // 接收消息对象(群组id)
			ext: extObj,
			roomType: false,
			// chatType:'GroupChat',
			chatType: 'chatRoom',
			success: function() {
				alert('报价发送成功');
			}
			
		};
		msg.set(msgBody);
		msg.setGroup('groupchat');
		this.conn.send(msg.body);
		// }
	}




	WebIMInit() { //环信初始化
		// debugger;
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
			onOpened: function(message) { //连接成功回调，连接成功后才可以发送消息
				//如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
				//手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
				//所以无需调用conn.setPresence();
				console.log("环信连接成功");
			},
			onTextMessage: (function() { //收到文本消息
				return function(message) {
					// debugger;
					that.cacheChatList(message, 'i');
					if (that.OBargain.negtprcUserId === message.from) { //当前聊天对象id与发送方id相同时
						if (message.ext.ext_msg_type == "20" || message.ext.ext_msg_type == "21") {
							// 刷新议价列表
							that._refreshBargainList();
							// 刷新议价界面
							that._refreshBargainDetail();
							// 刷新议价历史
						}
						that.$scope.$apply(function() {
							// console.info("消息类型:"+message.type);
							// console.info(message.data||"Text");
							// debugger;
							that.popMsg(message.ext, message.data, 'i');
						});
					}
				}
			})(),
			onEmojiMessage: function(message) { //收到表情消息
				// 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
				// 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
				// 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
				console.log('收到Emoji表情消息');
				var data = message.data;
				for (var i = 0, l = data.length; i < l; i++) {
					console.log(data[i]);
				}
			},
			onPictureMessage: function(message) { //收到图片消息
				console.log('收到图片消息');

				var options = {
					url: message.url
				};
				options.onFileDownloadComplete = function() {
					// 图片下载成功
					console.log('Image download complete!');
				};
				options.onFileDownloadError = function() {
					// 图片下载失败
					console.log('Image download failed!');
				};
				WebIM.utils.download.call(this.conn, options); // 意义待查
			},
			onCmdMessage: function(message) { //收到命令消息
				console.log('收到命令消息');
			},
			onAudioMessage: function(message) { //收到音频消息
				console.log("Audio");
			},
			onLocationMessage: function(message) { //收到位置消息
				console.log("Location");
			},
			onFileMessage: function(message) { //收到文件消息
				console.log("File");
			},
			onVideoMessage: function(message) { //收到视频消息
				var node = document.getElementById('privateVideo');
				var option = {
					url: message.url,
					headers: {
						'Accept': 'audio/mp4'
					},
					onFileDownloadComplete: function(response) {
						var objectURL = WebIM.utils.parseDownloadResponse.call(this.conn, response);
						node.src = objectURL;
					},
					onFileDownloadError: function() {
						console.log('File down load error.')
					}
				};
				WebIM.utils.download.call(this.conn, option);
			},
			onPresence: function(message) {
				switch (message.type) {
					case 'subscribe': // 对方请求添加好友
						// 同意对方添加好友
						document.getElementById('agreeFriends').onclick = function(message) {
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
						document.getElementById('rejectFriends').onclick = function(message) {
							this.conn.unsubscribed({
								to: message.from,
								message: "rejectAddFriend" // 拒绝添加好友回复信息
							});
						};
						break;
					case 'subscribed': // 对方同意添加好友，已方同意添加好友
						break;
					case 'unsubscribe': // 对方删除好友
						break;
					case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
						break;
					case 'joinChatRoomSuccess': // 成功加入聊天室
						console.log('join chat room success');
						break;
					case 'joinChatRoomFaild': // 加入聊天室失败
						console.log('join chat room faild');
						break;
					case 'joinPublicGroupSuccess': // 意义待查
						console.log('join public group success', message.from);
						break;
				}
			}, //收到联系人订阅请求（加好友）、处理群组、聊天室被踢解散等消息
			onRoster: function(message) { //处理好友申请
				console.log('Roster');
			},
			onInviteMessage: function(message) { //处理群组邀请
				console.log('Invite');
			},
			onOnline: function() { //本机网络连接成功
				console.log('onLine');
			},
			onOffline: function() { //本机网络掉线
				console.log('offline');
			},
			onError: function(message) { //失败回调
				console.log('Error');
			},
			onBlacklistUpdate: function(list) { // 黑名单变动
				//查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
				console.log(list);
			}
		});
	}



	// 好友展开
	fridentShow() {
		let tag = this.tag;
		// console.log(tag)
		if (tag == true) {
			$("#frds").slideDown(1000);
		} else {
			$("#frds").slideUp(1000);
		}
		return this.tag = !tag;


	}



	// 2.我的群主
	// 2.1
	// 群主展开
	groupShow() {
			let gruop_tag = this.gruop_tag;
			if (gruop_tag == true) {
				$(".groupAll").slideDown(1000);
			} else {
				$(".groupAll").slideUp(1000);
			}
			return this.gruop_tag = !gruop_tag;

		}
		// checkedGroup(){
		// 	$(".checkAll_group").click(function(){//群组全选
		//            var isChecked=$(this).prop("checked");
		//           $('.checkAll_group_body').find('input').prop("checked",isChecked) ;
		//         });
		// 		$(".checkAll_group_body>li>input").click(function(){
		// 		            var all=$(".checkAll_group_body>li>input").length;

	// 		            var num=$(".checkAll_group_body>li>input:checked").length;
	// 		            if(num===all){//点击子选项判断是否为全选
	// 		                $(".checkAll_group").prop("checked",true);

	// 		            }
	// 		            else{

	// 		                $(".checkAll_group ").prop("checked",false);
	// 		            }
	// 		        });

	// }


}