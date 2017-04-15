let originationdetailsComponent = {
	restrict: 'E',
	bindings: {},
	templateUrl: './originationdetails.html',
	controller: function(originationdetailsService, $state, $stateParams, pagetabService, $scope){
		"ngInject";
		$scope.tabkey = $stateParams.tag||0;
		$scope.flashKey =  $stateParams.tag;
		$scope.one = [];
		// $scope.params = $stateParams;
		// if (!$stateParams.tag) {
		// 	return $state.go('home.message', {tag:0, page:1}, {reload: true});
		// };
		
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
		
		// $scope.getrecommendedLists();
		/**
		 * 推荐要闻
		 */
		
		/**
		 * 快讯
		 */
		$scope.qinfo_page =  1;
		$scope.qinfoLists = function () {
			let promise = originationdetailsService.qinfoList({
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
		// $scope.message_page = $stateParams.page || 1;
		// $scope.messagelists = function(catagory, set_init_page) {
		// 	if(set_init_page){
		// 		$scope.message_page = set_init_page;
		// 	}
		// 	return messageService.messagelist({
		// 		uid:BONDCONFIG.USERINFO.uid,
		// 		cur_page: $scope.message_page,
		// 		catagory:catagory,
		// 	}).then((res) => {
		// 		if ($scope.message_page==1) {
		// 			$scope.one = [];
		// 		};
		// 		for (var i = 0, len = res.data.data.length; i < len; i++) {
		// 			$scope.one.push(res.data.data[i]);
		// 		}
		// 		$scope.message_page++;
		// 	});
		// }

		/**
		 * 日报
		 * @param {[number]} 
		 * @param {[type]} set_init_page 设置初始页
		 */
		
		/**
		 * 收藏
		 */
		

		/**
		 * 收藏数
		 */
		
		/**
		 * 搜索
		 */
		
		/**
		 * 判断底部加载哪一类数据
		 * @return {Function} [description]
		 */
		
		/**
		 * 初始化
		 * @param  {[type]} $stateParams.search [description]
		 * @return {[type]}                     [description]
		 */
		
		pagetabService.activeTab({
			tabKey: 'home.message',
			routeState:'home.message',
			routeParams: angular.copy($stateParams),
			routeLabel:'资讯',
		});

	}
};
