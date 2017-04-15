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
			// alert(11);
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
		$scope.importantListsarray = [];
		$scope.importantLists = function(){
			let promise = messageService.importantList({
				uid:BONDCONFIG.USERINFO.uid,
			}).then((res) => {
				
				$scope.importantListsarray = res.data.data;
				return res;
			});
		}
		$scope.importantLists();
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
		$scope.qinfoLists();


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
				if ($scope.dayInfoLists_page==1) {
					$scope.one = [];
				};
				for (var i = 0, len = res.data.data.length; i < len; i++) {
					$scope.one.push(res.data.data[i]);
				}
				$scope.dayInfoLists_page++;

			});
		}
		$scope.dayInfoLists();


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

			}
		}

		/**
		 * 初始化
		 * @param  {[type]} $stateParams.search [description]
		 * @return {[type]}                     [description]
		 */
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
			}
		}

		pagetabService.activeTab({
			tabKey: 'home.message',
			routeState:'home.message',
			routeParams: angular.copy($stateParams),
			routeLabel:'资讯',
		});

	}
};
