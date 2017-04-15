
app.config(($stateProvider, $urlRouterProvider) => {

	$stateProvider
		.state('home.capitalQuotation.onLineBond', {
			url: '/onLineBond?:isShowHead',
			views: {
				'list@home.capitalQuotation': {
					component: 'onLineBond'
				}
			},
		}).state('home.capitalQuotation.onLineBond.create', {
			url: '/create?:isShowHead?:ofrid',
			views: {
				'lineupCreat@home.capitalQuotation.onLineBond': {
					component: 'lineUpComponent'
				}
			},
		});
})
.component('onLineBond', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./on-line-bond.html',
	controller:function($scope,$state,$stateParams,netCapitalQuoteService,pagetabService){
		"ngInject";
		$scope.trmTpList={0:''};
		$scope.modeList={0:''};
		pagetabService.activeTab({
			tabKey: 'home.capitalQuotation',
			routeState: $state.$current.name,
			routeLabel:"资金报价",
		});
		// $scope.intrtTpList={0:''};
		$scope.searchConditions={
			ofrid:$stateParams.ofrid ||'',
			drc:$stateParams.drc ||'',
			trmTp:"",//期限类型
			trmLwrLmtVal:$stateParams.trmLwrLmtVal ||'',//期限下限值
			trmLwrLmtUnit:$stateParams.trmLwrLmtUnit ||'1',//期限下限单位
			trmUpLmVal:$stateParams.trmUpLmVal ||'',//期限上限值
			trmUpLmUnit:$stateParams.trmUpLmUnit ||'1',//期限上限单位
			mode:$stateParams.mode ||'',//模式
			intrtTpBtn:$stateParams.intrtTpBtn ||"",
			intrtTp:$stateParams.intrtTp ||'',//利率类型
			intRtStrtVal:$stateParams.intRtStrtVal ||'',//利率开始值
			intRtEndVal:$stateParams.intRtEndVal ||'',//利率结束值
			amtStrtVal:$stateParams.amtStrtVal ||'',//金额开始值
			amtEndVal:$stateParams.amtEndVal ||'',//金额结束值
			amtUnit:$stateParams.amtUnit ||'1',//金额单位
			cltnEStatus:$stateParams.cltnEStatus ||'',//收藏状态
			eStatus:$stateParams.eStatus ||'',//报价状态
			trmTpBtn:'',
			pageNum:$stateParams.pageNum ||1,
			pageSize:$stateParams.pageSize ||50,

		}
		$scope.drc = netCapitalQuoteService.drc;
		$scope.trmTp = netCapitalQuoteService.trmTp;
		$scope.mode = netCapitalQuoteService.mode;
		$scope.intrtTp = netCapitalQuoteService.intrtTp;
		/**
		 *  获取列表
		 * @return {[type]} [description]
		 */
		$scope.getList = function(){
			$scope.beforeSearch();
			netCapitalQuoteService.onlineQueryOfrHall($scope.searchConditions)
			.then((res)=>{
				$scope.infoList = res.data.data.list;
				$scope.totalPage = res.data.data.page.totalPage;//总页数
			});
		}
		var _fields = ['trmTpBtn', 'mode'];
		$scope.beforeSearch = function(){
			var valueArray = [];
			let arr =[];
			angular.forEach(_fields, function(_field){
				// debugger
				var k = _field+'Selecteds';
				if ($scope.searchConditions[k]) {
					valueArray = _.values($scope.searchConditions[k]);
					valueArray = _.compact(valueArray);
					if($scope.searchConditions.trmLwrLmtVal && $scope.searchConditions.trmUpLmVal){//期限 输入框值存在
						valueArray.push('11');
					}
					$scope.searchConditions[_field] = valueArray.join(',');
				};
			});
			// debugger
			$scope.searchConditions.cltnEStatus = $scope.searchConditions.cltnEStatus==false? 0 :1;
			$scope.searchConditions.intrtTp = $scope.searchConditions.intrtTpBtn;
			$scope.searchConditions.trmTp = $scope.searchConditions.trmTpBtn;
			//处理金额
			if($scope.searchConditions.amtUnit =='1'){//金额 万
				$scope.searchConditions.amtStrtVal = $scope.searchConditions.amtStrt ? $scope.searchConditions.amtStrt*10000 :'';
				$scope.searchConditions.amtEndVal = $scope.searchConditions.amtEnd ? $scope.searchConditions.amtEnd*10000 :'';
			}
			if($scope.searchConditions.amtUnit =='2'){//金额 亿
				$scope.searchConditions.amtStrtVal = $scope.searchConditions.amtStrt ? $scope.searchConditions.amtStrt*100000000 :'';
				$scope.searchConditions.amtEndVal = $scope.searchConditions.amtEnd ? $scope.searchConditions.amtEnd*100000000 :'';
			}
			// //利率 输入框值存在
			if($scope.searchConditions.intRtStrtVal && $scope.searchConditions.intRtEndVal){
				$scope.searchConditions.intrtTp = $scope.searchConditions.intrtTpBtn+","+4;
			}
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
		/**
		 * 初始化 调用
		 */
		$scope.getList();
		/**
		 * 改变状态
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.changeStatus = function(item){
			item.cltnEStatus = item.cltnEStatus ? 0 :1;
			netCapitalQuoteService.onlineUpdateOfrCltnEStatus({
				ofrid:item.ofrid,
				cltnEStatus:item.cltnEStatus,

			})
		}

		/**
		 * 线上 表格字段
		 * @type {Array}
		 */
		$scope.fields = [
			{
				label: '',
				order: false,
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
					$scope.changeStatus($item);
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
				label: '方向',
				order: false,
				template:'{{$item.drcNm  |addTwoLine}}',
			},
			{
				label: '期限',
				order: false,
				template:'{{$item.trmTpNm  |addTwoLine}}',
			},
			{
				label: '金额',
				order: false,
				template:'{{$item.amt |amtFilter | addTwoLine}}{{$item.amtUnitNm | addTwoLine}}',
			},
			{
				label: '模式',
				order: false,
				template:'{{$item.modeNm  |addTwoLine}}',
			},
			{
				label: '利率',
				order: false,
				template:'{{$item.intrtTpNm | intrtTpFilter  | addTwoLine }}{{$item.intrtVal |amtFilter | addTwoLine}}{{$item.intrtTpNm | intrtTpFilter:true }}',
			},
			{
				label: '交易限制',
				order: false,
				template:'<div class="txnRstNm" tooltip-trigger="\'outsideClick\'" tooltip-placement="bottom-left" uib-tooltip="{{$item.txnRstNm}}">{{$item.txnRstNm}}</div>',
			},
			{
				label: '发布时间',
				order: false,
				template:'{{$item.ofrDt |ofrDtFilter |addTwoLine}}',
			},
			{
				label: '备注',
				order: false,
				template:'<div class="rmrk" tooltip-trigger="\'outsideClick\'" tooltip-placement="bottom-left" uib-tooltip="{{$item.rmrk}}">{{$item.rmrk}}</div>',
			}
		]
		// $scope.fields = [
		// 	{
		// 		label: '',
		// 		order: false,
		// 		template:'',
		// 		thNgClass: function($item){
		// 			return {'bgStar':true, 'active':$scope.searchConditions.cltnEStatus}
		// 		},
		// 		thClick:function(){
		// 			$scope.searchConditions.cltnEStatus = !$scope.searchConditions.cltnEStatus;
		// 			$scope.getList();
		// 		},
		// 	},
		// 	{
		// 		label: '种类',
		// 		order: false,
		// 		template:'{{$item.ctlgNm}}',
		// 	},
		// 	{
		// 		label: '隔夜',
		// 		order: false,
		// 		template:'{{$item.dy1IntRtVal}}',
		// 	},
		// 	{
		// 		label: '7天',
		// 		order: false,
		// 		template:'{{$item.dy7IntRtVal}}',
		// 	},
		// 	{
		// 		label: '14天',
		// 		order: false,
		// 		template:'{{$item.dy14IntRtVal}}',
		// 	},
		// 	{
		// 		label: '21天',
		// 		order: false,
		// 		template:'{{$item.dy21IntRtVal}}',
		// 	},
		// 	{
		// 		label: '1个月',
		// 		order: false,
		// 		template:'{{$item.mo1IntRtVal}}',
		// 	},
		// 	{
		// 		label: '2个月',
		// 		order: false,
		// 		template:'{{$item.mo2IntRtVal}}',
		// 	},
		// 	{
		// 		label: '3个月',
		// 		order: false,
		// 		template:'{{$item.mo3IntRtVal}}',
		// 	},
		// 	{
		// 		label: '6个月',
		// 		order: false,
		// 		template:'{{$item.mo6IntRtVal}}',
		// 	},
		// 	{
		// 		label: '9个月',
		// 		order: false,
		// 		template:'{{$item.mo9IntRtVal}}',
		// 	},
		// 	{
		// 		label: '1年',
		// 		order: false,
		// 		template:'{{$item.yr1IntRtVal}}',
		// 	},
		// 	{
		// 		label: '其他',
		// 		order: false,
		// 		template:'{{$item.uDFInRtVal1}}',
		// 	},
		// 	{
		// 		label: '发布时间',
		// 		order: false,
		// 		template:'{{$item.ofrDt}}',
		// 	},
		// 	{
		// 		label: '备注',
		// 		order: false,
		// 		template:'{{$item.rmrk}}',
		// 	},
		// 	{
		// 		label: '状态',
		// 		order: false,
		// 		template:'{{$item.eStatusNm}}',
		// 	},
		// 	{
		// 		label: '操作',
		// 		order: false,
		// 		template:'<offline-field-component item="$item"></offline-field-component>',
		// 	},
		// ]
	}
})

