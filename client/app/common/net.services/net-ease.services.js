app.factory('NetEaseService',function(ProxyRequestService){
	return {
		//主承
		addMessge(params){//4.1.1存储聊天消息(单条) 
			return ProxyRequestService.post(
				'E_project_base/imChat/addMessge',params,BONDCONFIG.JH
			)
		},
		chatList(params){//4.1.2用户与好友聊天列表 
			return ProxyRequestService.post(
				'E_project_base/imChat/chatList',params,BONDCONFIG.JH
			)
		},
		userChatContent(params){//4.1.3用户与单个好友聊天内容 
			return ProxyRequestService.post(
				'E_project_base/imChat/userChatContent',params,BONDCONFIG.JH
			)
		},
	}
});