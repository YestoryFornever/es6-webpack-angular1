app.component('lineDownQuotation', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./line-down-quotation.html',
	controller:function($scope,$state,$stateParams,AlertModalService,netCapitalQuoteService,UikitPager,pagetabService){
		"ngInject";
		pagetabService.activeTab({
			tabKey: 'home.capitalQuotation',
			routeState: 'home.capitalQuotation.lineDownQuotation',
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
		$scope.searchConditions = {
			drc: $stateParams.drc|| "",//方向
			trmTp: $stateParams.trmTp||"",//期限
			trmTpBtn: $stateParams.trmTpBtn||"",//期限
			trmLwrLmtVal:$stateParams.trmLwrLmtVal||'',//期限下限值
			trmLwrLmtVal1:$stateParams.trmLwrLmtVal1||'',//绑定
			trmLwrLmtUnit:$stateParams.trmLwrLmtUnit|| "1",//期限下限值单位
			trmUpLmVal:$stateParams.trmUpLmVal||'' ,//期限上限值
			trmUpLmVal1:$stateParams.trmUpLmVal1||'' ,//绑定
			trmUpLmUnit: $stateParams.trmUpLmUnit||"1",//期限上限单位
			intRtStrtVal:$stateParams.intRtStrtVal||'',//利率開始值
			intRtStrtVal1:$stateParams.intRtStrtVal1||'',//绑定
			intRtEndVal:$stateParams.intRtEndVal||'',//利率結束值
			intRtEndVal1:$stateParams.intRtEndVal1||'',//绑定
			ctlg: $stateParams.ctlg||"",//种类
			cltnEStatus: $stateParams.cltnEStatus||'',//收藏状态
			pageNum:$stateParams.pageNum||1 ,
			pageSize: 50,

		}
		/**
		 * 分页设置
		 * @return {[type]} [description]
		 */
		$scope.Pager = new UikitPager($scope.searchConditions.pageSize, 5);
		$scope.Pager.onSelected = function(page){
			$scope.searchConditions.pageNum = page;
			$state.go($state.$current.name, $scope.searchConditions);
		}
		$scope.getList = function(){
			$scope.beforeSearch();
			netCapitalQuoteService.offlineQueryOfrHall($scope.searchConditions)
			.then((res)=>{
				$scope.infoList  = res.data.data.list;
				var totalPage = res.data.data.page.totalResult;//总页数
				$scope.Pager.setTotal(totalPage);
				$scope.Pager.setPage($scope.searchConditions.pageNum);
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
		var _fields = ['trmTpBtn', 'ctlg',];
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
			$scope.searchConditions['trmTp'] = $scope.searchConditions['trmTpBtn'];
			if($scope.searchConditions['trmLwrLmtVal']  ||　$scope.searchConditions['trmUpLmVal']){
				let arr = $scope.searchConditions.trmTp.split(',');
				arr = _.compact(arr);
				arr.push('11');
				$scope.searchConditions.trmTp = arr.join(',');
			}
			/**
			 * 收藏状态
			 * @type {[type]}
			 */
			$scope.searchConditions.cltnEStatus = $scope.searchConditions.cltnEStatus==false? 0 :1;
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

			});
		}
		/**
		 * 表格字段
		 */
		$scope.fields = [
			{
				label: '',
				order: false,
				templateUrl:'./star.html',
				thNgClass: function($item){
					return {'bgStar':true, 'active':$scope.searchConditions.cltnEStatus}
				},
				thClick:function(){
					$scope.searchConditions.cltnEStatus = !$scope.searchConditions.cltnEStatus;
					$scope.getList();
				},
				tdNgClass: function($item){
					// ownCapitalQuoteOrNot
					return {'bgStar':true, 'active':$item.cltnEStatus,'bgNone':$item.ownCapitalQuoteOrNot}
				},
				tdClick:function($item){
					if(!$item.ownCapitalQuoteOrNot){
						$scope.changeStatus($item);
					}
				},
			},
			{
				label: '报价方',
				order: false,
				template:'<span tooltip-placement="bottom-right" uib-tooltip="{{$item.instNm}}-{{$item.userNm}}">{{$item.instNm |addTwoLine}}-{{$item.userNm |addTwoLine}}</span>',
				tdNgClass:function(){
					return 'maxWid15'
				}
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
				label: '方向',
				order: false,
				template:'{{$item.drcNm }}',
				tdNgClass:function($item){
					return	{ 'colorH' : $item.drc==2 ,'colorI':$item.drc==1 }
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
				template:'{{$item.dy1IntRtVal |amtFilter  | addTwoLine}}',
			},
			{
				label: '7天',
				order: false,
				template:'{{$item.dy7IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '14天',
				order: false,
				template:'{{$item.dy14IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '21天',
				order: false,
				template:'{{$item.dy21IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '1个月',
				order: false,
				template:'{{$item.mo1IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '2个月',
				order: false,
				template:'{{$item.mo2IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '3个月',
				order: false,
				template:'{{$item.mo3IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '6个月',
				order: false,
				template:'{{$item.mo6IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '9个月',
				order: false,
				template:'{{$item.mo9IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '1年',
				order: false,
				template:'{{$item.yr1IntRtVal |amtFilter | addTwoLine}}',
			},
			{
				label: '其他',
				order: false,
				templateUrl:'./other.html',
			},
			{
				label: '备注',
				order: false,
				tdNgClass:function(){
					return {'maxWid15' :true}
				},
				template:'<div class="rmrk"  tooltip-placement="left-bottom" uib-tooltip="{{$item.rmrk}}">{{$item.rmrk}}</div>',
			},
		]
		 // end controller
	}
})


