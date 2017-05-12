let messageComponent = {
	restrict: 'E',
	bindings: {},
	templateUrl: './message.html',
	controller: function(messageService, $state, $stateParams, pagetabService, $scope){
		"ngInject";
		$scope.tabkey = $stateParams.tag||0;
		$scope.flashKey =  $stateParams.tag;
		$scope.one = [];
		$scope.params = $stateParams;
		this.msgScroll = window.innerHeight - 350;
		$scope.scollbar_y = $scope.msgScroll;
		if (!$stateParams.tag) {
			return $state.go('home.message', {tag:0, page:1}, {reload: true});
		};
		
		/**
		 * tab切换推荐页
		 * @param  {[number]} num       2是系统默认10条信息
		 * @param  {[type]} data_type [description]
		 * @param  {[type]} page      [description]
		 * @return {[type]}           [description]
		 */
		$scope.upload = function(){
			$scope.reload(true);
		}
		$scope.recommended_page = $stateParams.page||1;
		$scope.data_type = '1';
		$scope.getrecommendedLists = function (num) {
			var page = $scope.recommended_page;
			var data_type = $scope.data_type;
			return messageService.recommendedlist({
				uid: BONDCONFIG.USERINFO.uid,
				is_updown: num,
				data_type: data_type,
				cur_page: page,
				read_cnt: 0
			}).then((res) => {
				if (num == 1 && res.data.data.length == 0 ) {
					$scope.one = [];
					return $scope.getrecommendedLists(2);
				}else{
					return res;
				}
			}).then((res)=>{
				$scope.data_type = res.data.data_type;
				if (!page || page==1) {
				// console.log(page);
					$scope.one = [];
				};
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					$scope.one.push(res.data.data[i]);
				}
				// $scope.page++
				$scope.recommended_page++;
				return res;
			});
		};
		$scope.reload = function(){
			 $state.reload(true);
		}
		// $scope.getrecommendedLists();
		/**
		 * 推荐要闻
		 */
		$scope.importantListsarray_time = '';
		$scope.importantListsarray = [];
		$scope.importantLists = function(){
			let promise = messageService.importantList({
				uid:BONDCONFIG.USERINFO.uid,
			}).then((res) => {
				console.log(res);
				
				// $scope.importantListsarray_time = res.data.data[0].info_time;
				$scope.importantListsarray = res.data.data;
				console.log($scope.importantListsarray_time);
				return res;
			});
		}
		// $scope.importantLists();
		/**
		 * 快讯
		 */
		$scope.qinfo_page =  1;
		$scope.qinfoLists = function () {
			let promise = messageService.qinfoList({
				uid:BONDCONFIG.USERINFO.uid,
				cur_page: $scope.qinfo_page,
			}).then((res) => {
				if ($scope.qinfo_page==1) {
					$scope.flash_one = [];
				};
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					$scope.flash_one.push(res.data.data[i]);
				}
				$scope.qinfo_page++;
				return res;
			});
		};
		// $scope.qinfoLists();
		/**
		 * 扫雷
		 */
		// $scope.sweepLists_page =  1;
		// $scope.sweepLists = function(set_init_page){
		// 		if(set_init_page){
		// 		$scope.sweepLists_page = set_init_page;
		// 	}
		// 	let promise = messageService.sweepList({
		// 		uid:BONDCONFIG.USERINFO.uid,
		// 		cur_page: $scope.sweepLists_page,
		// 	}).then((res) => {
		// 		if ($scope.sweepLists_page==1) {
		// 			$scope.flash_one_sweepLists= [];
		// 		};
		// 		for (var i = 0, len = res.data.data.length; i < len; i++) {
		// 			$scope.flash_one_sweepLists.push(res.data.data[i]);
		// 		}
		// 		$scope.sweepList_page++;
		// 		return res;
		// 	});
		// }
		
		/**
		 * 扫雷列表
		 * @param {[number]} bound_org_id 个债机构ID
		 * @param {[type]} set_init_page 设置初始页
		 */
		$scope.one_sweepLists = [];
		$scope.sweepLists_page = $stateParams.page || 1;
		$scope.sweepLists = function(set_init_page) {
			if (set_init_page) {
				$scope.sweepHisLists_page = set_init_page;
			}

			return messageService.sweepList({
				uid: BONDCONFIG.USERINFO.uid,
				cur_page: $scope.sweepLists_page,
			}).then((res) => {
				console.log(res);
				if ($scope.sweepLists_page == 1) {
					$scope.one_sweepLists = [];
				};
				// $scope.dataTime = res.data.list.date_str;
				console.log(res.data.data.list.length);
				var len = res.data.data.list.length
				for (var i = 0; i < len; i++) {

					if (res.data.data.list[i].data) {
						var _len = res.data.data.list[i].data.length
						for (var j = 0; j < _len; j++) {
							if (res.data.data.list[i].data[j].bond_tags) {
								res.data.data.list[i].data[j].bond_tags = JSON.parse(res.data.data.list[i].data[j].bond_tags);

							}
						}
					}
					// debugger;
					$scope.one_sweepLists.push(res.data.data.list[i]);

				}
				console.log($scope.one_sweepLists);

				$scope.sweepLists_page++;
				console.log($scope.sweepLists_page)
			});
		}
		/**
		 * 
		 * @param {[number]} 扫雷页面跳转函数
		 * @param {[type]} 
		 */
		 $scope.changeFn = function(_iid,is_important){
		 	// debugger;
		 	if(is_important!=1&&_iid!=0){
		 		return $state.go('home.messagedetail', {iid: _iid}, {reload: true});
		 	} 
		 	// if(_iid!=0&&(is_important!=1||is_important==1)){
		 	// 	return $state.go('home.messagedetail', {iid: _iid}, {reload: true});
		 	// }

		 }



		/**
		 * 负面新闻
		 * @param {[number]} catagory 3全部 4负面 6自媒体
		 * @param {[type]} set_init_page 设置初始页
		 */
		$scope.message_page = $stateParams.page || 1;
		$scope.messagelists = function(catagory, set_init_page) {
			if(set_init_page){
				$scope.message_page = set_init_page;
			}
			return messageService.messagelist({
				uid:BONDCONFIG.USERINFO.uid,
				cur_page: $scope.message_page,
				catagory:catagory,
			}).then((res) => {
				if ($scope.message_page==1) {
					$scope.one = [];
				};
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					$scope.one.push(res.data.data[i]);
				}
				$scope.message_page++;
			});
		}

		/**
		 * 日报
		 * @param {[number]} 
		 * @param {[type]} set_init_page 设置初始页
		 */
		$scope.ribaolist_all = [];
		 $scope.dayInfoLists_page = $stateParams.page;
		$scope.dayInfoLists = function(set_init_page) {
			if(set_init_page){
				$scope.dayInfoLists_page = set_init_page;
			}
			let promise = messageService.dayInfoList({
				uid:BONDCONFIG.USERINFO.uid,
				cur_page: $scope.dayInfoLists_page,
				// cur_page: collections_page_collections
			}).then((res) => {
				console.log(res);
				if ($scope.dayInfoLists_page==1) {
					$scope.ribaolist = [];
				};
				$scope.ribaolist_all = res.data.data.list;
				// var len_01=res.data.data.list.length;

				// for (var i = 0; i < len_01; i++) {
				// 	$scope.ribaolist_all.push(res.data.data.list[i]);
					// $scope.ribaolist.push(res.data.data.list[i]);
				// }
				$scope.ribaolist[0] = $scope.ribaolist_all[0];
				console.log($scope.ribaolist);
				$scope.dayInfoLists_page++;

			});
		}
		$scope.dayInfoLists();
		
		/**
		 * 点击左侧日报列表，右边展示
		 * @param {[number]} S
		 * @param {[type]} set_init_page 设置初始页
		 */
		
		$scope.msgScroll = window.innerHeight;
		 $scope.change_ribao = function(index){
		 	$('#table_id').scrollTop(0);
		 	$scope.ribaolist[0]=$scope.ribaolist_all[index];
		 	// $state.reload(true);
		 }
		/**
		 * 收藏
		 */
		$scope.collections_page = $stateParams.page;
		$scope.collections = function(set_init_page) {
			if(set_init_page){
				$scope.collections_page = set_init_page;
			}
			let promise = messageService.collection({
				uid:BONDCONFIG.USERINFO.uid,
				cur_page: $scope.collections_page,
				// cur_page: collections_page_collections
			}).then((res) => {
				if ($scope.collections_page==1) {
					$scope.one = [];
				};
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					$scope.one.push(res.data.data[i]);
				}
				$scope.collections_page++;

			});
		}

		/**
		 * 收藏数
		 */
		$scope.num_one = 0;
		$scope.favoriteCnts = function() {
			let promise = messageService.favoriteCnt({
				uid:BONDCONFIG.USERINFO.uid
			});
			promise.then((res) => {
				$scope.num_one = res.data.data;
			});
		}
		$scope.favoriteCnts();

		/**
		 * 搜索
		 */
		
		$scope.search_page = $stateParams.page;
		$scope.searchInfoLists = function() {
			let promise = messageService.searchInfoList({
				uid:BONDCONFIG.USERINFO.uid,
				search: $scope.params.search,
				cur_page: $scope.search_page,
			});
			promise.then((res) => {
				if ($scope.search_page==1) {
					$scope.one = [];
				};
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					$scope.one.push(res.data.data[i]);
				}
				$scope.search_page++;

			});
		};
		$scope.doSearch = function(){
			$scope.search_page = 1;
			$scope.tabkey=5;
			$state.go('home.message', {search: $scope.params.search}, {reload: true});
		}

		$scope.closeSearch = function(){
			$state.go('home.message', {search: null}, { reload: true });
		}


		/**
		 * 判断底部加载哪一类数据
		 * @return {Function} [description]
		 */
		$scope.fn = function(){
			if($scope.tabkey==0){
				$scope.getrecommendedLists(1);
			}else if($scope.tabkey==1){
				$scope.messagelists(4);
			}else if($scope.tabkey==2){
				$scope.messagelists(6);
			}else if($scope.tabkey==3){
				$scope.messagelists(3);
			}else if($scope.tabkey==4){
				$scope.collections();
			} else if($scope.tabkey==6){
				$scope.sweepLists();
			}else if($scope.tabkey==7){
				$scope.dayInfoLists();
			}
		}

		/**
		 * 初始化
		 * @param  {[type]} $stateParams.search [description]
		 * @return {[type]}                     [description]
		 */
		$scope.initload = function(){
			$scope.qinfo_page =  1;
			$scope.importantLists();
			// $scope.importantLists();
			$scope.qinfoLists();
				var page = $stateParams.page;
			if ($stateParams.search) {
				$scope.search_page = 1;
				$scope.tabkey=5;
				$scope.searchInfoLists();
			}else{//没有搜索默认到推荐页
				if($scope.params.tag== 0){
					$scope.getrecommendedLists(1,page);
					
				}else if($scope.params.tag== 1){
					$scope.messagelists(4,page);
				}else if($scope.params.tag== 2){
					$scope.messagelists(6,page);
				} else if($scope.params.tag== 3){
					$scope.messagelists(3,page);
				}else if($scope.params.tag== 4){
					$scope.collections(page);
				}else if($scope.params.tag== 6){//扫雷
					$scope.sweepLists(page);
				}else if($scope.params.tag== 7){//日报
					$scope.dayInfoLists(page);
				}
			}
		}
		$scope.initload();

		/**
		 * 显示评论的梨数
		 * @return {Function} [description]
		 */
		


		pagetabService.activeTab({
			tabKey: 'home.message',
			routeState:'home.message',
			routeParams: angular.copy($stateParams),
			routeLabel:'资讯',
		});

	}
};
