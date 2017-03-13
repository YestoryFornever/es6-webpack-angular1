
class BacksystemController {
	// var data;
	constructor() {
		this.name = 'Backsystem';
		
	}
	$onInit(){
		$(".list").eq(0).show();
		$(".nav li").eq(0).addClass('clear');
		this.target=false;
		this.flag=false;
		this.reply=false;
		this.index='';
	}
// tab切换函数
	
changetab(num) {
	// 导航添加类名改变被禁色
	$(".nav_top").eq(num).addClass('clear').siblings().removeClass('clear');
	$(".list").eq(num).show().siblings('.list').hide();
}

// 展开、收起
doCheck(){
		this.target=!this.target;
		// var bx=document.getElementById("box");
		console.log(this.target);

		} 
// 收藏展开、收起
getCheck(){
		this.flag=!this.flag;
		// var bx=document.getElementById("box");
		console.log(this.flag);

		}	
// 在input中将输入的内容取消
cancelSearch(){
	// var str=$('.nav_two input').val();
	// if(str.length>0){
	// 	$('.nav_two_close').show();
	// }else{
	// 	$('.nav_two_close').hide();
	// }
	 $('.nav_two_close').hide();
	}

// 详情页面的评论的回复输入框显示隐藏功能
response(){
	// this.reply=!this.reply;
$("#import").show();
console.log('111');

}
// 取消回复按钮隐藏功能
cancelBubble(){
	$("#import").hide();
}
// 发布回复按钮隐藏功能



	
// 详情信息

queryBondBaseInfo(id){
		console.log('4444');
		this.queryBondBaseInfos.bondid= id;
		console.log(this.queryBondBaseInfos);
		
		let promise = this.backgroundsystemService.detailInfo(this.queryBondBaseInfos);
		promise.then((res)=>{
					console.log(res);
					// console.log(res.data);
					// console.log(res.data.data.issueInfos);
					if(res.data){
						if(res.data.status=='0'){

							if(res.data.data){
								res.data.data.issueAmount=res.data.data.issueAmount/100000000;
								// .toFixed()表示保留小数点位数
								res.data.data.rsdtrm=parseFloat(res.data.data.rsdtrm).toFixed(2);
								res.data.data.bondRate=parseFloat((res.data.data.bondRate)*100).toFixed(2);
							}
							// this.list.push(res.data.data);
							this.list=res.data.data;
							
							this.info=res.data.data.issueInfos;
							console.log(this.info);
							// 存在循环表格数据
							
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
	var array_1=[];
	// var array_2=[];
	for(var i=0;i<this.alls.length;i++){
		array_1.push(this.alls[i].oppositeUserId)
	}
	this.sendId.negtprcUserId=array_1.join(',');
	// for(var i=0;i<this.all_grounp.length;i++){
	// 		array_2.push(this.all_grounp[i].groupGrpid)
	// 	}
	// this.sendId.negtprcUserId=array_2.join(',');
	console.log(this.sendId);
	let promise = this.backgroundsystemService.sendBondPrice(this.sendId);
		promise.then((res)=>{
					console.log(res);
					
					if(res.data){
						if(res.data.status=='0'){
							 // this.grouplists=res.data.data;
							 console.log(res.data.data);

							
						}else{
							
						}
					}else{
						alert(res.msg)
					}
					

					
				},(data)=>{
					
		});
}







}

export default BacksystemController;