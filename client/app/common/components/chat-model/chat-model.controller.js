class ChatModelController {
	constructor($scope,$timeout,easeMobService,ChatModelService,transferService) {
		"ngInject";
		this.$scope = $scope;
		this.$timeout = $timeout;
		this.easeMobService = easeMobService;
		this.ChatModelService = ChatModelService;
		this.transferService = transferService;
	}
	$onInit(){
		this.onQuickInfo = !!this.quickInfo;
		let self = this;
		/*this.msgStatistics = {
			total:0
		};*/
		// this.easeMobService.login();
		if(this.isSingle===undefined)this.isSingle=true;
		this.msg = {
			//isSingle:true,改为由组件外部变量isSingle控制
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
		this.resetScrollHeight();
		this.$scope.$on('ease:msg',(event,message)=>{
			// debugger;
			/*self.state.chat.num!=-1&&self.updateMsgNum(-1);//对方回复消息后，消息条数限制置为-1*/
			if(self.userSingle==message.from&&BONDCONFIG.USERINFO.uid==message.to){//当前聊天对象id与发送方id相同时
				self.easeMobService.setCache(message,'i');
				self.$scope.$apply(()=>{
					self.popMsg(message.ext,message.data,'i',(new Date).getTime());
				});
			}else{
				if(self.msgStatistics){
					//if(self.userMultiple.includes(Number(message.from))){}
					if(self.userSingle!=message.from){//非当前页面的消息
						let cur = self.msgStatistics["_"+message.from];
						self.msgStatistics["_"+message.from] = cur!==undefined?++cur:1;
						// console.log(cur,message.from,self.msgStatistics['_'+message.from]);
						let total = self.msgStatistics.total;
						self.msgStatistics.total = !!total?++total:1;
					}
				}
			}
			if(self.userSingle==message.to&&BONDCONFIG.USERINFO.uid==message.from){//当前聊天对象id与接收方id相同时,多端同步
				self.easeMobService.setCache(message,'o');
				self.$scope.$apply(()=>{
					self.popMsg(message.ext,message.data,'o',(new Date).getTime());
				});
			};
		});
		// this.getSingleUserInfo(Array.of(this.userSingle));
		this.$scope.$watch('$ctrl.userSingle',newv=>{
			this.user.single = newv;
			if(this.isSingle){
				this.msg.messages = [];

				let curChatList,curChatPage;
				if(newv){
					this.easeMobService.get(newv)
					.then(data=>{
						curChatList = data.chtContnList;
						curChatPage = data.page;
						if(curChatList&&curChatList.length>0){
							curChatList.forEach((item,index)=>{
								//console.log(item);
								let payload = JSON.parse(item.payload);
								let drc = BONDCONFIG.USERINFO.uid==item.userFrom?'o':'i';
								this.popMsg(payload.ext,payload.bodies[0].msg,drc,item.cTime);
							});
						}
					});
				}			

				/*let curChatListUn = this.easeMobService.getCache(newv);
				if(curChatListUn&&curChatListUn.length>0){
					curChatListUn.forEach((item,index)=>{
						let m = item.iotype==="i"?item.data:item.msg;
						this.popMsg(item.ext,m,item.iotype);
					});
				}*/

				this.getSingleUserInfo();
			}
		});
		//this.getMultipleUserInfo();
		this.$scope.$watchCollection('$ctrl.userMultiple',newv=>{
			this.user.multiple = newv;
			if(!this.isSingle){
				this.msg.messages = [];
				this.getMultipleUserInfo();
			}
		});
	}
	getSingleUserInfo(){
		if(this.user.single){
			this.ChatModelService.getUserDetailList(Array.of(this.user.single))
			.then(data=>{
				this.singleInfo = data.data.data[0];
				if(this.msgStatistics){
					this.msgStatistics.total = this.msgStatistics.total - this.msgStatistics['_'+this.singleInfo.userId];
					// console.log(this.msgStatistics['_'+this.singleInfo.userId]);
					this.msgStatistics['_'+this.singleInfo.userId] = 0;//清空新消息提示
				}
			},data=>{
				this.singleInfo = {};
			});
		}
	}
	getMultipleUserInfo(){
		if(this.user.multiple.length>0){
			this.ChatModelService.getUserDetailList(this.user.multiple)
			.then(data=>{
				if(data.data.data){
					this.multipleUserNames = data.data.data.reduce((total,item,index)=>{
						return (total+`;${item.organizationShortName}-${item.departmentName}-${item.userName}`)
					},"").slice(1);
				}else{
					this.multipleUserNames = "";
				}
			},data=>{
				this.multipleUserNames = "";
			});
		}else{
			this.multipleUserNames = "";
		}
	}
	popMsg(ext,msg,flag,time){
		let msgObj = this.easeMobService.createMsgObj(ext,msg,flag,time);
		if(msgObj)
			this.msg.messages.push(msgObj);
		this.chatContentScroll();
	}
	sendMsg(){
		if(this.msg.message===""){
			alert('发送内容为空');
			return false;
		}
		if(this.isSingle){
			this.easeMobService.sendMsg(this.msg.message,undefined,this.userSingle);
		}else{
			this.userMultiple.forEach(userid=>this.easeMobService.sendMsg(this.msg.message,undefined,userid));
		}
		this.popMsg(undefined,this.msg.message,'o',(new Date().getTime()));
		this.msg.message = "";
	}
	messageInput(){
		if(event.keyCode===13){
			this.sendMsg();
		}
	}
	chatContentScroll(){
		this.$timeout(()=>{
			var $objDiv = $((this.uniFlag||"")+" #chat_model_content_ul"),
				objDiv = $objDiv[0];
			if(!!objDiv){
				$objDiv.slimScroll({
					scrollTo:objDiv.scrollHeight+"px"
				});
				//objDiv.scrollTop = objDiv.scrollHeight;
			}
		},10);
	}
	resetScrollHeight(){
		this.$timeout(()=>{
			this.msg.scrollHeight = $((this.uniFlag||"")+" #chatModelContentDiv")[0].clientHeight;
		},0);
	}
	toggleChatPattern(){
		this.isSingle = !this.isSingle;
		this.msg.messages = [];
		!this.isSingle && this.getMultipleUserInfo();
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
