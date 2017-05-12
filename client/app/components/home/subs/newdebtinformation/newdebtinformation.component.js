let newdebtinformationComponent = {
	restrict: 'E',
	bindings: {},
	templateUrl: './newdebtinformation.html',
	controller: function(newdebtinformationService,$state, $stateParams, pagetabService, $scope,UikitPager){
		"ngInject";
		$scope.tabkey_li = 0;
		// $scope.tabkey_ls =$stateParams.tag||0;
		$scope.issue = [];
		$scope.pageAll={};
		$scope.params = $stateParams;
		$scope.bondTp = newdebtinformationService.bondType;
		$scope.rsdtrm = newdebtinformationService.endtime;
		$scope.dbtitmRtg = newdebtinformationService.all;
		$scope.enqrTp_tp=$stateParams.enqrTp;
		if (!$stateParams.enqrTp) {
			return $state.go('home.newdebtinformation', {enqrTp:1, pageNum:1}, {reload: true});
		};
		
		
		/**
		 * 
		 * @param  {[number]} 展开高级搜索框
		 * 
		 * @return {[type]}           [description]
		 */
		$scope.openheightsearch_flg = false;
		$scope.openheightsearch =function(){
			return $scope.openheightsearch_flg = !$scope.openheightsearch_flg;
		 }

		$scope.rsdtrmList = {0:''};
		$scope.bondTpList={0:''};
		$scope.dbtitmRtgList={0:''};
		$scope.allOrNoAll = function(obj,key,num){
			
				if(key==0){
					for(let val in obj){
						obj[val] = false;
					}
					obj[0]="";
				}else{
					obj[0]= false;
				}
				let flag = true;
				angular.forEach(obj, function(value ,key){
					if(value != false ){
						flag = false;
					}
				})
				if(flag ){
					obj[0] ="";
				}
	
			$scope.fullScmInffunction();
			// $scope.newdebtinformationSearch($scope.issuelists_info);
		}
		/**
		 * 
		 * @param  {[number]}定义一个数组变量 _fields用于存放点击按钮获取的值
		 * 
		 * @return {[type]}           [description]
		 */
	$scope._fields = ['creditTypeList','issueTermList','currIssuerCreditList'];
		$scope.fullScmInffunction  = function()
		{
			// debugger;
			var valueArray = [];
			$scope.issuelists_info = $scope.issuelists_info||{0:''};
			angular.forEach($scope._fields, function(_field){
				var k = _field+'Selecteds';
				// var k = _field;
				if ($scope.issuelists_info[k]) {
					valueArray = _.values($scope.issuelists_info[k]);
					valueArray = _.compact(valueArray);
					$scope.issuelists_info[_field] = valueArray;
				};
			});
			// console.log($scope.issuelists_info);
			
		}
		$scope.fullScmInffunction();
		/**
		 * 初始化
		 * 搜索
		 * @return {[type]}                     [description]
		 */
		
		// $scope.newdebtinformationSearch = function( obj){
		// 	angular.forEach(obj, function(_fieldinfo){
		// 		var k = _fieldinfo;
		// 		if(obj[k]=={}){
		// 			alert(obj[k]);
		// 		}
		// 	});
		
		// }
			

		 
		
		/**
		 * 表格字段
		 */

		$scope.fields = [
		{
			label: '截标时间',
			order: false,
			template: '{{$item.clsbidTm | addTwoLine }}',
			
		},{
			label: '债券简称',
			order: false,
			template: '{{$item.bondNm  | addTwoLine }}'+'<span>&nbsp;</span><span  class="hhh{{$item.alrdySbrbInd}}">{{$item.alrdySbrbInd | spanfilter}}</span>',
			// templateUrl: 'newdebtin_one.html',
		},{
			label: '我的角色',
			order:false,
			template: '{{$item.roleId |rolefilter}}',
		},{
			label: '申购利率(%)',
			order: false,
			//template:'{{$item.sbrbIntrtLwrLmt }}-{{$item.sbrbIntrtUpLm  }}'
			template: '<span ng-If="$item.sbrbIntrtLwrLmt==0.0000 && $item.sbrbIntrtUpLm==100.0000">--</span><span ng-If="$item.sbrbIntrtLwrLmt!=0 && $item.sbrbIntrtUpLm!=100.0000">{{$item.sbrbIntrtLwrLmt | addTwoLine}}-{{$item.sbrbIntrtUpLm | addTwoLine }} </span>',
			// templateUrl: 'newdebtin_one.html'
			
		},{
			label: '发行量(亿)',
			order: false,
			template: '{{$item.issuNum  | addTwoLine }}',
		},{
			label: '主承销商',
			order: false,
			template: '{{	$item.primUdwr  | addTwoLine }}',
		},{
			label: '期限',
			order: false,
			template: '{{$item.trmText  | addTwoLine }}',
			// template: '{{$item.trm  | addTwoLine }}'+'<span ng-if="$item.trm>=0">D</span>',
		},{
			label: '企业类型',
			order: false,
			template: '{{$item.entpTp  |entpTpfilter| addTwoLine }}',
		},{
			label: '主/债评级',
			order: false,
			template: '<span class="fenxiao">{{$item.sbjRtg  | addTwoLine }}/{{$item.dbtItmRtg | addTwoLine}}</span>',

		}];
		/**
		 * 发行中、明日发行、未来发行、未公告
		 */
		$scope.issuelists_info = {
			userId:BONDCONFIG.USERINFO.uid,
			value:"",
			creditTypeList: [],
			issueTermList: [],
			currIssuerCreditList: [],
			pageNum:$stateParams.pageNum,
			pageSize:10,
			enqrTp: $stateParams.enqrTp,
		}
		$scope.shengou_flag = false;
		$scope.fenxixao_flag = false;
		/**
		 * 分页
		 * @param {[number]}  var onTotalPage = res.data.data.page.totalResult;//总tiao数
		 * $scope.issuelists_info.pageSize 为向服务传参中设置的参数
		 * @param {[type]} $state.go通过路由跳转或者调用方法
		 */
		$scope.Pager = new UikitPager($scope.issuelists_info.pageSize, 5);
		$scope.Pager.onSelected = function(page){
			$scope.issuelists_info.pageNum = page;
			$state.go($state.$current.name, $scope.issuelists_info);
			// $scope.issuelists();
		}
		$scope.issuelists = function () {
			$scope.is_loading = true;
			console.log($scope.issuelists_info);
			// debugger;
			let promise = newdebtinformationService.issuelist($scope.issuelists_info).then((res) => {
				if ($scope.issuelists_pageNum==1) {
					$scope.issue = [];
				};
				// for (var i = 0, len = res.data.data.list.length; i < len; i++) {
				// 	if(res.data.data.list[i].sbrbIntrtLwrLmt||res.data.data.list[i].sbrbIntrtUpLm){
				// 		res.data.data.list[i].sbrbIntrtLwrLmt = res.data.data.list[i].sbrbIntrtLwrLmt*100 ;
				// 		res.data.data.list[i].sbrbIntrtUpLm = res.data.data.list[i].sbrbIntrtUpLm*100 ;
		
				// 	}
					// if(res.data.data.list[i].issuNum){
					// 	res.data.data.list[i].issuNum = (res.data.data.list[i].issuNum/100000000);
					// }
					
				// }
				$scope.issue = res.data.data.list;
				var totalPage = res.data.data.page.totalResult;//总页数
				$scope.Pager.setTotal(totalPage);
				$scope.Pager.setPage($scope.issuelists_info.pageNum );
				// $scope.pageAll= res.data.data.page;
				console.log($scope.issue);
				console.log($scope.pageAll);
				$scope.is_loading = false;
				return res;
			}).catch(function(err) { //除去状态0的状态码 
                alert(err.data.msg);
            });
		};
		$scope.issuelists();

		/**
		 * 初始化
		 * 点击表格列跳转到详情页
		 * @return {[type]}                     [description]
		 */
	$scope.toNewDebtin = function(dstrBondId,issuId,roleId,alrdySbrbInd,trm,enqrTp,issuNum){
		console.log(roleId,alrdySbrbInd);
		if(roleId=='1'){//则进入申购助手-”主承商“页面；
			$state.go('home.newdebtinformationdetails.bond-dstr-main',{dstrBondId:dstrBondId,issuId:issuId,trm:trm,enqrTp:enqrTp,roleId:roleId,issuNum:issuNum});
			return ;
		}else if(roleId=='2'||roleId=='3'||roleId=='4'){//则进入申购助手-”分销商页面；
			$state.go('home.newdebtinformationdetails.distributor',{dstrBondId:dstrBondId,issuId:issuId,roleId:roleId,enqrTp:enqrTp,alrdySbrbInd:alrdySbrbInd,trm:trm,issuNum:issuNum});
			return ;
		}else if(roleId=='5'){
				if(alrdySbrbInd){//已申购标识存在 进入投资者页面
					$state.go('home.newdebtinformationdetails.investor',{dstrBondId:dstrBondId,issuId:issuId,trm:trm,enqrTp:enqrTp,roleId:roleId,issuNum:issuNum});
				}else{//默认进入债券详情页面
					$state.go('home.newdebtinformationdetails',{dstrBondId:dstrBondId,issuId:issuId,trm:trm,enqrTp:enqrTp,roleId:roleId,issuNum:issuNum});
				}
				return ;
			
		}
			// $state.go('home.newdebtinformationdetails',{dstrBondId:dstrBondId,issuId:issuId});
		}
		
		
// **********************页签
	
		pagetabService.activeTab({
			tabKey: 'home.newdebtinformation',
			routeState: "home.newdebtinformation",
			routeParams: angular.copy($stateParams),
			routeLabel: '新债信息'
			
		});
	
	



	 }
};
