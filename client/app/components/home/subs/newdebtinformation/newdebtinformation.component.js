let newdebtinformationComponent = {
	restrict: 'E',
	bindings: {},
	templateUrl: './newdebtinformation.html',
	controller: function(newdebtinformationService, $state, $stateParams, pagetabService, $scope,Pager){
		"ngInject";
		$scope.tabkey_li = 0;
		// $scope.tabkey_ls =$stateParams.tag||0;
		$scope.issue = [];
		$scope.pageAll={};
		$scope.params = $stateParams;
		$scope.bondTp = newdebtinformationService.bondType;
		$scope.rsdtrm = newdebtinformationService.endtime;
		$scope.dbtitmRtg = newdebtinformationService.all;

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
			console.log($scope.issuelists_info);
			
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
			template: '{{$item.clsbidTm}}',
			
		},{
			label: '债券简称',
			order: false,
			template: '{{$item.bondNm }}'+'<span>&nbsp;</span><span  class="hhh{{$item.alrdySbrbInd}}">{{$item.alrdySbrbInd | spanfilter}}</span>',
			// templateUrl: 'newdebtin_one.html',
		},{
			label: '我的角色',
			order:false,
			template: '{{$item.roleId |rolefilter}}',
		},{
			label: '申购利率',
			order: false,
			template: '{{$item.sbrbIntrtLwrLmt | dotFilter}}-{{$item.sbrbIntrtLwrLmt | dotFilter }} ',
			// templateUrl: 'newdebtin_one.html'
			
		},{
			label: '发行量(亿)',
			order: false,
			template: '{{$item.issuNum}}',
		},{
			label: '主承销商',
			order: false,
			template: '{{	$item.primUdwr}}',
		},{
			label: '期限',
			order: false,
			template: '{{$item.trm}}',
		},{
			label: '企业类型',
			order: false,
			template: '{{$item.entpTp |entpTpfilter}}',
		},{
			label: '主/债评级',
			order: false,
			template: '<span class="fenxiao">{{$item.sbjRtg}}/{{$item.dbtItmRtg}}</span>',

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
		$scope.issuelists = function () {
			// debugger;
			console.log($scope.issuelists_info);
			let promise = newdebtinformationService.issuelist($scope.issuelists_info).then((res) => {
				if ($scope.issuelists_pageNum==1) {
					$scope.issue = [];
				};
				for (var i = 0, len = res.data.data.list.length; i < len; i++) {
					// $scope.issue.push(res.data.data[i]);
					// if(res.data.data.list[i].roleId==1){
					// 	res.data.data.list[i].roleId='主承';
					// }else if(res.data.data.list[i].roleId==2){
					// 	res.data.data.list[i].roleId='联承';
					// }else if(res.data.data.list[i].roleId==3){
					// 	res.data.data.list[i].roleId='在团';
					// }else if(res.data.data.list[i].roleId==4){
					// 	res.data.data.list[i].roleId='不在团';
					// }else if(res.data.data.list[i].roleId==5){
					// 	res.data.data.list[i].roleId='投资';
					// }
					// 利率
					if(res.data.data.list[i].sbrbIntrtLwrLmt||res.data.data.list[i].sbrbIntrtUpLm){
						res.data.data.list[i].sbrbIntrtLwrLmt = res.data.data.list[i].sbrbIntrtLwrLmt*100 +'-'+res.data.data.list[i].sbrbIntrtUpLm*100;
					}
					// 企业类型
					// if(res.data.data.list[i].entpTp==1){
					// 	res.data.data.list[i].entpTp='央企';
					// }else if(res.data.data.list[i].entpTp==2){
					// 	res.data.data.list[i].entpTp='国企';
					// }else if(res.data.data.list[i].entpTp==3){
					// 	res.data.data.list[i].entpTp='民企';
					// }else if(res.data.data.list[i].entpTp==4){
					// 	res.data.data.list[i].entpTp='其他';
					// }
					// 分销还是在团
					// if(res.data.data.list[i].alrdySbrbInd==1){
					// 	$scope.shengou_flag = true;
					// 	$scope.fenxixao_flag = false;
					// 	console.log($scope.shengou_flag);
					// }else if(res.data.data.list[i].alrdySbrbInd==2){
					// 	$scope.shengou_flag = false;
					// 	$scope.fenxixao_flag = true;
					// }
				}
				$scope.issue = res.data.data.list;
				$scope.pageAll= res.data.data.page;
				console.log($scope.issue);
				console.log($scope.pageAll);
				
				return res;
			});
		};
		$scope.issuelists();

		






		/**
		 * 初始化
		 * 点击表格列跳转到详情页
		 * @return {[type]}                     [description]
		 */
	$scope.toNewDebtin = function(dstrBondId,issuId,roleId,alrdySbrbInd){
		if(roleId=='1'){//则进入申购助手-”主承商“页面；
			$state.go('home.newdebtinformationdetails',{dstrBondId:dstrBondId,issuId:issuId});
		}else if(roleId=='2'||roleId=='3'||roleId=='4'){//则进入申购助手-”分销商页面；
			$state.go('home.newdebtinformationdetails',{dstrBondId:dstrBondId,issuId:issuId,roleId:roleId,alrdySbrbInd:alrdySbrbInd});
		}else if(roleId=='5'){
				if(alrdySbrbInd){//已申购标识存在 进入投资者页面
					$state.go('home.investor',{dstrBondId:dstrBondId,issuId:issuId});
				}else{//默认进入债券详情页面
					$state.go('home.newdebtinformationdetails',{dstrBondId:dstrBondId,issuId:issuId});
				}
			
		}
			// $state.go('home.newdebtinformationdetails',{dstrBondId:dstrBondId,issuId:issuId});
		}

		




		/**
		 * 负面新闻
		 * @param {[number]} catagory 3全部 4负面 6自媒体
		 * @param {[type]} set_init_page 设置初始页
		 */
		
		/**
		 * 收藏
		 */
		

		/**
		 * 收藏数
		 */
		
		/**
		 * 搜索
		 */
		
		

		/**
		 * 判断底部加载哪一类数据
		 * @return {Function} [description]
		 */
		// $scope.fn = function(){
		// 	if($scope.tabkey==0){
		// 		$scope.getrecommendedLists(1);
		// 	}else if($scope.tabkey==1){
		// 		$scope.messagelists(4);
		// 	}else if($scope.tabkey==2){
		// 		$scope.messagelists(6);
		// 	}else if($scope.tabkey==3){
		// 		$scope.messagelists(3);
		// 	}else if($scope.tabkey==4){

		// 	}
		// }

		/**
		 * 初始化
		 * @param  {[type]} $stateParams.search [description]
		 * @return {[type]}                     [description]
		 */
		// var page = $stateParams.page;
		// 	if($scope.params.tag== 0){
		// 		$scope.issuelists(1,page);
		// 	}else if($scope.params.tag== 1){
		// 		$scope.issuelists(2,page);
		// 	}else if($scope.params.tag== 2){
		// 		$scope.issuelists(3,page);
		// 	} else if($scope.params.tag== 3){
		// 		$scope.issuelists(4,page);
		// 	}
		

		
	// 	if ($stateParams.search) {
	// 		$scope.search_page = 1;
	// 		$scope.tabkey=5;
	// 		$scope.searchInfoLists();
	// 	}else{//没有搜索默认到推荐页
	// 		$scope.getrecommendedLists(1);
	// 	}
	
	// 参数：每页条数，显示页码个数
		$scope.Pager = new Pager(10, 5);
		// $scope.Pager.onSelected;//页码被选择事件
		$scope.Pager.setPage==$scope.pageAll.currentPage; //主动设置页码
		$scope.Pager.setTotal==$scope.pageAll.totalResult; //设置总记录数，必须，不传则无法计算页数
		$scope.pagelistdemo = [];
		$scope.Pager.onSelected = function (page){
			
		}



	 }
};
