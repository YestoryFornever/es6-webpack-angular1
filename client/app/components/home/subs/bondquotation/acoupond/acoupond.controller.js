var BONDCONFIG = require('../../../../../../bond.config.js');
import 'easemob-websdk/dist/strophe-1.2.8.min.js';
var WebIM = require('easemob-websdk');
WebIM.config = require('../../../../../../resource/js/easemob/webim.config.js');
	
class AcoupondController {
	constructor(acoupondService,$state,$stateParams) {
		this.name = 'acoupond';
		this.acoupondService = acoupondService;
		this.$stateParams = $stateParams;

		
			this.chatcontent = [];
		// 我的好友我的群
			// 1.获取好友列表
				this.friengsgroups={
					
				};
				this.friendLists=[];//定义一个变量存放后台返回的好友列表数组
				
				this.groupList={
					userId:'',
					// userId: '5501',
					usrAhr:''
				}
				this.grouplists=[];//定义一个变量存放后台返回的群众列表数组
				this.alls=[];//存放右侧好友列表的数据
				this.all_grounp=[];//存放右侧好友群组的数据
				// 发送
				this.sendId={
					bondOfrid:'',
					// bondOfrid:'8202',
					negtprcUserId:''
				};
				// 查找我的好友我的群
				this.searchInfo={
					queryValue:''
				};
				this.pppp={};
	}
	
	$onInit(){
		let BONDCONFIG = require('../../../../../../bond.config.js');
			this.findId=BONDCONFIG	
			this.lid=this.findId.JH.lid;
			console.log(this.lid);
			// 环信初始化
			this.WebIMInit();
			//当前聊天好友数组列表(与好友、议价等列表交互)
		this.friend=[];
		this.obj_1=this.resolve;
		console.log(this.obj_1)
		this.target = false;
		this.target1=false;
		this.fridentShow();
		this.groupShow();
		
		//好友
		this.tag==false;
		// 群主
		this.gruop==false;
// this.queryBondBaseInfo(this.$stateParams.bondid);
		// 初始化函数
		
		// 初始化我的好友列表
		this.friendgroups();
		// 初始化我的群列表
		this.getLists();
		// this.obj_1=that.dataFriendModal;
		
		
	}




	// 展开、收起
	doCheck(){
		this.target=!this.target;
		var bx=document.getElementById("box");
		console.log(this.target);

		}
	doCheck1(){
		this.target1=!this.target1;
		var bx=document.getElementsByClassName("box");
		console.log(this.target1);

		}
	// 关闭搜索
	searchCloce(){
		var inp=document.getElementById("ip");
		inp.value="";
		// inp.placeholder="16国开10";
		console.log(inp);
	}


// 弹窗功能
		openDialog(){//打开弹窗
			$(".modal-dialog").slideDown("slow");
		}
		closeDialog(){//关闭弹窗
			$(".modal-dialog").slideUp("slow");
			this.friendgroups();
		// 初始化我的群列表
			this.getLists();

		}
		// 关闭已选择用户群
		cancelClose(id){
			// var str=this.all_grounp.join('')
			var arr3=[];
			
			for(var i=0;i<this.all_grounp.length;i++){
				if(this.all_grounp[i].groupGrpid!=id){
					arr3.push(this.all_grounp[i]);
					// this.all_grounp=this.all_grounp.splice(i)
				}
			}
			for(var i=0;i<this.grouplists.length;i++){
				if(this.grouplists[i].groupGrpid==id){
					var arr1=$(".checkAll_group_body input");
					arr1[i].checked=false;
				}
			}
			this.all_grounp=arr3;
			console.log(this.all_grounp);
			// this.groupChecked();
			// $(".rtClose").remove();
		}
		// 关闭已选择好友
		fdClose(id){
			var arr4=[];
			
			for(var i=0;i<this.alls.length;i++){
				if(this.alls[i].oppositeUserId!=id){
					arr4.push(this.alls[i]);
					// this.all_grounp=this.all_grounp.splice(i)
				}
			}
			for(var i=0;i<this.friendLists.length;i++){
				if(this.friendLists[i].oppositeUserId==id){
					var arr=$(".checkBody input");
					arr[i].checked=false;
				}
			}
			this.alls=arr4;
			console.log(this.alls);



			// $('.fdrtClose').remove();
		}
// 我的好友我的群
// 1.获取好友列表
friendgroups(){
	
		// this.queryBondBaseInfo.bondid=id;
		let promise = this.acoupondService.myFriends(this.friengsgroups);
		promise.then((res)=>{
					console.log(res);
					
					if(res.data){
						if(res.data.status=='0'){
							console.log(res.data.data);
							for(var i in res.data.data){
								if(res.data.data[i].realCertifyState=='3'){
									res.data.data[i].realCertifyState="实名认证";
								}else if(res.data.data[i].realCertifyState=='0'){
									res.data.data[i].realCertifyState="未认证";
								}else if(res.data.data[i].realCertifyState=='1'){
									res.data.data[i].realCertifyState="认证中";
								}
							}
							this.friendLists=res.data.data;
							// this.grouplists=res.data.data.userRep052VOList;
							console.log(this.friendLists);
							// console.log(this.grouplists);
							
						}else{
							
						}
					}else{
						alert(res.msg)
					}
					

					
				},(data)=>{
					
		});
}
//获取群列表
	getLists(){
		// this.groupList.userId=this.lid;
		let promise = this.acoupondService.groupMy(this.groupList);
		promise.then((res)=>{
					console.log(res);
					
					if(res.data){
						if(res.data.status=='0'){
							 this.grouplists=res.data.data;
							 console.log(this.grouplists);

							
						}else{
							
						}
					}else{
						alert(res.msg)
					}
					

					
				},(data)=>{
					
		});
	}
// 查询我的好友我的群

    searchAllGroup(){
    	console.log(this.searchInfo);
    	let promise = this.acoupondService.searchFriendsGroups(this.searchInfo);
		promise.then((res)=>{
					console.log(res);
					if(res.data){
						if(res.data.status=='0'){
							
							 console.log(res.data.data.userRep051VOList[0]);
							 for(var i=0;i<res.data.data.userRep051VOList.length;i++){
											if(res.data.data.userRep051VOList[i]){
										 	if(res.data.data.userRep051VOList[i]['realCertifyState']=='3'){
												res.data.data.userRep051VOList[i]['realCertifyState']="实名认证";
											}else if(res.data.data.userRep051VOList[i]['realCertifyState']=='0'){
												res.data.data.userRep051VOList[i]['realCertifyState']="未认证";
											}else if(res.data.data.userRep051VOList[i]['realCertifyState']=='1'){
												res.data.data.userRep051VOList[i]['realCertifyState']="认证中";
											}

							 }
							  
										 
										
							
								
							}
							 this.friendLists=res.data.data.userRep051VOList;

							 this.grouplists=res.data.data.userRep052VOList;
							
						}else{
							
						}
					}else{
						alert(res.msg)
					}
					

					
				},(data)=>{
					
		});
    } 
// 右侧列表的数据
// 点击复选框获取好友信息数据
checked(){
	var arr=$(".checkBody input");
	this.alls=[];
	// console.log(arr);
	for(var i=0;i<arr.length;i++){
		console.log(arr[i]);
		console.log(arr[i].checked);
		if(arr[i].checked){
			if(this.alls.indexOf(this.friendLists[i])==-1){
				this.alls.push(this.friendLists[i])
			}
			
		}
		console.log(this.alls);
		
	}

}
// 点击复选框获取群组信息数据
groupChecked(){
	this.tg=!this.tg;
	
	var arr1=$(".checkAll_group_body input");
	this.all_grounp=[];
	for(var i=0;i<arr1.length;i++){
		// console.log(arr1[i]);
		// console.log(arr1[i].checked);
		if(arr1[i].checked){
			if(this.all_grounp.indexOf(this.grouplists[i])==-1){
				this.all_grounp.push(this.grouplists[i])
			}
			
		}
		console.log(this.all_grounp);
	}

}
// 发送报价
sendOffer(){
// let id=this.obj_1.friendModal.friendId.id;
	this.sendId.bondOfrid=this.obj_1.friendModal.friendObj.bondOfrid;
	// this.sendId.bondOfrid=this.obj_1.friendModal.friendObj;
 this.pppp=this.obj_1.friendModal.friendObj;

 console.log(this.pppp);
	console.log(this.sendId);
	var array_1=[];
	var array_2=[];
	for(var i=0;i<this.alls.length;i++){
		array_1.push(this.alls[i].oppositeUserId)
	}
//判断是选择好友还是选择群组
	
	for(var i=0;i<this.all_grounp.length;i++){
			array_2.push(this.all_grounp[i].groupGrpid)
		}
	// this.sendId.negtprcUserId=array_2.join(',');
	// this.sendId.negtprcUserId=array_1.join(',');
	if(array_1.length>0&&array_2.length==0){
		this.sendId.negtprcUserId=array_1.join(',');
		let promise = this.acoupondService.sendBondPrice(this.sendId);
		promise.then((res)=>{
					console.log(res);
					
					if(res.data){
						if(res.data.status=='0'){
							 // this.ppp=this.obj_1.friendModal.friendObj;
							 // console.log(this.ppp);
							 this.pppp.bondNegtprcid=res.data.data;
							 console.log(this.pppp);
							 // console.log(res.data.data);
							 // console.log(this.obj_1.friendModal.friendObj);
							 this.sendMsg(this.pppp);
							
						}
					}else{
						alert(res.msg)
					}
					
					this.closeDialog();
					
					
				},(data)=>{
					
		});

	}else if(array_2.length>0&&array_1.length==0){
		this.sendId.negtprcUserId=array_2.join(',');
		this.pppp.bondNegtprcid=this.sendId.negtprcUserId;
		 this.sendMsg(this.pppp);
	}else if(array_1.length>0&&array_2.length>0){
		alert("请选择好友或我的群之一");
	}
	console.log(this.sendId);
	// let promise = this.acoupondService.sendBondPrice(this.sendId);
	// 	promise.then((res)=>{
	// 				console.log(res);
					
	// 				if(res.data){
	// 					if(res.data.status=='0'){
	// 						 // this.ppp=this.obj_1.friendModal.friendObj;
	// 						 // console.log(this.ppp);
	// 						 this.pppp.bondNegtprcid=res.data.data;
	// 						 console.log(this.pppp);
	// 						 // console.log(res.data.data);
	// 						 // console.log(this.obj_1.friendModal.friendObj);
	// 						 this.sendMsg(this.pppp);
							
	// 					}else{
							
	// 					}
	// 				}else{
	// 					alert(res.msg)
	// 				}
					
	// 				this.closeDialog();
					
					
	// 			},(data)=>{
					
	// 	});
}

sendMsg(extObj){//发送普通消息
		var id = this.conn.getUniqueId();
		// var idLists=[];
		// 	for(obj in this.friend){
		// 		idLists.push(obj.userId);
		// 	}
			// this.friend.userId=ofid;
				// 生成本地消息id
		var msg = new WebIM.message('txt', id);	// 创建文本消息
		let msgBody = {
			msg: this.message,					// 消息内容
			from: BONDCONFIG.USERINFO.uid,
			//接收消息对象（用户id）
			to: this.friend.userId||BONDCONFIG.USERINFO.uid,
			ext: extObj,
			roomType: false,
			success: function (id, serverMsgId) {
				alert.log('报价发送成功');
			}
		};
		msg.set(msgBody);
		msg.body.chatType = 'singleChat';
		this.popMsg(extObj,this.message,'o');
		// this.conn.send(msg.body);
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
					break;
				case "21"://发送议价
					this.chatcontent.push({
						type:flag+'quote',
						message:ext
					});
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
		// this.chatContentScroll();
	}
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
	}


















// openFirend(){//打开好友弹窗
// 		let that =this;
// 		that.$uibModal.open({
// 			animation: that.animationsEnabled,
// 			component:'acoupond',
// 			size: 'xl',//'lg',//'sm',
// 			resolve: {
// 				friendModal:function(){
// 					this.obj_send=that.dataFriendModal
// 					console.log(this.obj_send) ;
// 				}
// 			}
// 		}).result.then(function (selectedItem) {},that);
// 	}



// 1.我的好友
	// checked(){
	// 	$(".checkAll").click(function(){
	//            var isChecked=$(this).prop("checked");
	//           $('.checkBody').find('input').prop("checked",isChecked) ;
	//         });
	// 		$(".checkBody input").click(function(){
	// 		            var all=$(".checkBody input").length;
	// 		            var num=$(".checkBody input:checked").length;
	// 		            if(num===all){
	// 		                $(".checkAll").prop("checked",true);
	// 		            }else{
	// 		                $(".checkAll ").prop("checked",false);
	// 		            }
	// 		        });
	// }

	// 好友展开
	fridentShow(){
		let tag=this.tag;
		// console.log(tag)
		if(tag==true){
			$("#frds").slideDown(1000);
		}else{
			$("#frds").slideUp(1000);
		}
		return this.tag=!tag;
		
		
	}



	// 2.我的群主
			// 2.1
			// 群主展开
	groupShow(){
		let group=this.group;
		if(group==true){
			$(".groupAll").slideDown(1000);
		}else{
			$(".groupAll").slideUp(1000);
		}
		return this.group=!group;

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
AcoupondController.$inject = ['acoupondService','$state','$stateParams'];
export default AcoupondController;