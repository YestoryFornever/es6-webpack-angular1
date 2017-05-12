app.component('lineUpComponent', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./line-up.html',
	controller:function($scope,$state,$stateParams,netCapitalQuoteService,pagetabService,AlertModalService){
		"ngInject";
		console.log($state.$current.name)
		 pagetabService.activeTab({
            tabKey: 'home.willBond',
            routeState: $state.$current.name,
            routeLabel:"我要报价",
        });
		// 下拉数据
        $scope.drcSelect     = netCapitalQuoteService.drcSelect;
        $scope.moneySelect     = netCapitalQuoteService.MoneySelect;
        $scope.trmTpSelect   = netCapitalQuoteService.trmTpSelect;
        $scope.modeSelect    = netCapitalQuoteService.modeSelect;
        $scope.intrtTpSelect = netCapitalQuoteService.intrtTpSelect;
        $scope.txnRstSelect  = netCapitalQuoteService.txnRstSelect;
        $scope.ctlgSelect    = netCapitalQuoteService.ctlgSelect;
        $scope.dayMonSelect    = netCapitalQuoteService.dayMonSelect;
		$scope.ofrDscListInfo = "";
		$scope.ofrDscList     = [];
		$scope.changeStatus = false;
		$scope.addBondList    = function(){
			$scope.ofrDscList.push({
				drc:'',//方向
				trmTp:'',//期限类型
				trmLwrLmtVal:'',//期限下限值
				trmUpLmVal:'',//期限上限值
				trmLwrLmtUnit:'1',//期限下限单位
				trmUpLmUnit:'1',//期限上限单位
				amt:'',//金额
				amtUnit:'1',//金额单位
				mode:'',//模式
				intrtTp:"",//利率类型
				intrtVal:"",//利率值
				eStatus:'',
				txnRst:'',//交易限制
				rmrk:'',//备注

			})
		}
		/**
         * 重新报价 获取数据
         */
        $scope.getDetailForId =function(){
            netCapitalQuoteService.getOnlineOfrDetails($stateParams.ofrid)
            .then((res) => {
            	$scope.ofrDscList = res.data.data.list;
                getListEnd();
            });
        }
        if($stateParams.ofrid){
        	$scope.changeStatus =true;
            $scope.getDetailForId();
        }
        $scope.addOrChange = function(){
        	if($scope.changeStatus){
        		$scope.update();
        	}else{
        		$scope.onlineAddOfr();
        	}
        }
        var _fields =['drc','trmTp','trmUnit','amtUnit','mode','intrtTp','txnRst' ,'trmLwrLmtVal' ,'trmUpLmVal','amt','intrtVal'];
        function getListEnd(){
        	angular.forEach($scope.ofrDscList , (list ,_index)=>{
        		angular.forEach(_fields,(_field,index)=>{
        			var key = _field +'Selected';
	    			if($scope.ofrDscList[_index][_field] ){
	    				$scope.ofrDscList[_index][_field] +="";
	    			}
	    			if($scope.ofrDscList[_index][_field] ){
	    				$scope.ofrDscList[_index]['trmUnit'] ="1";
	    			}
	    			if(_field =='txnRst' && $scope.ofrDscList[_index]['txnRst']){
	    				let arr = $scope.ofrDscList[_index]['txnRst'].split(',');
	    				$scope.ofrDscList[_index][key] = arr ;

	    			}
	    			if(_field =='mode' && $scope.ofrDscList[_index]['mode']){
	    				let arr = $scope.ofrDscList[_index]['mode'].split(',');
	    				$scope.ofrDscList[_index][key] = arr ;

	    			}
	    			if(_field =='trmLwrLmtVal' || _field =='trmUpLmVal' || _field =='amt' || _field =='intrtVal'){
	    				$scope.ofrDscList[_index][_field] = parseFloat($scope.ofrDscList[_index][_field] )
	    			}
	    		})
        	})
        }
        /**
         * 发送前处理
         */
        var _sendFields = ['mode','txnRst'];
        function beforeRequest(){
        	angular.forEach($scope.ofrDscList , (list ,_index)=>{
	        	angular.forEach(_sendFields,(_sendField)=>{
	        		var key = _sendField +'Selected';
	        		list[key] = _.compact(list[key]);
	        		list[_sendField] = list[key].join(',');

	        	});
	        });
        }
		/**
		 * 提取 线上 报价
		 * @return {[type]} [description]
		 */
		$scope.onlineAnalysisOfr = function(){
			let reg     = /\n/g;
			let arr     = $scope.ofrDscListInfo ?  $scope.ofrDscListInfo.split(reg) :[];
			netCapitalQuoteService.onlineAnalysisOfr({
				ofrDscList:arr
			}).then(function(res) {
				$scope.ofrDscList = res.data.data;
				getListEnd();
			});
		}
		/**
		 * 更新报价
		 */
		$scope.update = function(){
			console.log($scope.ofrDscList);
			beforeRequest();
			netCapitalQuoteService.onlineUpdateOfr($scope.ofrDscList[0])
			.then(function(res) {
				pagetabService.closeByKey('home.willBond');
				$state.go('home.capitalQuotation.onLineBond',{},{reload:true})
			},(err)=>{
				console.log(err);
				AlertModalService.open('',err.data.msg)
			});
		}
		/**
		 * /发布报价
		 * @return {[type]} [description]
		 */
		$scope.onlineAddOfr = function(){
			beforeRequest();
			netCapitalQuoteService.onlineAddOfr($scope.ofrDscList)
			.then(function(res) {
				console.log(res);
				pagetabService.closeByKey('home.willBond');
				$state.go('home.capitalQuotation.onLineBond',{},{reload:true});
			},(err)=>{
				console.log(err);
				AlertModalService.open('',err.data.msg)
			});

		}
		$scope.cancle = function(){
            AlertModalService.open('取消报价','确定要取消该报价吗 ？',true)
            .then((res)=>{
            	pagetabService.closeByKey('home.willBond');
                $state.go($state.$current.parent)
            });
        }
		/**
		 * 点击删除 列表一行
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */
		$scope.deleteList = function(index){
			AlertModalService.open('删除报价','确定要删除该报价吗 ？',true)
			.then((res)=>{
				$scope.ofrDscList.splice(index,1);
			},(err)=>{
				console.log(err)
			})
		}
	}

})
