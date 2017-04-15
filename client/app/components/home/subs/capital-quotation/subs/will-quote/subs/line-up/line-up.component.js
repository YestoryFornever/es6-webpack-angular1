app.component('lineUpComponent', {
	restrict: 'E',
	bindings: {},
	templateUrl:'./line-up.html',
	controller:function($scope,$state,$stateParams,netCapitalQuoteService,AlertModalService){
		"ngInject";
		$scope.drc            = netCapitalQuoteService.drc;
		$scope.trmTp          = netCapitalQuoteService.trmTp;
		$scope.mode           = netCapitalQuoteService.mode;
		$scope.intrtTp        = netCapitalQuoteService.intrtTp;
		$scope.txnRst        = netCapitalQuoteService.txnRst;
		$scope.ofrDscListInfo = "";
		$scope.ofrDscList     = [];

		$scope.addBondList    = function(){
			$scope.ofrDscList.push({
				drc:'',//方向
				trmTp:'',//期限类型
				trmLwrLmtVal:'',//期限下限值
				trmUpLmVal:'',//期限上限值
				trmUnit:'1',//期限单位
				amt:'',//金额
				amtUnit:'1',//金额单位
				mode:'',//模式
				intrtTp:"",//利率类型
				intrtVal:"",//利率值
				txnRst:'',//交易限制
				rmrk:'',//备注

			})
		}
		/**
         * 重新报价
         */
        $scope.getDetailForId =function(){
            netCapitalQuoteService.getOnlineOfrDetails($stateParams.ofrid)
            .then((res) => {
            	$scope.ofrDscList = res.data.data.list;
                getListEnd();
            });
        }
        if($stateParams.ofrid){
            $scope.getDetailForId();
        }
        var _fields =['drc','trmTp','trmUnit','amtUnit','mode','intrtTp','txnRst' ,'trmLwrLmtVal' ,'trmUpLmVal','amt','intrtVal'];
        function getListEnd(){
        	angular.forEach($scope.ofrDscList , (list ,_index)=>{
        		angular.forEach(_fields,(_field,index)=>{
	    			if($scope.ofrDscList[_index][_field] ){
	    				$scope.ofrDscList[_index][_field] +="";
	    			}
	    			if($scope.ofrDscList[_index][_field] ){
	    				$scope.ofrDscList[_index]['trmUnit'] ="1";
	    			}
	    			if(_field =='txnRst' && $scope.ofrDscList[_index]['txnRst']){
	    				let arr = $scope.ofrDscList[_index]['txnRst'].split(',');
	    				$scope.ofrDscList[_index]['txnRst'] = arr[0];

	    			}
	    			if(_field =='mode' && $scope.ofrDscList[_index]['mode']){
	    				let arr = $scope.ofrDscList[_index]['mode'].split(',');
	    				$scope.ofrDscList[_index]['mode'] = arr[0];

	    			}
	    			if(_field =='trmLwrLmtVal' || _field =='trmUpLmVal' || _field =='amt' || _field =='intrtVal'){
	    				$scope.ofrDscList[_index][_field] = parseFloat($scope.ofrDscList[_index][_field] )
	    			}
	    		})
        	})
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
		 * /发布报价
		 * @return {[type]} [description]
		 */
		$scope.onlineAddOfr = function(){
			netCapitalQuoteService.onlineAddOfr($scope.ofrDscList)
			.then(function(res) {
				$state.go('home.capitalQuotation.onLineBond',{},{reload:true})
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
			})
		}
	}

})
