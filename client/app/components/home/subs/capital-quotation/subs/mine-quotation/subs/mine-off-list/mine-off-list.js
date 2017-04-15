app.component('mineoffListComponent', {
	restrict: 'EA',
	bindings: {
		active:'='
	},
	templateUrl:'./mine-off-list.html',
	controller:function($scope,$state,$stateParams, netCapitalQuoteService){
		"ngInject";
		$scope.maxSize=5;
		$scope.offSearchCont={
			pageSize: 10,
			acitve:'',
			pageNum: 1,
		}
		/**
		 * 綫下 报价 列表
		 * @return {[type]} [description]
		 */
		$scope.offlineGetMyOfrList = function(){
			netCapitalQuoteService.offlineGetMyOfrList($scope.offSearchCont)
			.then((res)=>{
				console.log(res);
				$scope.offlineList = res.data.data.list;
				$scope.offTotalPage = res.data.data.page.totalResult;//总页数
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
				template:'{{$item.dy1IntRtVal  |addTwoLine}}',
			},
			{
				label: '7天',
				order: false,
				template:'{{$item.dy7IntRtVal  |addTwoLine}}',
			},
			{
				label: '14天',
				order: false,
				template:'{{$item.dy14IntRtVal  |addTwoLine}}',
			},
			{
				label: '21天',
				order: false,
				template:'{{$item.dy21IntRtVal  |addTwoLine}}',
			},
			{
				label: '1个月',
				order: false,
				template:'{{$item.mo1IntRtVal  |addTwoLine}}',
			},
			{
				label: '2个月',
				order: false,
				template:'{{$item.mo2IntRtVal  |addTwoLine}}',
			},
			{
				label: '3个月',
				order: false,
				template:'{{$item.mo3IntRtVal  |addTwoLine}}',
			},
			{
				label: '6个月',
				order: false,
				template:'{{$item.mo6IntRtVal  |addTwoLine}}',
			},
			{
				label: '9个月',
				order: false,
				template:'{{$item.mo9IntRtVal  |addTwoLine}}',
			},
			{
				label: '1年',
				order: false,
				template:'{{$item.yr1IntRtVal  |addTwoLine}}',
			},
			{
				label: '其他',
				order: false,
				template:'{{$item.uDFInRtVal1  |addTwoLine}}',
			},
			{
				label: '发布时间',
				order: false,
				template:'{{$item.ofrDt  |addTwoLine}}',
			},
			{
				label: '备注',
				order: false,
				template:'{{$item.rmrk  |addTwoLine}}',
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