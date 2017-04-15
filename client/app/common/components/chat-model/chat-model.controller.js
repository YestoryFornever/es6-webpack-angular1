class ChatModelController {
	constructor($scope,$timeout,easeMobService,ChatModelService) {
		"ngInject";
		this.$scope = $scope;
		this.$timeout = $timeout;
		this.easeMobService = easeMobService;
		this.ChatModelService = ChatModelService;
	}
	$onInit(){
		this.easeMobService.login();
		this.msg = {
			isSingle:true,
			message:'',
			messages:[
				/*{drc:'i',type:'text',time:1491551960162,message:["asdf","qwer"]},
				{drc:'o',type:'text',time:1491551960162,message:["asdf","qwer"]},
				{drc:'i',type:'text',time:1491551960162,message:["asdf","qwer"]},
				{drc:'o',type:'text',time:1491551960162,message:["asdf","qwer"]}*/
			],
			scrollHeight:296
		};
		this.user = {
			single:this.userSingle,
			multiple:this.userMultiple
		};
		// console.log(this.user);
		/*this._option = Object.assign({
			width:'3.8rem',
			height:'4.5rem'
		},this.$scope.$eval(this.chatOption));
		this.styleObj = {
			width:this._option.width,
			height:this._option.height
		};*/
		this.resetScrollHeight()
		this.$scope.$on('ease:msg',(event,message)=>{
			/*this.state.chat.num!=-1&&this.updateMsgNum(-1);//对方回复消息后，消息条数限制置为-1*/
			if(this.userSingle==message.from&&BONDCONFIG.USERINFO.uid==message.to){//当前聊天对象id与发送方id相同时
				this.easeMobService.setCache(message,'i');
				this.$scope.$apply(()=>{
					this.popMsg(message.ext,message.data,'i');
				});
			}
			if(this.userSingle==message.to&&BONDCONFIG.USERINFO.uid==message.from){//当前聊天对象id与接收方id相同时,多端同步
				this.easeMobService.setCache(message,'o');
				this.$scope.$apply(()=>{
					this.popMsg(message.ext,message.data,'o');
				});
			};
		});
		// this.getSingleUserInfo(new Array(this.userSingle));
		this.$scope.$watch('$ctrl.userSingle',newv=>{
			this.user.single = newv;
			if(this.msg.isSingle){
				this.msg.messages = [];
				let curChatListUn = this.easeMobService.getCache(newv);
				if(curChatListUn&&curChatListUn.length>0){
					curChatListUn.forEach((item,index)=>{
						let m = item.iotype==="i"?item.data:item.msg;
						this.popMsg(item.ext,m,item.iotype);
					});
				}
				this.getSingleUserInfo();
			}
		});
		this.getMultipleUserInfo();
		this.$scope.$watchCollection('$ctrl.userMultiple',newv=>{
			this.user.multiple = newv;
			if(!this.msg.isSingle){
				this.msg.messages = [];
				this.getMultipleUserInfo();
			}
		});
	}
	getSingleUserInfo(){
		this.ChatModelService.getUserDetailList(new Array(this.user.single))
		.then(data=>{
			this.singleInfo = data.data.data[0];
		},data=>{
			this.singleInfo = {};
		});
	}
	getMultipleUserInfo(){
		this.ChatModelService.getUserDetailList(this.user.multiple)
		.then(data=>{
			this.multipleUserNames = data.data.data.reduce((total,item,index)=>{
				return (total+`;${item.organizationShortName}-${item.departmentName}-${item.userName}`)
			},"").slice(1);
		},data=>{
			this.multipleUserNames = "";
		});
	}
	popMsg(ext,msg,flag){
		let msgObj = this.easeMobService.createMsgObj(ext,msg,flag);
		if(msgObj)
			this.msg.messages.push(msgObj);
		this.chatContentScroll();
	}
	sendMsg(){
		if(this.msg.message===""){
			alert('发送内容为空');
			return false;
		}
		if(this.msg.isSingle){
			this.easeMobService.sendMsg(this.msg.message,undefined,this.userSingle);
		}else{
			this.userMultiple.forEach(userid=>this.easeMobService.sendMsg(this.msg.message,undefined,userid));
		}
		this.popMsg(undefined,this.msg.message,'o');
		this.msg.message = "";
	}
	messageInput(){
		if(event.keyCode===13){
			this.sendMsg();
		}
	}
	chatContentScroll(){
		setTimeout(()=>{
			var objDiv = document.getElementById("chat_model_content");
			!!objDiv && (objDiv.scrollTop = objDiv.scrollHeight);
			$("#chat_model_content_ul").slimScroll({ scrollTo:objDiv.scrollHeight });
		},10);
	}
	resetScrollHeight(){
		this.$timeout(()=>{
			this.msg.scrollHeight = document.getElementById('chatModelContentDiv').clientHeight;
		},0);
	}
	toggleChatPattern(){
		this.msg.isSingle = !this.msg.isSingle;
		this.msg.messages = [];
		this.resetScrollHeight();
	}
	addQuickInfo(key){
		if(this.quickInfo){
			switch(key){
				case 'am':
					this.msg.message+="全场:"+this.quickInfo[key];
					break;
				case 'mm':
					this.msg.message+="边际:"+this.quickInfo[key];
					break;
				case 'my':
					this.msg.message+="边际利率:"+this.quickInfo[key];
					break;
				case 'tet':
					this.msg.message+="截标时间:"+this.quickInfo[key];
					break;
				default:
					alert(this.quickInfo);
			}
		}
	}
}
