app.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.originationdetails', {
			url: '/originationdetails/?:oid?:bid?:datetime?:oname',
			views: {
				'main@home': {
					component: 'originationdetails'
				}
			}
		})

})
app.component('originationdetails', {
	restrict: 'E',
	bindings: {},
	templateUrl: './originationdetails.html',
	controller: function(originationdetailsService, $scope, $state, $stateParams, pagetabService, ) {
		//this.name = 'home';
		"ngInject";
		// $scope.tabkey = $stateParams.tag||0;
		// $scope.flashKey =  $stateParams.tag;
		$scope.flash_one1 = [];
		$scope.originationName = $stateParams.oname;
		/**
		 * 表格字段
		 */

		$scope.fields = [{
			label: '债券简称',
			order: false,
			template: '{{$item.shrtnm| addTwoLine}}'+'({{$item.code| addTwoLine}})',

		}, {
			label: '发行规模(亿)',
			order: false,
			template: '{{$item.amount| addTwoLine }}',
			// templateUrl: 'newdebtin_one.html',
		}, {
			label: '发行利率(％)',
			order: false,
			template: '{{$item.rate| addTwoLine}}',
		}, {
			label: '最近付息',
			order: false,
			template: '{{$item.nextDay|Time | addTwoLine}}',

		}, {
			label: '到期日',
			order: false,
			template: '{{$item.maturedDay| addTwoLine}}',
		}];

		/**
		 * 代偿现金流表格字段
		 */

		$scope._fields = [{
			label: '时间',
			order: false,
			template: '{{$item.date|Time| addTwoLine}}',

		}, {
			label: '金额',
			order: false,
			template: '{{$item.amount| addTwoLine}}',
			// templateUrl: 'newdebtin_one.html',
		}];
		$scope.todetail_two = function(lis_iid){
			$state.go('home.acoupondetails',{bondid:lis_iid});
		}
		/**
		 * 4.3.11往期扫雷列表
		 */
		$scope.sweepHisLists_page = 1;
		$scope.sweepHisLists = function() {
			let promise = originationdetailsService.sweepHisList({
				uid: BONDCONFIG.USERINFO.uid,
				bound_org_id: $stateParams.oid,
				cur_page: $scope.sweepHisLists_page,
			}).then((res) => {
				
				if ($scope.sweepHisLists_page == 1) {
					$scope.sweepHisLists_one1 = [];
				};
				for (var i = 0, len = res.data.data.list.length; i < len; i++) {
					$scope.sweepHisLists_one1.push(res.data.data.list[i]);
				}
				$scope.sweepHisLists_page++;
				$scope.activeTab1();
				return res;
			});
		}

		
		/**
		 * 4.9.6根据发行机构id查询发行机构主体信息
		 */
		$scope.getISSUERByIssuerIds = function(){
			let promise = originationdetailsService.getISSUERByIssuerId({
				issuerId:$stateParams.oid
			}).then((res) => {
				// console.log(res);
				$scope.getISSUERByIssuerIds_info = res.data.data;
				console.log($scope.getISSUERByIssuerIds_info);
			});
		}
		
		/**
		 * 根据机构id获取最新评级
		 */

		$scope.insRankByIds = function(){
			let promise = originationdetailsService.insRankById({
				issuerId:$stateParams.oid
			}).then((res) => {
				// console.log(res);
				$scope.class_credit = res.data.data;
				console.log($scope.class_credit);
			});
		}
	
		/**
		 * 机构财务信息
		 */
		$scope.info = {
			org_id: $stateParams.oid,
		}
		$scope.orgFinances = function() {
			// console.log($scope.info);
			// console.log($stateParams.oid);
			let promise = originationdetailsService.orgFinance($scope.info).then((res) => {
				console.log(res);
				$scope.orgFinancesData = res.data.data;

			});
		}
		

		/**
		 * 1.1.4依据传入的机构id查询该机构发行的债券列表
		 */
		$scope.bondInfoByIssueIds = function() {
			let promise = originationdetailsService.bondInfoByIssueId({
				issuerId: $stateParams.oid,
			}).then((res) => {
				// res.data.data.rate = res.data.data.rate*100;
				$scope.bondInfoByIssueIds_data = res.data.data;
				console.log(res);


			});
		}
	
		/**
		 * //1.1.5计算传入机构所发行的所有有效债券的未来现金流并合并统计
		 */
		$scope.calSettlementAmountCleanPriceForCMs = function() {
			console.log($stateParams.datetime);
			let promise = originationdetailsService.calSettlementAmountCleanPriceForCM({
				issuerId: $stateParams.oid,
				analysisDay:$stateParams.datetime
			}).then((res) => {
				$scope.calSettlementAmountCleanPriceForCMs_data=res.data.data;
				console.log(res);


			});
		}
		
		/**
		 * //页面初始化
		 */
		$scope.upload = function() {
			$scope.sweepHisLists_page = 1;
			$scope.sweepHisLists();
			$scope.getISSUERByIssuerIds();
				$scope.insRankByIds();
				$scope.orgFinances();
				$scope.bondInfoByIssueIds();
				$scope.calSettlementAmountCleanPriceForCMs();
		}
		$scope.upload();
		$scope.activeTab1 = function(){
			pagetabService.activeTab({
			tabKey: 'home.originationdetails',
			routeState: 'home.originationdetails',
			routeParams: angular.copy($stateParams),
			routeLabel: '机构详情',
		});
		}
		


	}
})