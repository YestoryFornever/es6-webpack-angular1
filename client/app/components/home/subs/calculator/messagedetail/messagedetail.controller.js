class MessagedetailController {
	// var data;
	constructor(messagedetailService, $state, $stateParams, $uibModal, $mdDialog, pagetabService, messageService) {
		"ngInject";
		this.name = 'Messagedetail';
		this.messagedetailService = messagedetailService;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		this.$mdDialog = $mdDialog;
		this.pagetabService = pagetabService;
		this.messageService = messageService;
		this.detail_content = {
			uid: '',
			info_id: this.$stateParams.iid,
			view_source: '2',
			flag: '1'
		}
		this.info = {};
		this.array1 = [];
		// 收藏、取消收藏条件
		this.enshrine_info = {
			act: '1',
			uid: '',
			p_type: '1',
			p_id: ''
		}

		// 获取评论列表
		this.listComts = {
			uid: '',
			type: '1',
			info_id: '',
			cur_page: 1

		}
		this.comentdata = [];
		//发表评论
		this.commentinfo = {
			type: 1,
			info_id: '',
			uid: '',
			content: '',
			add_weibo: '1',
			visible_status: '1',
			//ats:[{}],
			comm_id: '',
		}

		this.deleteComments_info = {
				cid: '',
				uid: ''
			}
			// 4.4.1点赞、取消
		this.like_info = {
				act: 1,
				type: '3',
				info_id: '',
				uid: ''
			}
			// 4.11.2同来源的最新资讯
		this.infoSource = {
			uid: '',
			soruce_id: ''
		}
		this.source_one = [];
		// 4.11.3资讯的上下篇
		this.infoUpDowns_num = {
			uid: '',
			info_id: ''
		}
		this.infoUpDowns_info = {};
		this.up_id = "";
		this.down_id = '';
	}
	$onInit() {
			this.findId = BONDCONFIG
			this.lid = this.findId.USERINFO.uid;
			this.target = false;
			// this.flag_coll = this.$stateParams.biaozi;
			console.log(this.$stateParams.iid);
			this.reply = false;
			this.zan = false;
			this.reply_tag = false;
			this.count_judgement=false;
			// 初始化
			this.infoContents();
			// this.listComments();

		}
		// 详情页面1.获取详
	infoContents() {
			this.detail_content.uid = this.lid;
			this.detail_content.info_id=this.$stateParams.iid;
			
			this.detail_content.info_id=this.$stateParams.iid||sessionStorage.getItem('info_id');
			sessionStorage.setItem('info_id',this.detail_content.info_id);
			console.log(this.detail_content);
			let promise = this.messagedetailService.infoContent(this.detail_content);
			promise.then((res) => {
				console.log(res);
				if (res.data) {
					this.info = res.data.data;
					
					// this.array1.push('<img src="../../../../../../resource/images/icon_hint_shafa.png" height="58" >');
					/*for(var i=0 ,len=this.array1.length;i<len;i++){
						this.array1[i]=this.trim(this.array1[i]);
							// var reg=/<img\b[^>]*>/;
							// 	if(reg.test(this.array1[i].note){
							// 		var st=res.data.data[i].match(reg)
							// 		console.log(st)
							// 	}
					}*/
					var html2="";
			        this.array1 = res.data.data.path.split('\n');
                    $.each(this.array1, function(index, obj) {
                        html2 += '<li class="detail2">' + obj + '</li>';
                       
                    });
                    $('#detail_message').html(html2);


					console.log(this.array1);
					// console.log(this.info.source_id);
					this.infoListBySources(this.info.source_id);
					this.activeTab1();
					this.infoUpDowns(this.info.iid);
					this.listComments();
				}

			}, (data) => {
				this.activeTab1();
			});

		}
	// 去空格
	trim(str) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
		// 获取评论列表
	listComments() {
		this.listComts.uid = this.lid;
		// this.listComts.uid = 5310;
		// this.listComts.info_id = 38592;
		this.listComts.info_id = this.info.iid;
		console.log(this.listComts);
		let promise = this.messagedetailService.listComment(this.listComts);
		promise.then((res) => {
			console.log(res);
			if (res.data) {
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					// res.data.data[i].time = this.changeTime(res.data.data[i].time);
					this.comentdata = res.data.data[i];
				}

				// this.comentdata = res.data.data;
				// this.listComts.cur_page++;
				console.log(this.comentdata);
			}

		}, (data) => {

		});
	}
	// 时间戳转化
	changeTime(str) {
		var date = new Date(str);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ' ';
		return Y + M + D + h + m
	}

	//发表评论
	publishComments() {

			this.commentinfo.info_id = this.info.iid;
			this.commentinfo.uid = this.lid;
			console.log(this.commentinfo);
			if(this.commentinfo.content==''){
				alert("请输入评论");
			}else{
				let promise = this.messagedetailService.publishComment(this.commentinfo);
			promise.then((res) => {
				console.log(res);

				if (res.data) {
					// for (var i = 0, len = res.data.data.length; i < len; i++) {
					// 	if (res.data.data[i].likes == 0) {
					// 		this.zan = true;
					// 	} else {
					// 		this.zan = false;
					// 	}
					// }
					console.log(this.zan);
					this.infoContents();
					this.commentinfo.content="";
					this.listComments();
					alert(res.data.msg)
				}

			}, (data) => {
				alert(res.data.msg)
			});
			}
			

		}
	//出现评论文本区域事件
	 judgement(){
	 	this.count_judgement=true;
	 	this.comentdata.length>0;
	 	this.commentinfo.content.length>0;
	 	console.log(this.count_judgement);
	 }
		//发表回复
	publishCommentsreply(id) {
		this.commentinfo.info_id = this.info.iid;
		this.commentinfo.uid = this.lid;
		this.commentinfo.comm_id = id;
		// console.log(this.commentinfo);
		let promise = this.messagedetailService.publishComment(this.commentinfo);
		promise.then((res) => {
			console.log(res);

			if (res.data) {
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					if (res.data.data[i].likes == 0) {
						this.zan = true;
					} else {
						this.zan = false;
					}
				}
				this.publishComments();
				this.listComments();
				this.cancelBubble();
				this.commentinfo.content='';
				console.log(this.zan);
				alert(res.data.msg)
			}

		}, (data) => {
			alert(res.data.msg)
		});
	}

	//删除评论
	deleteComments(id) {
			this.deleteComments_info.cid = id;
			this.deleteComments_info.uid = this.lid;
			console.log(this.deleteComments_info);
			let promise = this.messagedetailService.deleteComment(this.deleteComments_info);
			promise.then((res) => {

				console.log(res);

				if (res.data) {
					this.listComments();
					alert(res.data.msg);
				}

			}, (data) => {
				alert(res.data.msg)
			});
		}
		// 4.4.1点赞、取消
	like(id,num) {
		this.like_info.act=num;
		this.like_info.info_id = id
		this.like_info.uid = this.lid
		this.zan=!this.zan;
		console.log(this.like_info);
		let promise = this.messagedetailService.likes(this.like_info);
		promise.then((res) => {
			if (res.data) {
				console.log(res);
				// if (res.data.data[i].likes == 0) {
				// 			this.zan = true;
				// 		} else {
				// 			this.zan = false;
				// 		}
				// 		
				// if(this.like_info.act=='1'){
				// 	this.like_info.act=='2';
				// 	this.listComments();
				// }else if(this.like_info.act=='2'){
				// 	this.like_info.act=='1';
					
				// }
				this.listComments();
				console.log(res);

			}
		}, (data) => {
			alert(res.data.msg)
		});
	}

	// 添加、取消收藏展开、收起
	getCheck() {
		this.enshrine_info.uid = this.lid;
		// this.flag_coll =!this.flag_coll ;
		this.enshrine_info.p_id = this.detail_content.info_id;
		// if (this.enshrine_info.act == 1) {
		// 	this.enshrine_info.act = 2
			// this.info.is_favorite=1;
		// } else if (this.enshrine_info.act == 2) {
			// this.info.is_favorite=0;
			// this.enshrine_info.act = 1
		// }
		
		let promise = this.messagedetailService.enshrine(this.enshrine_info);
		promise.then((res) => {
			// console.log(res);
			if (res.data) {
				this.infoContents();
				alert(res.data.msg);
				if (this.enshrine_info.act == 1) {
					this.enshrine_info.act = 2
				// this.info.is_favorite=1;
				} else if (this.enshrine_info.act == 2) {
				// this.info.is_favorite=0;
				this.enshrine_info.act = 1
				}

			}

		}, (data) => {

		});


	}

	// 4.11.2同来源的最新资讯

	infoListBySources(id) {
			this.infoSource.soruce_id = id;
			this.infoSource.uid = this.lid;
			// this.info.source_id;
			console.log(this.infoSource);
			let promise = this.messagedetailService.infoListBySource(this.infoSource);
			promise.then((res) => {
				// console.log(res);
				if (res.data) {
					this.source_one = res.data.data;


				}

			}, (data) => {

			});
		}
		// 4.11.3资讯的上下篇
	infoUpDowns(id) {
		this.infoUpDowns_num.info_id = id;
		this.infoUpDowns_num.uid = this.lid;
		console.log(this.infoUpDowns_num);
		let promise = this.messagedetailService.infoUpDown(this.infoUpDowns_num);
		promise.then((res) => {
			// console.log(res);
			if (res.data) {
				this.infoUpDowns_info = res.data.data;
				this.up_id = this.infoUpDowns_info.up_id;
				this.down_id = this.infoUpDowns_info.down_id;

				console.log(this.infoUpDowns_info);
			}
			// this.infoUpDowns(this.infoUpDowns_info.up_id);
		}, (data) => {

		});
	}
	checked_up() {
		this.infoUpDowns(this.up_id);
		this.detail_content.info_id = this.up_id;
		// 详情页面1.获取详情
		this.infoContents();
	}

	checked_down() {
		this.infoUpDowns(this.down_id);
		this.detail_content.info_id = this.down_id;
		// 详情页面1.获取详情
		this.infoContents();
	}



	// 展开、收起
	doCheck() {
		this.target = !this.target;
		// var bx=document.getElementById("box");
		console.log(this.target);

	}

	// 在input中将输入的内容取消
	cancelSearch() {
		$('.nav_two_close').hide();
	}

	// 详情页面的评论的回复输入框显示隐藏功能
	response() {
			// this.reply=!this.reply;
			$("#import").show();
			console.log('111');

		}
		// 取消回复按钮隐藏功能
	cancelBubble() {
			$("#import").hide();
		}
		// 发布回复按钮隐藏功能
	activeTab1() {
		this.pagetabService.activeTab({
			tabKey: 'home.messagedetail',
			routeState: "home.messagedetail",
			routeLabel: '资讯详情'
		});
	}


}