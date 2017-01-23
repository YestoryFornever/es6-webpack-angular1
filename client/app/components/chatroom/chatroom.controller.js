import 'easemob-websdk/dist/strophe-1.2.8.min.js';
var WebIM = require('easemob-websdk');
WebIM.config = require('../../../resource/js/easemob/webim.config.js');
class ChatroomController {
	constructor($scope,$stateParams) {
		this.$scope = $scope;
		this.$scope.bargain="��ۼ�¼";
	}
	$onInit(){
		this.name = 'chatroom';
		this.showChatHistory = false;
		this.WebIMInit();
		this.items = [
			{
				name: '�軨Ů',
				snippet: 'С����',
				time:"���� 13:02",
				image:"../../../resource/images/afcat.png",
				checked:true,
				no:1,
			},
			{
				name: '��֬��',
				snippet: 'Ī��ɣ',
				time:"���� 13:02",
				image:"../../../resource/images/afcat.png",
				checked:false,
				no:2,
			},
			{
				name: '��ʮ��',
				snippet: '��֪��',
				time:"���� 13:02",
				image:"../../../resource/images/afcat.png",
				checked:false,
				no:3,
			}
		];
		this.message = "�������";
		this.chatcontent = [
			{
				type: '1',
				message: 'hello',
			},
			{
				type: '2',
				message: 'hi',
			},
			{
				type: '1',
				message: 'bye',
			}
		];
	}
	$onChanges(changesObj){
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
	}
	toggleChatHistory(){
		// console.log(this.showChatHistory);
		this.showChatHistory = !this.showChatHistory;
	}
	sendMsg(){
		var id = this.conn.getUniqueId();                 // ���ɱ�����Ϣid
		var msg = new WebIM.message('txt', id);      // �����ı���Ϣ
		msg.set({
			msg: this.message,                  // ��Ϣ����
			to: 'webstar_g',                          // ������Ϣ�����û�id�� �û�����->114702 username0120
			roomType: false,
			success: function (id, serverMsgId) {
				console.log('send private text Success');
			}
		});
		msg.body.chatType = 'singleChat'; 
		this.popMsg(this.message,'2');
		this.conn.send(msg.body);
	}
	popMsg(msg,type){
		console.log(this.chatcontent);
		this.chatcontent.push({
			type:type,
			message:msg
		});
		setTimeout(()=>{
			var objDiv = document.getElementById("chatcontent");
			objDiv.scrollTop = objDiv.scrollHeight;
		},10);
	}
	login(){
		//��¼
		var options = {
			apiUrl: WebIM.config.apiURL,
			/*user:"5204",
			pwd:"456123",*/
			user:"webstar_g",
			pwd:"webstar_g",
			appKey: WebIM.config.appkey,
			success: function () {
				console.log('success');
			}, 
			error: function (e) {
				console.log('error');
			}
		};
		this.conn.open(options);
	}
	register(){//ע��
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
		console.log(222);
	}
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
		// listern����ӻص�����
		this.conn.listen({
			onOpened: function (message) {          //���ӳɹ��ص������ӳɹ���ſ��Է�����Ϣ
				//���isAutoLogin����Ϊfalse����ô�����ֶ��������ߣ������޷�����Ϣ
				// �ֶ�����ָ���ǵ���conn.setPresence(); �ڱ����У�conn��ʼ��ʱ�ѽ�isAutoLogin����Ϊtrue
				// �����������conn.setPresence();
				console.log("opened");
			},
			onTextMessage: (function(){
				return function (message) {
					// �ڴ˽��պʹ�����Ϣ������message.type������Ϣ��Դ��˽�Ļ�Ⱥ���������
					that.popMsg(message.data,'1');
					that.$scope.$digest();
					console.log("message type:"+message.type);
					console.log(message.data||"Text");
				}
			})(),  //�յ��ı���Ϣ
			onEmojiMessage: function (message) {
				// ��ΪWebIM�����Emoji���Ժ������͵���Ϣ��WebIM.Emoji���ض����ַ�����connection�ͻ��Զ���
				// ��Щ�ַ������������ְ�˳����ϳ�һ�����飬ÿһ������Ԫ�صĽṹΪ{type: 'emoji(����txt)', data:''}
				// ��type='emoji'ʱ��data��ʾ����ͼ���·������type='txt'ʱ��data��ʾ�ı���Ϣ
				console.log('Emoji');
				var data = message.data;
				for (var i = 0, l = data.length; i < l; i++) {
					console.log(data[i]);
				}
			},   //�յ�������Ϣ
			onPictureMessage: function (message) {
				console.log('Picture');

				var options = {url: message.url};
				options.onFileDownloadComplete = function () {
					// ͼƬ���سɹ�
					console.log('Image download complete!');
				};
				options.onFileDownloadError = function () {
					// ͼƬ����ʧ��
					console.log('Image download failed!');
				};
				WebIM.utils.download.call(this.conn, options);       // �������

			}, //�յ�ͼƬ��Ϣ
			onCmdMessage: function (message) {
				console.log('CMD');
			},     //�յ�������Ϣ
			onAudioMessage: function (message) {
				console.log("Audio");
			},   //�յ���Ƶ��Ϣ
			onLocationMessage: function (message) {
				console.log("Location");
			},//�յ�λ����Ϣ
			onFileMessage: function (message) {
				console.log("File");
			},    //�յ��ļ���Ϣ
			onVideoMessage: function (message) {
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
			},   //�յ���Ƶ��Ϣ
			onPresence: function (message) {
				switch (message.type) {
					case 'subscribe':                           // �Է�������Ӻ���
						// ͬ��Է���Ӻ���
						document.getElementById('agreeFriends').onclick = function (message) {
							this.conn.subscribed({
								to: 'asdfghj',
								message: "[resp:true]"
							});
							// ��Ҫ������ӶԷ�����
							this.conn.subscribe({
								to: message.from,
								message: "[resp:true]"
							});
						};
						// �ܾ��Է���Ӻ���
						document.getElementById('rejectFriends').onclick = function (message) {
							this.conn.unsubscribed({
								to: message.from,
								message: "rejectAddFriend"                  // �ܾ���Ӻ��ѻظ���Ϣ
							});
						};

						break;
					case 'subscribed':                          // �Է�ͬ����Ӻ��ѣ��ѷ�ͬ����Ӻ���
						break;
					case 'unsubscribe':                         // �Է�ɾ������
						break;
					case 'unsubscribed':                        // ���ܾ���Ӻ��ѣ��򱻶Է�ɾ�����ѳɹ�
						break;
					case 'joinChatRoomSuccess':                 // �ɹ�����������
						console.log('join chat room success');
						break;
					case 'joinChatRoomFaild':                   // ����������ʧ��
						console.log('join chat room faild');
						break;
					case 'joinPublicGroupSuccess':              // �������
						console.log('join public group success', message.from);
						break;
				}
			},       //�յ���ϵ�˶������󣨼Ӻ��ѣ�������Ⱥ�顢�����ұ��߽�ɢ����Ϣ
			onRoster: function (message) {
				console.log('Roster');
			},         //�����������
			onInviteMessage: function (message) {
				console.log('Invite');
			},  //����Ⱥ������
			onOnline: function () {
				console.log('onLine');
			},                  //�����������ӳɹ�
			onOffline: function () {
				console.log('offline');
			},                 //�����������
			onError: function (message) {
				console.log('Error');
			},           //ʧ�ܻص�
			onBlacklistUpdate: function (list) {
				// ��ѯ�����������������ڣ������ѴӺ������Ƴ�����ص����������list���Ǻ��������е����к�����Ϣ
				console.log(list);
			}     // �������䶯
		});
	}
}
ChatroomController.$inject = ['$scope','$stateParams'];
export default ChatroomController;
