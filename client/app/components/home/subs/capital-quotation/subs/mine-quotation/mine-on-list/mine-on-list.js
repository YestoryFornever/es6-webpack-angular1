app.component('mineonListComponent', {
	restrict: 'EA',
	bindings: {},
	templateUrl:'./mine-on-list.html',
	controller:function($scope,$state,$stateParams,AlertModalService,NetBondquotationService, netCapitalQuoteService, UikitPager){
		'ngInject';
		$scope.maxSize=5;
		console.log($stateParams)
		$scope.onSearchCont={
			pageSize:10 ,
			active:$stateParams.active||0 ,
			pageNum:$stateParams.pageNum||1 ,
		}
		$scope.Pager = new UikitPager($scope.onSearchCont.pageSize, 5);
		$scope.Pager.onSelected = function(page){
			$scope.onSearchCont.pageNum = page;
			$state.go($state.$current.name, $scope.onSearchCont);
		}
		$scope.data = netCapitalQuoteService.txnRstSelect;
		/**
		 * 綫上 报价 列表
		 * @return {[type]} [description]
		 */
		$scope.onlineGetMyOfrList = function(){
			netCapitalQuoteService.onlineGetMyOfrList($scope.onSearchCont)
			.then((res)=>{
				$scope.onlineList = res.data.data.list;
				var onTotalPage = res.data.data.page.totalResult;//总tiao数
				$scope.Pager.setTotal(onTotalPage);
				$scope.Pager.setPage($scope.onSearchCont.pageNum);
			},(err)=>{
                AlertModalService.open(null ,err.data.msg)
            });

		}
		/**
		 * 翻页
		 * @param  {[type]} n){			console.log(n)			$scope.offlineGetMyOfrList();		} [description]
		 * @return {[type]}                                                           [description]
		 */
		// $scope.pageNumChange =function(){
		// 	$scope.onlineGetMyOfrList()
		// }
		$scope.onlineGetMyOfrList();
		/**
		 * 线上 表格字段
		 * @type {Array}
		 */
		$scope.onLinefields = [
			{
				label: '方向',
				order: false,
				template:'{{$item.drcNm }}',
				tdNgClass:function($item){
					return	{ 'colorH' : $item.drc==2 ,'colorI':$item.drc==1 }
				}
			},
			{
				label: '期限',
				order: false,
				template:'{{$item.trmTpNm  |addTwoLine}}'
			},
			{
				label: '金额',
				order: false,
				templateUrl:'./amt.html'
			},
			{
				label: '利率',
				order: false,
				templateUrl:'./bondtp.html',
			},
			{
				label: '模式',
				order: false,
				tdNgClass:function(){
					return {'maxWid15':true}
				},
				template:'<span class="txnRstNm"  tooltip-placement="bottom-right" uib-tooltip="{{$item.modeNm}}">{{$item.modeNm  |addTwoLine}}</span>'
			},
			{
				label: '备注',
				order: false,
				tdNgClass:function(){
					return {'maxWid15' :true}
				},
				template:'<div class="rmrk"  tooltip-placement="bottom-center" uib-tooltip="{{$item.rmrk}}">{{$item.rmrk |addTwoLine}}</div>'
			},
			{
				label: '发布时间',
				order: false,
				template:'{{$item.ofrDt  |addTwoLine}}'
			},
			{
				label: '状态',
				order: false,
				template:'{{$item.eStatusNm  |addTwoLine}}'
			},
			{
				label: '操作',
				order: false,
				template:'<online-field-component item = "$item"></online-field-component>'
			},
		]
		// end controller
	}
})