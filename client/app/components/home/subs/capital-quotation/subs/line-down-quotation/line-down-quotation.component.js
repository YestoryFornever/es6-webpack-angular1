app.component('lineDownQuotation', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./line-down-quotation.html',
	controller:function($scope,$state,$stateParams,netCapitalQuoteService,pagetabService){
		"ngInject";
		console.log($stateParams)
		pagetabService.activeTab({
			tabKey: 'home.capitalQuotation',
			routeState: $state.$current.name,
			routeLabel:"资金报价",
		});
		$scope.drc       = netCapitalQuoteService.drc;
		$scope.trmTp     = netCapitalQuoteService.trmTp;
		$scope.uDFTrm    = netCapitalQuoteService.uDFTrm;
		$scope.mode      = netCapitalQuoteService.mode;
		$scope.intrtTp   = netCapitalQuoteService.intrtTp;
		$scope.ctlg      = netCapitalQuoteService.ctlg;
		$scope.ctlgList  = {0:""};//种类
		$scope.trmTpList = {0:""};//期限
		// $scope.searchConditions = {
		// 	drc:$stateParams.drc||  "",//方向
		// 	trmTp:$stateParams.trmTp || "",//期限
		// 	trmLwrLmtVal:$stateParams.trmLwrLmtVal,//期限下限值
		// 	trmLwrLmtUnit:$stateParams.trmLwrLmtUnit || "1",//期限下限值单位
		// 	trmUpLmVal:$stateParams.trmUpLmVal ,//期限上限值
		// 	trmUpLmUnit:$stateParams.trmUpLmUnit || "1",//期限上限单位
		// 	intRtStrtVal:$stateParams.intRtStrtVal,//利率開始值
		// 	intRtEndVal:$stateParams.intRtEndVal,//利率結束值
		// 	ctlg:$stateParams.ctlg || "",//种类
		// 	cltnEStatus:$stateParams.cltnEStatus || 0,//收藏状态
		// 	pageNum:$stateParams.pageNum ||1,
		// 	pageSize:$stateParams.pageSize ||50,

		// }
		$scope.searchConditions = {
			drc:  "",//方向
			trmTp: "",//期限
			trmLwrLmtVal:'',//期限下限值
			trmLwrLmtUnit: "1",//期限下限值单位
			trmUpLmVal:'' ,//期限上限值
			trmUpLmUnit: "1",//期限上限单位
			intRtStrtVal:'',//利率開始值
			intRtEndVal:'',//利率結束值
			ctlg: "",//种类
			cltnEStatus: '',//收藏状态
			pageNum:1,
			pageSize:50,

		}
		$scope.getList = function(){
			$scope.beforeSearch();
			netCapitalQuoteService.offlineQueryOfrHall($scope.searchConditions)
			.then((res)=>{
				$scope.infoList  = res.data.data.list;
				$scope.totalPage = res.data.data.page.totalPage;//总页数
			});
		}
		/**
		 * /复选  处理 联动问题
		 * @param  {[object]} obj [ list 对象]
		 * @param  {[number]} key [点击的那个按钮 value]
		 * @return {[type]}     [description]
		 */
		$scope.allOrNoAll = function(obj,key){
			$scope.beforeSearch();
		}
		var _fields = ['trmTp', 'ctlg'];
		/**
		 * 发送前处理数据
		 * @return {[type]} [description]
		 */
		$scope.beforeSearch = function(){
			var valueArray = [];
			angular.forEach(_fields, function(_field){
				// debugger
				var k = _field+'Selecteds';
				if ($scope.searchConditions[k]) {
					valueArray = _.values($scope.searchConditions[k]);
					valueArray = _.compact(valueArray);
					$scope.searchConditions[_field] = valueArray.join(',');
				};
			});
			/**
			 * 收藏状态
			 * @type {[type]}
			 */
			$scope.searchConditions.cltnEStatus = $scope.searchConditions.cltnEStatus==false? 0 :1;
			// $scope.searchConditions.cltnEStatus = $scope.searchConditions.cltnEStatus ? 0 :1;
			if($scope.searchConditions.trmLwrLmtVal && $scope.searchConditions.trmUpLmVal){//期限 输入框值存在
				$scope.searchConditions.trmTp = $scope.searchConditions.trmTp+","+11;
			}
			//利率 输入框值存在
			if($scope.searchConditions.intRtStrtVal && $scope.searchConditions.intRtEndVal){
				$scope.searchConditions.intrtTp = $scope.searchConditions.trmTp+","+11;
			}
		}
		/**
		 * 初始化调用
		 */
		$scope.getList();
		/**
		 * 改变收藏状态
		 */
		$scope.changeStatus = function(item){
			item.cltnEStatus = item.cltnEStatus ? 0 :1;
			netCapitalQuoteService.onlineUpdateOfrCltnEStatus({
				ofrid:item.ofrid,
				cltnEStatus:item.cltnEStatus,

			})
		}
		/**
		 * 表格字段
		 */
		$scope.fields = [
			{
				label: '',
				order: false,
				template:'',
				thNgClass: function($item){
					return {'bgStar':true, 'active':$scope.searchConditions.cltnEStatus}
				},
				thClick:function(){
					$scope.searchConditions.cltnEStatus = !$scope.searchConditions.cltnEStatus;
					$scope.getList();
				},
				tdNgClass: function($item){
					return {'bgStar':true, 'active':$item.cltnEStatus}
				},
				tdClick:function($item){
					$scope.changeStatus($item)
				},
			},
			{
				label: '报价方',
				order: false,
				template:'{{$item.instNm |addTwoLine}}-{{$item.userNm |addTwoLine}}',
			},
			{
				label: '联系方式',
				order: false,
				templateUrl:'./field_item.html',
				tdNgClass:function($item){
					return 'tel';
				}
			},
			{
				label: '种类',
				order: false,
				template:'{{$item.ctlgNm }}',
			},
			{
				label: '隔夜',
				order: false,
				template:'{{$item.dy1IntRtVal | addTwoLine}}',
			},
			{
				label: '7天',
				order: false,
				template:'{{$item.dy7IntRtVal | addTwoLine}}',
			},
			{
				label: '14天',
				order: false,
				template:'{{$item.dy14IntRtVal | addTwoLine}}',
			},
			{
				label: '21天',
				order: false,
				template:'{{$item.dy21IntRtVal | addTwoLine}}',
			},
			{
				label: '1个月',
				order: false,
				template:'{{$item.mo1IntRtVal | addTwoLine}}',
			},
			{
				label: '2个月',
				order: false,
				template:'{{$item.mo2IntRtVal | addTwoLine}}',
			},
			{
				label: '3个月',
				order: false,
				template:'{{$item.mo3IntRtVal | addTwoLine}}',
			},
			{
				label: '6个月',
				order: false,
				template:'{{$item.mo6IntRtVal | addTwoLine}}',
			},
			{
				label: '9个月',
				order: false,
				template:'{{$item.mo9IntRtVal | addTwoLine}}',
			},
			{
				label: '1年',
				order: false,
				template:'{{$item.yr1IntRtVal | addTwoLine}}',
			},
			{
				label: '其他',
				order: false,
				templateUrl:'./other.html',
			},
			{
				label: '备注',
				order: false,
				template:'<div class="rmrk" uib-tooltip="{{$item.rmrk}}">{{$item.rmrk}}</div>',
			},
		]
		 // end controller
	}
})


