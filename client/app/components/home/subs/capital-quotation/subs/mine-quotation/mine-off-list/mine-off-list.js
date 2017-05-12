app.component('mineoffListComponent', {
	restrict: 'EA',
	bindings: {
		active:'='
	},
	templateUrl:'./mine-off-list.html',
	controller:function($scope,$state,$stateParams,AlertModalService, netCapitalQuoteService,UikitPager){
		"ngInject";
		$scope.maxSize=5;
		$scope.offSearchCont={
			pageSize: 10,
			active:$stateParams.active||1 ,
			pageNum:$stateParams.pageNum||1 ,
		}
		$scope.Pager = new UikitPager($scope.offSearchCont.pageSize, 5);
		$scope.Pager.onSelected = function(page){
			$scope.offSearchCont.pageNum = page;
			$state.go($state.$current.name, $scope.offSearchCont);
		}
		/**
		 * 綫下 报价 列表
		 * @return {[type]} [description]
		 */
		$scope.offlineGetMyOfrList = function(){
			netCapitalQuoteService.offlineGetMyOfrList($scope.offSearchCont)
			.then((res)=>{
				$scope.offlineList = res.data.data.list;
				var offTotalPage = res.data.data.page.totalResult;//总tiao数
				$scope.Pager.setTotal(offTotalPage);
				$scope.Pager.setPage($scope.offSearchCont.pageNum);
			},(err)=>{
                AlertModalService.open(null ,err.data.msg)
            });

		}
		/**
		 * 翻页
		 * @param  {[type]} n){			console.log(n)			$scope.offlineGetMyOfrList();		} [description]
		 * @return {[type]}                                                           [description]
		 */
		$scope.pageNumChange =function(){
			$scope.offlineGetMyOfrList()
		}
		$scope.offlineGetMyOfrList();
		/**
		 * 线下 表格字段
		 * @type {Array}
		 */
		$scope.offLinefields = [
			{
				label: '方向',
				order: false,
				template:'{{$item.drcNm |addTwoLine}}',
				tdNgClass:function($item){
					return	{ 'colorH' : $item.drc==2 ,'colorI':$item.drc==1 }
				}
			},
			{
				label: '种类',
				order: false,
				template:'{{$item.ctlgNm  |addTwoLine}}',
			},
			{
				label: '隔夜',
				order: false,
				template:'{{$item.dy1IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '7天',
				order: false,
				template:'{{$item.dy7IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '14天',
				order: false,
				template:'{{$item.dy14IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '21天',
				order: false,
				template:'{{$item.dy21IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '1个月',
				order: false,
				template:'{{$item.mo1IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '2个月',
				order: false,
				template:'{{$item.mo2IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '3个月',
				order: false,
				template:'{{$item.mo3IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '6个月',
				order: false,
				template:'{{$item.mo6IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '9个月',
				order: false,
				template:'{{$item.mo9IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '1年',
				order: false,
				template:'{{$item.yr1IntRtVal |amtFilter |addTwoLine}}',
			},
			{
				label: '其他',
				order: false,
				templateUrl:'./other.html',
			},
			{
				label: '发布时间',
				order: false,
				template:'{{$item.ofrDt  |addTwoLine}}',
			},
			{
				label: '备注',
				order: false,
				tdNgClass:function(){
					return {'maxWid15' :true}
				},
				template:'<div class="rmrk"  tooltip-placement="bottom-left" uib-tooltip="{{$item.rmrk}}">{{$item.rmrk |addTwoLine}}</div>',
			},
			{
				label: '状态',
				order: false,
				template:'{{$item.eStatusNm  |addTwoLine}}',
			},
			{
				label: '操作',
				order: false,
				template:'<offline-field-component item="$item"></offline-field-component>',
			},
		]
		// end controller
	}
})