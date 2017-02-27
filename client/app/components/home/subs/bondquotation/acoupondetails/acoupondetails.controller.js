var BONDCONFIG = require('../../../../../../bond.config.js');

	
class AcoupondetailsController {
	constructor(acoupondetailsService) {
		this.name = 'acoupondetails';
		this.acoupondetailsService = acoupondetailsService;
		this.queryBondBaseInfos={
			bondid:"47056"
		};
		this.list=[];
		// 发行信息
		this.info=[];
		this.creditInfo=[];
		// 我的好友我的群
			// 1.获取好友列表
				this.friengsgroups={
					// lid:'',
					// queryValue:'范伟伟'
				};
				this.friendLists=[];//定义一个变量存放后台返回的好友列表数组
				this.groupList={
					userId: '5501',
					usrAhr:''
				}
				this.grouplists=[];//定义一个变量存放后台返回的群众列表数组
				this.alls=[];//存放右侧好友列表的数据
				this.all_grounp=[];//存放右侧好友群组的数据
				this.sendId=[];
	}
	$onInit(){
		this.target = false;
		this.target1=false;
		this.fridentShow();
		this.groupShow();
		//好友
		this.tag==false;
		// 群主
		this.gruop==false;

		// 初始化函数
		this.queryBondBaseInfo();
		// 初始化我的好友列表
		this.friendgroups();
		// 初始化我的群列表
		this.getLists();
		// this.checked();
		this.a=[];
		
	}
// 详情信息

queryBondBaseInfo(){
		console.log('4444');
		// this.queryBondBaseInfo.bondid=id;
		let promise = this.acoupondetailsService.detailInfo(this.queryBondBaseInfos);
		promise.then((res)=>{
					console.log(res);
					// console.log(res.data);
					// console.log(res.data.data.issueInfos);
					if(res.data){
						if(res.data.status=='0'){
							this.list.push(res.data.data);
							this.info=res.data.data.issueInfos;
							// 存在循环
							// for(var i )
							this.creditInfo=res.data.data.issueInfos[0].creditInfos;
							// console.log(res.data.data.issueInfos[0].creditInfos);
						}else{
							
						}
					}else{
						alert(res.msg)
					}
					// console.log(this.list);
					// console.log(this.info);
					// console.log(this.creditInfo);

					
				},(data)=>{
					
		});
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
			$(".modal-dialog").show("slow");
		}
		closeDialog(){//关闭弹窗
			$(".modal-dialog").hide("slow");
		}
		// 关闭已选择用户
		cancelClose(){
			
			this.groupChecked();
			$(".rtClose").remove();
		}

		fdClose(){
			$('.fdrtClose').remove();
		}
// 我的好友我的群
// 1.获取好友列表
friendgroups(){
	
		// this.queryBondBaseInfo.bondid=id;
		let promise = this.acoupondetailsService.myFriends(this.friengsgroups);
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
							// console.log(this.friendLists);
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
		let promise = this.acoupondetailsService.groupMy(this.groupList);
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

// 右侧列表的数据
// 点击复选框获取好友信息数据
checked(){
	var arr=$(".checkBody input");
	this.alls=[];
	console.log(arr);
	for(var i=0;i<arr.length;i++){
		console.log(arr[i]);
		console.log(arr[i].checked);
		if(arr[i].checked){
			if(this.alls.indexOf(this.friendLists[i])==-1){
				this.alls.push(this.friendLists[i])
			}
			
		}
		console.log(this.alls);
		// return this.alls
	}

}
点击复选框获取群组信息数据
groupChecked(){
	this.tg=!this.tg;
	
	var arr1=$(".checkAll_group_body input");
	this.all_grounp=[];
	for(var i=0;i<arr1.length;i++){
		console.log(arr1[i]);
		console.log(arr1[i].checked);
		if(arr1[i].checked){
			if(this.all_grounp.indexOf(this.grouplists[i])==-1){
				this.all_grounp.push(this.grouplists[i])
			}
			
		}
		console.log(this.all_grounp);
	}

}
// 发送的id列表
// fc(){

// 	this.all_grounp=this.grouplists;
// 	for(var i=0;i<this.all_grounp.length;i++){
// 		this.all_grounp[i].flg=false;
		
// 	}
	 
// }
      






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
AcoupondetailsController.$inject = ['acoupondetailsService'];
export default AcoupondetailsController;