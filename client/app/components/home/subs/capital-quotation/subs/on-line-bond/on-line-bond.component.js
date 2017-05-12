app.component('onLineBond', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./on-line-bond.html',
	controller:function($scope,$state,$stateParams,AlertModalService,UikitPager,netCapitalQuoteService,pagetabService){
		"ngInject";
		$scope.trmTpList={0:''};
		$scope.modeList={0:''};
		pagetabService.activeTab({
			tabKey: 'home.capitalQuotation',
			routeState: 'home.capitalQuotation.onLineBond',
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
			intRtStrtVal1:$stateParams.intRtStrtVal1 ||'',//绑定
			intRtEndVal:$stateParams.intRtEndVal ||'',//利率结束值
			intRtEndVal1:$stateParams.intRtEndVal1 ||'',//绑定
			amtStrtVal:$stateParams.amtStrtVal ||'',//金额开始值
			amtEndVal:$stateParams.amtEndVal ||'',//金额结束值
			amtUnit:$stateParams.amtUnit ||'1',//金额单位
			cltnEStatus:$stateParams.cltnEStatus ||'',//收藏状态
			eStatus:$stateParams.eStatus ||'',//报价状态
			trmTpBtn:'',
			pageNum:$stateParams.pageNum ||1,
			pageSize:50,

		}
		$scope.drc = netCapitalQuoteService.drc;
		$scope.trmTp = netCapitalQuoteService.trmTp;
		$scope.mode = netCapitalQuoteService.mode;
		$scope.intrtTp = netCapitalQuoteService.intrtTp;
		/**
		 * 分页设置
		 * @return {[type]} [description]
		 */
		$scope.Pager = new UikitPager($scope.searchConditions.pageSize, 5);
		$scope.Pager.onSelected = function(page){
			$scope.searchConditions.pageNum = page;
			$state.go($state.$current.name, $scope.searchConditions);
		}
		/**
		 *  获取列表
		 * @return {[type]} [description]
		 */
		$scope.getList = function(num){
			if(num){
				$scope.searchConditions.pageNum = num;
			}
			$scope.beforeSearch();

			netCapitalQuoteService.onlineQueryOfrHall($scope.searchConditions)
			.then((res)=>{
				$scope.infoList = res.data.data.list;
				var totalPage = res.data.data.page.totalResult;//总页数
				$scope.Pager.setTotal(totalPage);
				$scope.Pager.setPage($scope.searchConditions.pageNum);
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
					$scope.searchConditions[_field] = valueArray.join(',');
				};
			});
			// debugger
			$scope.searchConditions.cltnEStatus = $scope.searchConditions.cltnEStatus==false? 0 :1;
			$scope.searchConditions.intrtTp = $scope.searchConditions.intrtTpBtn;
			$scope.searchConditions.trmTp = $scope.searchConditions.trmTpBtn;
			// if($scope.searchConditions['trmLwrLmtVal']  ||　$scope.searchConditions['trmUpLmVal']){
			// 	let arr = $scope.searchConditions.trmTp.split(',');
			// 	arr = _.compact(arr);
			// 	arr.push('11');
			// 	$scope.searchConditions.trmTp = arr.join(',');
			// }
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
			if($scope.searchConditions.intRtStrtVal || $scope.searchConditions.intRtEndVal){
				$scope.searchConditions.intrtTp = $scope.searchConditions.intrtTpBtn ?( $scope.searchConditions.intrtTpBtn ):'4';
			}
			if($scope.searchConditions.intrtTpBtn=='1'){
				$scope.searchConditions.intRtStrtVal=null;
				$scope.searchConditions.intRtEndVal=null;
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
				templateUrl:'./star.html',
				thNgClass: function($item){
					return {'bgStar':true, 'active':$scope.searchConditions.cltnEStatus}
				},
				thClick:function(){
					$scope.searchConditions.cltnEStatus = !$scope.searchConditions.cltnEStatus;
					$scope.getList();
				},
				tdNgClass: function($item){
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
				tdNgClass:function(){
					return {'maxWid15':true}
				},
				template:'<span tooltip-placement="bottom-right" uib-tooltip="{{$item.instNm}}-{{$item.userNm}}">{{$item.instNm |addTwoLine}}-{{$item.userNm |addTwoLine}}</span>',
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
				tdNgClass:function($item){
					return	{ 'colorH' : $item.drc==2 ,'colorI':$item.drc==1 }
				}
			},
			{
				label: '期限',
				order: false,
				template:'{{$item.trmTpNm  |addTwoLine}}',
			},
			{
				label: '金额',
				order: false,
				tdContNgHide:function($item){
					return   $item.amt ? false: true;
				},
				templateUrl:'./amt.html',
			},
			{
				label: '模式',
				order: false,
				tdNgClass:function(){
					return {'maxWid15':true}
				},
				template:'<span class="txnRstNm"  tooltip-placement="bottom-right" uib-tooltip="{{$item.modeNm}}">{{$item.modeNm  |addTwoLine}}</span>',
			},
			{
				label: '利率',
				order: false,
				templateUrl:'./bondtp.html',
			},
			{
				label: '交易限制',
				order: false,
				template:'<div class="txnRstNm"  tooltip-placement="bottom-right" uib-tooltip="{{$item.txnRstNm}}">{{$item.txnRstNm}}</div>',
			},
			{
				label: '备注',
				order: false,
				tdNgClass:function(){
 					return {'maxWid15':true}
				},
				template:'<div class="rmrk"  tooltip-placement="bottom-center" uib-tooltip="{{$item.rmrk}}">{{$item.rmrk}}</div>',
			},
			{
				label: '发布时间',
				order: false,
				template:'{{$item.ofrDt |ofrDtFilter |addTwoLine}}',
			},
		]
	}
})