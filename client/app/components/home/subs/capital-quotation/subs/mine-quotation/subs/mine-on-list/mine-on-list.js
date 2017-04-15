app.component('mineonListComponent', {
	restrict: 'EA',
	bindings: {},
	templateUrl:'./mine-on-list.html',
	controller:function($scope,$state,$stateParams, netCapitalQuoteService){
		'ngInject';
		$scope.maxSize=5;
		console.log($stateParams)
		$scope.onSearchCont={
			pageSize:10 ,
			active:'',
			pageNum:1 ,
		}
		/**
		 * 綫上 报价 列表
		 * @return {[type]} [description]
		 */
		$scope.onlineGetMyOfrList = function(){
			netCapitalQuoteService.onlineGetMyOfrList($scope.onSearchCont)
			.then((res)=>{
				$scope.onlineList = res.data.data.list;
				$scope.onTotalPage = res.data.data.page.totalResult;//总页数
			});

		}
		/**
		 * 翻页
		 * @param  {[type]} n){			console.log(n)			$scope.offlineGetMyOfrList();		} [description]
		 * @return {[type]}                                                           [description]
		 */
		$scope.pageNumChange =function(){
			$scope.onlineGetMyOfrList()
		}
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
				template:'{{$item.amt | amtFilter}}{{$item.amtUnitNm  |addTwoLine}}'
			},
			{
				label: '利率',
				order: false,
				template:'{{$item.intrtTpNm | intrtTpFilter  | addTwoLine }}{{$item.intrtVal |amtFilter | addTwoLine}}{{$item.intrtTpNm | intrtTpFilter:true }}',
			},
			{
				label: '模式',
				order: false,
				template:'{{$item.modeNm  |addTwoLine}}'
			},
			{
				label: '备注',
				order: false,
				template:'{{$item.rmrk  |addTwoLine}}'
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