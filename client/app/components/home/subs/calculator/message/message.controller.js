var BONDCONFIG = require('../../../../../../bond.config.js');

	
class MessageController {
	constructor(messageService,$state,$stateParams) {
		this.messageService = messageService;
		this.name = 'message';
// tab切换推荐页
this.recommended = {
	uid: '5301',
	is_updown: '',
	data_type: '1',
	cur_page: '1',
	read_cnt: ''
}
this.table=[];
this.flash_one=[];
this.dddd="全部展开";
this.str='';
// 快讯
this.flash={
	uid: '5301',
	cur_page: '1',
	last_id: '0'
}
// tab切换推荐页结束
			

// 获取资讯列表头条件
this.message = {
	uid: '5501',
	catagory: '',
	cur_page: '1',
	source: ''
}

	}

	$onInit() {
			$(".list").eq(0).show();
			// $(".nav li").eq(0).addClass('clear');
			this.target = false;
			this.flag = false;
			this.reply = false;
			this.index = '';
			
// tab切换推荐页
	this.getrecommendedLists(1);
	this.qinfoLists();
// tab切换推荐页结束
	}
// tab切换函数
	
changetab(num) {
			// 导航添加类名改变被禁色
			$(".nav_top").eq(num).addClass('clear').siblings().removeClass('clear');
			$(".list").eq(num).show().siblings('.list').hide();
	}
		// tab切换推荐页
getrecommendedLists(num) {
		this.recommended.is_updown=num;
		console.log(this.recommended);
		let promise = this.messageService.recommendedlist(this.flash);
		promise.then((res) => {
			console.log(res);
			if(num==1&&res.data.data.length==0){
				this.getrecommendedLists(2); 
				
			}else if(num==1){
				
			}
		this.table=res.data.data;
		console.log(this.table);
		}, (data) => {

		});
	}
// 滚动加载

// 快讯
qinfoLists(){
let promise = this.messageService.qinfoList(this.recommended);
		promise.then((res) => {
			console.log(res);
			if(res.data){
				this.flash_one=res.data.data;
				// for(var i=0;i<res.data.data.length;i++){
				// 	this.str=reg.Matches(res.data.data[i].content)
					console.log(this.flash_one);
				// }
				
			}
		
		}, (data) => {

		});

}


// tab切换推荐页结束























// 展开、收起
doCheck(i){ 
	console.log($('.rrrr').eq(i).html());
// debugger;
	// if($('.rrrr').eq(i).html()=="全部展示"){
	// 	$('.rrrr').eq(i).html("收起");
	// }else if($('.rrrr').eq(i).html()=="收起"){
	// $('.rrrr').eq(i).html("全部展示");
	// }
	$('.rrrr').eq(i).toggle(function(){
		this.target=true
	},function(){ 
		this.target=false;
	});
	
		// var bx=document.getElementById("box");
		//console.log(this.target);

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









}
MessageController.$inject = ['messageService','$state','$stateParams'];
export default MessageController;