app.component('bondquotationScm', {
	restrict: 'E',
	bindings: {
		searchQuery: '=',
		isCollapsed: '=',
	},
	templateUrl: './bondquotation.scm.html',
	controller: function ($scope, $state, $stateParams, NetBondquotationService, AlertModalService) {
		"ngInject";
		$scope.NetBondquotationService = NetBondquotationService;
		$scope.searchQuery = this.searchQuery;
		$scope.queryScmList = NetBondquotationService.defaultList;//方案列表
		this.addScmInfo = {};
		/**
		 * 处理搜索框默认值
		 * @type {[type]}
		 */
		if (this.searchQuery.bondid) {
			NetBondquotationService.queryBondBaseInfo({bondid:this.searchQuery.bondid})
			.then((res)=>{
				this.searchModel = res.data.data;
			});
		};
		
		/**
		 * 获取方案列表
		 * @return {[type]} [description]
		 */
		function getQueryScmList(){
			NetBondquotationService.queryScmList({
				scmEStatus:'1'
			}).then((res)=>{
				$scope.queryScmList = $scope.queryScmList.concat(res.data.data);
				if (!$stateParams.queryFlag) {;
					$state.go('home.bondquotation', $scope.searchQuery, {reload: true});
				};
			});
		}
		getQueryScmList();

		var _fields = ['bondTp', 'face', 'wrnt', 'issuEntp', 'rsdtrm', 'crclMkt', 'wrght', 'dbtitmRtg', 'sbjRtg'];
		/**
		 * 处理自选方案的数据可用于筛选
		 * @return {[type]} [description]
		 */
		function fullScmInfo()
		{
			var values = [];
			$scope.$ctrl.addScmInfo = $scope.$ctrl.addScmInfo||{};
			angular.forEach(_fields, function(_field){
				if (!$scope.$ctrl.addScmInfo[_field]) {
					$scope.$ctrl.addScmInfo[_field] = '';
				};
				if ($scope.$ctrl.addScmInfo[_field]) {
					values = $scope.$ctrl.addScmInfo[_field].split(',');
					$scope.$ctrl.addScmInfo[_field+'Selecteds'] = _.zipObject(values, values);
				};
			});
			//valtbpMns数值转化
			if ($scope.$ctrl.addScmInfo['valtbpMns']) {
				values = $scope.$ctrl.addScmInfo['valtbpMns'].split(',');
				values[0] = NetBondquotationService.__BP(values[0], true);
				values[1] = NetBondquotationService.__BP(values[1], true);
				$scope.$ctrl.addScmInfo['valtbpMnsSelecteds'] = values;
			}
			//yldrto 数值转化
			if ($scope.$ctrl.addScmInfo['yldrto']) {
				values = $scope.$ctrl.addScmInfo['yldrto'].split(',');
				values[0] = NetBondquotationService.__y(values[0], true);
				values[1] = NetBondquotationService.__y(values[1], true);
				$scope.$ctrl.addScmInfo['yldrtoSelecteds'] = values;
			}
			/**
			 * 地区
			 * @param  {[type]} $scope.$ctrl.addScmInfo['rgon'] [description]
			 * @return {[type]}                                 [description]
			 */
			if ($scope.$ctrl.addScmInfo['rgon']) {
				values = $scope.$ctrl.addScmInfo['rgon'].split(',');
				$scope.$ctrl.addScmInfo['rgonSelecteds'] = NetBondquotationService.findLocationById(values);
			};
			/**
			 * 行业
			 * @param  {[type]} $scope.$ctrl.addScmInfo['idy'] [description]
			 * @return {[type]}                                [description]
			 */
			if ($scope.$ctrl.addScmInfo['idy']) {
				values = $scope.$ctrl.addScmInfo['idy'].split(',');
				$scope.$ctrl.addScmInfo['idySelecteds'] = NetBondquotationService.findLocationById(values);
			};
			/**
			 * 年份
			 * @param  {[type]} $scope.$ctrl.addScmInfo['yr'] [description]
			 * @return {[type]}                               [description]
			 */
			if ($scope.$ctrl.addScmInfo['yr']) {
				values = $scope.$ctrl.addScmInfo['yr'].split(',');
				$scope.$ctrl.addScmInfo['yrSelecteds'] = NetBondquotationService.findLocationById(values);
			};
			

			console.log($scope.$ctrl.addScmInfo, 'fullScmInfo');
		}
		/**
		 * 保存之前处理数据
		 * @return {[type]} [description]
		 */
		function beforSaveScmInfo()
		{
			var valueArray = [];
			$scope.$ctrl.addScmInfo = $scope.$ctrl.addScmInfo||{};
			angular.forEach(_fields, function(_field){
				var k = _field+'Selecteds';
				if ($scope.$ctrl.addScmInfo[k]) {
					valueArray = _.values($scope.$ctrl.addScmInfo[k]);
					valueArray = _.compact(valueArray);
					$scope.$ctrl.addScmInfo[_field] = valueArray.join(',');
				};
			});
			//valtbpMns数值转化
			if ($scope.$ctrl.addScmInfo['valtbpMnsSelecteds']) {
				valueArray = _.values($scope.$ctrl.addScmInfo['valtbpMnsSelecteds']);
				valueArray[0] = NetBondquotationService.__BP(valueArray[0], false);
				valueArray[1] = NetBondquotationService.__BP(valueArray[1], false);
				$scope.$ctrl.addScmInfo['valtbpMns'] = valueArray.join(',');
			}
			//yldrto 数值转化
			if ($scope.$ctrl.addScmInfo['yldrtoSelecteds']) {
				valueArray = _.values($scope.$ctrl.addScmInfo['yldrtoSelecteds']);
				valueArray[0] = NetBondquotationService.__y(valueArray[0], false);
				valueArray[1] = NetBondquotationService.__y(valueArray[1], false);
				$scope.$ctrl.addScmInfo['yldrto'] = valueArray.join(',');
			};

			if ($scope.$ctrl.addScmInfo['rgonSelecteds']) {
				valueArray = _.map($scope.$ctrl.addScmInfo['rgonSelecteds'], 'id');
				$scope.$ctrl.addScmInfo['rgon'] = valueArray.join(',');
			};
			if ($scope.$ctrl.addScmInfo['yrSelecteds']) {
				valueArray = _.map($scope.$ctrl.addScmInfo['yrSelecteds'], 'id');
				$scope.$ctrl.addScmInfo['yr'] = valueArray.join(',');
			}else{
				$scope.$ctrl.addScmInfo['yr'] = '';
			};
			if ($scope.$ctrl.addScmInfo['idySelecteds']) {
				valueArray = _.map($scope.$ctrl.addScmInfo['idySelecteds'], 'id');
				$scope.$ctrl.addScmInfo['idy'] = valueArray.join(',');
			};

			console.log($scope.$ctrl.addScmInfo, 'beforSaveScmInfo');
		}

		/**
		 * 获取方案详情
		 */
		this.getScmDetail = function (scm_id){
			if(scm_id =='A' || scm_id =='B'){
				return false
			}
			return NetBondquotationService.getScmDetail({'scmid':scm_id})
			.then((res)=>{
				this.addScmInfo = res.data.data;
				fullScmInfo();
			});
		}
		this.getScmDetail($scope.searchQuery.queryFlag);
		//隐藏时恢复已激活方案
		$scope.$watch('$ctrl.isCollapsed', function(n){
			if (n==false) {
				$scope.$ctrl.getScmDetail($scope.searchQuery.queryFlag);
			};
		});

		/**
		 * 打开新增自选方案表单
		 * @return {[type]} [description]
		 */
		this.newAddShow = function(){
			if($scope.queryScmList.length>=7){
				AlertModalService.open('', '最多添加5个自选方案');
				return false;
			}
			this.addScmInfo = angular.copy(NetBondquotationService.scmFields);
		}

		/**
		 * 修改自选方案
		 * @return {[type]} [description]
		 */
		this.updateScm = function(){
			NetBondquotationService.updateScm(this.addScmInfo)
			.then((res)=>{
				AlertModalService.open('修改自选方案', '修改自选方案成功');
				// this.searchQuery.queryFlag = 'A';
				$state.go($state.current.name, this.searchQuery,{reload:true});
			}).catch((err)=>{
				AlertModalService.open('', res.data ? res.data.msg : res.msg);
			});
		}
		/**
		 * 新增自选方案
		 * @param  {[type]} addScmInfo [description]
		 * @return {[type]}            [description]
		 */
		this.newAddScm = function(addScmInfo){
			NetBondquotationService.addScm(this.addScmInfo)
			.then((res)=>{
				AlertModalService.open('新增自选方案', '新增自选方案成功');
				this.searchQuery.queryFlag = 'A';
				$state.go($state.current.name, this.searchQuery);
			}).catch((err)=>{
				AlertModalService.open('', err.data ? err.data.msg : err.msg);
			});
		}
		/**
		 * 保存按钮
		 * @return {[type]} [description]
		 */
		this.saveScm = function(){
			beforSaveScmInfo();
			if (this.addScmInfo.scmid) {
				this.updateScm();
			}else{
				this.newAddScm();
			}
		}
		//删除自选方案
		this.deleteScm = function(id){
			if(id== "A" || id=="B"){
				return false
			}
			return NetBondquotationService.deleteScm({scmid :id})
			.then((res)=>{
				AlertModalService.open('删除自选方案', '删除自选方案成功');
				this.searchQuery.queryFlag = 'A';
				$state.go($state.current.name, this.searchQuery);
			}).catch((err)=>{
				AlertModalService.open('', err.data? err.data.msg : err.msg);
			});
		}
		/**
		 * 搜索框下拉菜单模糊搜索
		 * @param  {[type]} keyWord [description]
		 * @return {[type]}         [description]
		 */
		this.queryQuote = function(keyWord){
			return NetBondquotationService.searchBondBreed({
				keyWord: keyWord,
				queryFlag: this.searchQuery.queryFlag,
				wthrFcs: this.searchQuery.wthrFcs,
			}).then((res)=>{
				return res.data.data;
			});
		}
		/**
		 * 搜索
		 * @return {[type]} [description]
		 */
		this.search = function(){
			this.searchQuery.bondid = this.searchModel.bondid;
			$state.go('home.bondquotation', this.searchQuery, {reload: true});
		}
		/**
		 * 发行人
		 * @param  {[type]} keyWord [description]
		 * @return {[type]}         [description]
		 */
		this.fullName = function(keyWord){
			return NetBondquotationService.getIssuerListByFullName({'organizationFullName':keyWord})
			.then(function(res) {
				console.log(res)
				if(res.data.data ){
					return res.data.data;
				}
			});
			// return NetBondquotationService.searchBondBreed({
			// 	keyWord: keyWord,
			// 	queryFlag: this.searchQuery.queryFlag,
			// 	wthrFcs: this.searchQuery.wthrFcs,
			// }).then((res)=>{
			// 	return res.data.data;
			// });
		}
		this.searchFullName = function(selected){
			$scope.$ctrl.addScmInfo.issuPsn = selected.organizationFullName;
		}
		this.checkedUpAll = function(item){//债券类型  逻辑
			if (item.value==1) {
				if (this.addScmInfo.bondTpSelecteds[1]==1) {
					angular.forEach(NetBondquotationService.bondTp.values1, function(item, k){
						$scope.$ctrl.addScmInfo.bondTpSelecteds[k] = item.value;
					});
				}else{
					angular.forEach(NetBondquotationService.bondTp.values1, function(item, k){
						$scope.$ctrl.addScmInfo.bondTpSelecteds[k] = null;
					});
				}
			};
			if (item.value==6) {
				if (this.addScmInfo.bondTpSelecteds[6]==6) {
					angular.forEach(NetBondquotationService.bondTp.values2, function(item, k){
						$scope.$ctrl.addScmInfo.bondTpSelecteds[k] = item.value;
					});
				}else{
					angular.forEach(NetBondquotationService.bondTp.values2, function(item, k){
						$scope.$ctrl.addScmInfo.bondTpSelecteds[k] = null;
					});
				}
			};
			beforSaveScmInfo();
			console.log(this.addScmInfo.bondTp);
		}

		this.allOrNoAll = function(){
			beforSaveScmInfo();
		}
	}
});