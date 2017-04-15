app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.bondquotation', {
			url: '/bondquotation/?:queryFlag?:wthrFcs?:bondid?:pageNum?:order?:desc',
			views: {
				'main@home': {
					component: 'bondquotation'
				},
			},
		})
})
.component('bondquotation', {
	restrict: 'E',
	bindings: {},
	templateUrl: './bondquotation.html',
	controller: function($scope, $state, $stateParams, $q, NetBondquotationService,$uibModal,$mdDialog,pagetabService,AlertModalService,easeMobService,NetChangeBondService,nowBondService,SendAlertService,$timeout){
		"ngInject";
		this.name ="债券报价";
		$scope.QueryQuoteList = []; //表格列表
		/**
		 * 搜索条件
		 * @type {Object}
		 */
		$scope.searchQuery = {
			queryFlag: $stateParams.queryFlag||'A',
			wthrFcs: $stateParams.wthrFcs||0,//是否关注
			bondid: $stateParams.bondid||'',
			ofrEStatus: $stateParams.ofrEStatus||'',
			pageNum: $stateParams.pageNum||1,
			pageSize:50,
			order: $stateParams.order||'',
			desc: $stateParams.desc||'',
		};
		/**
		 * 激活标签
		 * @type {String}
		 */
		pagetabService.activeTab({
			tabKey: 'home.bondquotation',
			routeState:"home.bondquotation",
			routeLabel:"债券报价",
		});
		/**
		 * 表格字段
		 */

		$scope.fields = [{
			label: '',
			order: false,
			thNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? true : false;
			},
			tdNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? true : false;
			},
			template: "<span ng-click='$ctrl.changeCareInfo(item,\"wthrFcs\" ,$event);' class=\"star\" ng-class='{\"active\":$item.wthrFcs == true}' ng-if='$item.ifpresentUser==0'></span>",
			thClick: function(){
				$scope.searchQuery.wthrFcs = $scope.searchQuery.wthrFcs==0?1:0;
				$state.go('home.bondquotation', $scope.searchQuery, {reload: true});
			},
			thNgClass: function($item){
				return {'starNor' : $scope.searchQuery.wthrFcs==0 ,'starSelect': $scope.searchQuery.wthrFcs==1 }
			},
			tdClick: function($item,ev){// 关注
				console.log(ev)
				ev.isDefaultPrevented();
				$item.wthrFcs = $item.wthrFcs==1?0:1;
				NetBondquotationService.updateQuoteState({
					bondOfrid: $item.bondOfrid,
					wthrFcs: $item.wthrFcs,
				})
				.then((res)=>{
					// console.log();
				});
			},
		},{
			label: '方向',
			order: '',
			thNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? false : true;
			},
			tdNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? false : true;
			},
			template: '<div style="min-width:0.5rem">{{$item.drc | bondQuotationDrc}}</div>',
			tdNgClass: function($item){
				return { 'colorH' : $item.drc=='1' ,'colorI':$item.drc=='-1' }
			},
			thClick:function(){
				return false
			},
			tdClick:function(){
				return false
			}
		},{
			label: '债券代码',
			order: '1',
			template: '{{$item.bondCd}}',
			tdNgClass:function(){
				return 'bondCd'
			}
		},{
			label: '债券简称',
			order: '2',
			tdNgClass:function(){
				return 'bondNm'
			},
			template: '<span  class="bondShrtnm" tooltip-placement="bottom" uib-tooltip="{{$item.bondShrtnm}}"> {{$item.bondShrtnm}} </span>',
		},{
			label: '数量(万)',
			order: '3',
			template: '{{$item.num  | numFilter}}',
		},{
			label: '方向',
			order: '',
			thNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? true : false;
			},
			tdNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? true : false;
			},
			template: '{{$item.drc | bondQuotationDrc}}',
			tdNgClass: function($item){
				return { 'colorH' : $item.drc=='1' ,'colorI':$item.drc=='-1' }
			},
		},{
			label: '收益率%',
			order: '4',
			tdNgClass:function(){
				return 'colorI'
			},
			template: '{{$item.yldrto | yldrtoFilter}}',
		},{
			label: '净价(元)',
			order: '5',
			template: '{{$item.netprc  | number:4}}',
		},{
			label: '剩余期限',
			order: '6',
			template: '{{$item.rsdtrm}}',
		},{
			label: '主/债评级',
			order: '7',
			template: '<span>{{$item.sbjRtg}}/{{$item.dbtitmRtg}}</span>',
		},{
			label: '挂牌方',
			order: false,
			templateUrl: 'field_wthrAnon.html',

		},{
			label: '挂牌类型',
			order: false,
			thNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? false : true;
			},
			tdNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? false : true;
			},
			tdNgClass:function($item){
				return {"colorH" : $item.wthrListg=="0", "colorN" : $item.wthrListg=="1"}
			},
			template: '<span style="min-width:0.65rem">{{$item.wthrListg | bondQuotationWthrListg}}</span>',
		},{
			label: '状态',
			order: false,
			thNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? false : true;
			},
			tdNgHide:function(){
				return $scope.searchQuery.queryFlag=="B"? false : true;
			},
			template: '{{$item.ofrEStatus | bondQuotationOfrEStatus}}',
		},{
			label: '备注',
			order: false,
			templateUrl: 'field_rmrk.html',
		},{
			label: '操作',
			order: false,
			template: '<field-handle-component item="$item"></field-handle-component>',
		}];
		/**
		 * 获取报价列表
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		function getQueryQuoteList(){

			NetBondquotationService.queryQuoteList($scope.searchQuery)
			.then((res)=>{

				$scope.QueryQuoteList = res.data.data;
				return res;
			}).then((res)=>{
				console.log(res.data.page)
				if($scope.QueryQuoteList && $scope.QueryQuoteList.length>0){
					$scope.totalItems = res.data.page.totalResult;
					$scope.getDetail($scope.QueryQuoteList[0]['bondid']);
				}
			});
		}
		getQueryQuoteList();

		/**
		 * 获取详情
		 */
		$scope.getDetail = function(id){
			$q.all([
				NetBondquotationService.queryBondBaseInfo({bondid:id}),
				NetBondquotationService.getCBLatestWeekValuation({bondid :id})
			]).then((res)=>{
				$scope.bondDetail = res[0].data.data;
				//结算详情
				var axisData =[];
				var yieldData =[];
				var dealAmountData =[];
				for(let obj of res[1].data.data){
					axisData.push( obj.date );
					obj.yield = NetBondquotationService.__y(obj.yield/100,true) ;
					yieldData.push( obj.yield );
					dealAmountData.push(obj.dealAmount);
				}
				$scope.myChart = ({
				    tooltip : {
				        trigger: 'axis',
				        formatter: "{b} <br/> {a0}:  {c0} %  <br/> {a1}:  {c1} "
				    },
				    grid: { left: 'left', right: '4%',   bottom: '3%'},
				    xAxis : [{
					            type : 'category',
					            boundaryGap : false,
					            data : axisData
				    }],
				    yAxis : [{type : 'value'}],
				    series : [{
			            name:'收益率',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data:yieldData
			        },{
			            name:'成交量',
			            type:'line',
			            stack: '总量',
			            areaStyle: {normal: {}},
			            data: dealAmountData
			        }]
				});
				//End 结算详情
			});
		}
		/**
		 * 
		 */
		$scope.toDetail = function(bondid){
			$state.go('home.acoupondetails',{bondid:bondid})
		}
		/**
		 * 翻页
		 */
		$scope.$watch('searchQuery.pageNum',function(n){
			getQueryQuoteList();
		})
		// end controlle

	}
});
