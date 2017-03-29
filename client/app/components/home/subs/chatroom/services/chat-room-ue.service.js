app.factory('chatroomUEService',['$http','$q',function($http,$q){
	return {
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
		},
		__p(key,bool){
			if(bool){
				key = key.split('.')[0]+ "." + key.split('.')[1].substr(0,4);
			}
			return key;
		},
		__n(key,bool){
			if(bool){
				key = parseInt(key/10000);
			}else{
				return key*10000;
			}
			return key;
		},
		createMsgObj(ext,msg,flag){
			let result = false;
			if(ext && (ext.ext_msg_type||ext.bond_type)){
				let type = ext.ext_msg_type||ext.bond_type;
				switch(type){
					case "0"://无扩展消息
						if(msg){
							msg = msg.split("\n");
						}
						result = {
							type:flag+'text',
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
							type:flag+'quote',
							message:ext
						};
						break;
					case "21"://发送议价
						result = {
							type:flag+'quote',
							message:ext
						};
						break;
					case "22":break;//发送金币
					case "23":
						result = {
							type:flag,
							message:msg
						};
						break;//拒绝报价
					case "24":
						result = {
							type:flag,
							message:msg
						};
						break;//交易报价
					case "25":
						result = {
							type:flag,
							message:msg
						};
						break;//撤销报价
					case "26":
						result = {
							type:flag,
							message:msg
						};
						break;//报价已交易
					case "27":
						result = {
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
					type:flag+'text',
					message:msg
				};
			}
			// debugger;
			return result;
		}
	}
}]);