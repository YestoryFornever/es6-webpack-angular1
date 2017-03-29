class MessageController {
	constructor(messageService, $state, $stateParams, $uibModal, $mdDialog, pagetabService, $scope) {
		"ngInject";
		this.messageService = messageService;
		this.pagetabService = pagetabService;
		this.$uibModal = $uibModal;
		this.$mdDialog = $mdDialog;
		this.$scope = $scope;

		// this.$iscroll = $iscroll;	
		this.name = 'message';
		// tab切换推荐页
		this.recommended = {
			uid: '',
			is_updown: '',
			data_type: '1',
			cur_page: 1,
			read_cnt: 0
		}
		this.table = [];
		this.flash_one = [];
		this.str = '';
		// 负面
		this.one = [];
		// 全部
		this.one_two = [];
		// 自媒体
		this.one_three = [];
		// 搜索结果
		this.result_end = ""
			// 快讯
		this.flash = {
				uid: '',
				cur_page: 1,
				last_id: '0'
			}
			// 获取3全部4负面 5自选 6自媒体列表条件
		this.messages_one = {
				uid: '',
				catagory: '',
				cur_page: 1
			}
			// 获取收藏列表条件
		this.collect = {
				uid: '',
				cur_page: 1
			}
			// 定义收藏数目
		this.num_two = {
			uid: '',
			type: '1'
		}
		this.num_one = '';
		this.coll = [];
		// 提示暂无收藏
		this.tag = false;
		// tab切换推荐页结束


		// 获取资讯列表头条件
		this.message = {
				uid: '',
				catagory: '',
				cur_page: 1,
				source: ''
			}
			// 搜索条件
		this.searchInfo = {
			uid: '',
			search: '',
			cur_page: 1
		}
		this.search_data = [];
	}

	$onInit() {
			this.findId = BONDCONFIG
			this.lid = this.findId.USERINFO.uid;
			console.log(this.lid);
			// 无资源图片
			this.fullmarks = false;
			this.fullmarks_flash = true;
			this.fullmarks_one = false;
			$(".list").eq(0).show();
			// $(".nav li").eq(0).addClass('clear');
			this.target = false;
			this.flag = false;
			this.reply = false;
			this.flag_one = false;
			this.img_flg_one = false;
			this.changetab(0);
			// 搜索结果过滤
			this.filter=false;
			// 初始化加载页数
			// this.i=1;
			// this.i_one=1;
			this.biaozi = false;
			// tab切换推荐页
			this.getrecommendedLists(1);
			// this.messagelists();
			// this.messagelists_two()
			// this.messagelists_three()
			this.qinfoLists();
			// this.collections();
			this.favoriteCnts();
			// tab切换推荐页结束
		}
		// tab切换函数
		fn(){

			if(this.isFour){
				this.collections()
			}else if(this.isThree){
				this.messagelists();
			}else if(this.xxx_one){
				this.searchInfoLists();
			}
		}
	changetab(num) {
			// 导航添加类名改变被禁色
			this.tabkey = num;
			if (num == 1) {
				// 4负面
				this.messages_one.catagory = 4;
				this.messages_one.cur_page = 1;
				this.one = [];
				this.messagelists();
			} else if (num == 2) {
				// 6自媒体
				this.messages_one.cur_page = 1;
				this.one = [];
				this.messages_one.catagory = 6;
				this.messagelists();
			} else if (num == 3) {
				// 3全部
				this.messages_one.cur_page = 1;
				this.one = [];
				this.messages_one.catagory = 3;
				this.messagelists();
			} else if (num == 4) {
				this.collect.cur_page = 1;
				this.one = [];
				this.collections()
			} else if (num == 5) {
				this.one = [];
				this.searchInfo.cur_page = 1;
				
			}
		}
		// tab切换推荐页
	getrecommendedLists(num) {
			this.recommended.is_updown = num;
			this.recommended.uid = this.lid;
			console.log(this.recommended);
			let promise = this.messageService.recommendedlist(this.recommended);
			promise.then((res) => {
				console.log(res);
				if (num == 1 && res.data.data.length == 0&&this.table.length==0) {
					this.fullmarks = false;
					this.getrecommendedLists(2);
				} else if (num == 1 && res.data.data.length > 0||this.table.length>0) {
					this.fullmarks = false;
					this.getrecommendedLists(1);
					// this.recommended.read_cnt = 20 * this.recommended.cur_page;
					// console.log(this.recommended.read_cnt);
					this.recommended.data_type=res.data.data_type;
					// this.recommended.cur_page++;
				}
				// for(var i=0 ,len=this.table.length;i<len;i++){
				// 			this.table[i]=this.trim(this.table[i]);
				// 		}

				for (var i = 0, len = res.data.data.length; i < len; i++) {
					this.table.push(res.data.data[i]);
				}
				console.log(this.table);
			}, (data) => {

			});
		}
		// 去空格
	trim(str) { //删除左右两端的空格　　
			return str.replace(/(^\s*)|(\s*$)/g, "");　　
		}
		// 3全部4负面6自媒体
	messagelists() {
		// debugger;
		this.filter=false;
		this.messages_one.uid = this.lid;
		// this.messages_one.catagory = 4;
		console.log(this.messages_one);
		let promise = this.messageService.messagelist(this.messages_one);
		promise.then((res) => {
			console.log(res);
			if (res.data) {
				if (res.data.data.length > 0) {
					this.fullmarks = false;

				} else if (res.data.data.length == 0) {
					this.fullmarks = true;
					alert(res.msg);
				}
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					this.one.push(res.data.data[i]);
				}
				this.messages_one.cur_page++;
			}

		}, (data) => {

		}).then(() => {
			this.$scope.$broadcast('iscroll:refresh');
		});
	}

	favoriteCnts() {

		this.num_two.uid = this.lid;
		let promise = this.messageService.favoriteCnt(this.num_two);
		promise.then((res) => {
			if (res.data) {

				if (res.data.data == 0) {
					this.num_one = 0;
					// this.tag = true;
					// this.fullmarks = true;
				} else if (res.data.data > 0) {
					this.num_one = res.data.data;
					// this.fullmarks = false;
					// console.log(this.fullmarks);
					// this.tag = false;
					// for (var i = 0, len = res.data.data.length; i < len; i++) {
					// 	this.coll.push(res.data.data[i]);
					// }

					// this.coll = res.data.data;
					// this.collect.cur_page++;
					// console.log(this.collect.cur_page);
				}

			}

		}, (data) => {
			
		})
	}



	// 快讯
	qinfoLists() {
		this.flash.uid = this.lid;
		this.flash.cur_page = this.flash.cur_page || 1;
		let promise = this.messageService.qinfoList(this.flash);
		promise.then((res) => {
			console.log(res);

			if (res.data) {

				if (res.data.data.length == 0) {
					this.fullmarks_flash = true;
				} else if (res.data.data.length > 0) {
					this.fullmarks_flash = false;
				}
				this.flash_one = res.data.data;
				// console.log(this.flash.cur_page);
				this.flash.cur_page++;

			}

		}, (data) => {

		});

	}

	// 收藏页面
	collections() {
		this.filter=false;
		
			this.collect.uid = this.lid;
			console.log(this.messages_one);
			let promise = this.messageService.collection(this.collect);
			promise.then((res) => {
				console.log(res);
				if (res.data) {
					if (res.data.data.length == 0) {
						// this.num_one = 0;
						this.tag = true;
						this.fullmarks = false;
					} else if (res.data.data.length > 0) {
						// this.num_one = res.data.data.length;
						this.biaozi = true;
						this.fullmarks = false;
						console.log(this.fullmarks);
						this.tag = false;
						for (var i = 0, len = res.data.data.length; i < len; i++) {
							this.one.push(res.data.data[i]);
						}

						// this.coll = res.data.data;
						this.collect.cur_page++;
						console.log(this.collect.cur_page);
					}

				}

			}, (data) => {

			}).then(() => {
				this.$scope.$broadcast('iscroll:refresh');
			});
		}
		// 搜索条件

	searchInfoLists() {
			this.filter=false;
			this.changetab(5);
			this.searchInfo.uid = this.lid;
			this.result_end = this.searchInfo.search;
			this.flag_one = true;
			this.tag=false;
			this.img_flg_one = true;
			this.fullmarks = false;
			this.fullmarks_one = false;
			let promise = this.messageService.searchInfoList(this.searchInfo);
			promise.then((res) => {
				console.log(res);
				if (res.data) {
					this.img_flg_one = false;
					if (res.data.data.length == 0) {
						this.fullmarks_one = true;
					} else if (res.data.data.length > 0) {
						this.fullmarks_one = false;
						this.filter=true;
						for (var i = 0, len = res.data.data.length; i < len; i++) {
						// this.search_data.push(res.data.data[i]);
						this.one.push(res.data.data[i])
					}

					}


					
					if (this.flag_one == false) {
						this.changetab(0);
					}
					this.searchInfo.cur_page++;
					// console.log(this.search_data);

				}


			}, (data) => {
				
			}).then(() => {
				this.$scope.$broadcast('iscroll:refresh');
			});
		}
		// 关闭搜索结果
	searchInfoClose() {
		this.flag_one = false;
		this.filter=false;
		this.changetab(0);
	}


	// 展开、收起
	doCheck(i) {
			console.log($('.rrrr').eq(i).html());
		}
		// 收藏展开、收起
	getCheck() {
			this.flag = !this.flag;
			// var bx=document.getElementById("box");
			console.log(this.flag);

		}
		// 在input中将输入的内容取消
	cancelSearch() {
		var str = $('.nav_two input').val();
		console.log(str);
		$('.nav_two_close').hide();
		$('.nav_two input').val(' ');
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
	activeTab1() { // 调到详情页面,添加也签
		this.pagetabService.activeTab({
			tabKey: 'home.messagedetail',
			routeState: "home.messagedetail",
			routeLabel: ("资讯详情"),
		});
	}

}
// MessageController.$inject = ['messageService','$state','$stateParams','$uibModal','$mdDialog'];