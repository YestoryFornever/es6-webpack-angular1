app.component('healdCalculatorComponent', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './heald-calculator.html',
	controller: function($scope, $state, $stateParams,NetHealdCalculatorService,$timeout) {
		'ngInject';
		$scope.searchCont = {
			queryQuote:'',
			trm:"",
			retFee:'',
			sbsrbPrc:'',
			sbrbIntrt:'',
			cprsvPftIntrt:'',
			sbsrbNum:'',
			pyAmt:'',
			pftAmt:'',
			trmText:"",

		}
		$scope.flag = '';
		this.$onInit = function(){
			console.log(this.resolve)
			this.resolve.info ? $scope.searchCont = angular.copy(this.resolve.info) : $scope.searchCont;
			$scope.searchCont.queryQuote =  $scope.searchCont.bondNm;
			if($scope.searchCont.trm){
				$scope.searchCont.retFee = $scope.searchCont.trm>360? 0.1 : ($scope.searchCont.trm/3600).toFixed(4)
				$scope.search();
			}
		}
		function getRetFee(){
			if($scope.searchCont.trm){
				$scope.searchCont.retFee = $scope.searchCont.trm>360? 0.1 : ($scope.searchCont.trm/3600).toFixed(4)
			}
		}
		var _searchContFields = ['retFee' , 'sbsrbPrc' , 'sbrbIntrt' ,'cprsvPftIntrt' ,'sbsrbNum'];
		/**
		 * 进行计算
		 * @param  {[type]} myForm [description]
		 * @return {[type]}        [description]
		 */
		$scope.search = function(myForm){
			if($scope.flag == 'retFee'){
				delete $scope.searchCont.sbsrbPrc;
			}
			if($scope.flag == 'sbsrbPrc'){
				delete $scope.searchCont.retFee;
			}
			if($scope.flag == 'sbrbIntrt'){
				delete $scope.searchCont.cprsvPftIntrt;
			}
			if($scope.flag == 'cprsvPftIntrt'){
				delete $scope.searchCont.sbrbIntrt;
			}
			$scope.searchCont.sbsrbNum = parseInt($scope.searchCont.sbsrbNum);
			NetHealdCalculatorService.cprsvClcService($scope.searchCont).then((res)=>{
				$scope.searchCont = _.assign($scope.searchCont, res.data.data);
				angular.forEach(_searchContFields,(_searchContField)=>{
					if($scope.searchCont[_searchContField]){
						$scope.searchCont[_searchContField] =  $scope.searchCont[_searchContField] ;
					}
					if($scope.searchCont[_searchContField] ==0){
						$scope.searchCont[_searchContField] ='';
					}
				})
				console.log($scope.searchCont)

			})
		}
		$scope.$watch('searchCont.queryQuote',(n)=>{
			if(n==''){
				angular.forEach($scope.searchCont ,( value ,key)=>{
					$scope.searchCont[key] = '';
				})
			}
		})
		/**
		 * 错误信息提示
		 */
		// $scope.$broadcast('account:error', '出错信息');
		// $scope.validdationAccount = function(value){
		// 	if(value==''){
		//  		return
		//  	}
		// 	var regTw0 = /^\d+([.]\d{0,4})?$/;
		// 	if(!regTw0.test(value) || value <0 || value >100 ){
		//  		return '大于0 小于100 ，最多4位小数';
		//  	}
		// }
		//  $scope.validdationAccount2 = function(value){
		//  	if(value==''){
		//  		return
		//  	}
		//  	var regFour = /^\d+$/;
		//  	if(!regFour.test(value) || value <0 || value >10000){
		//  		return '请输入大于0 小于10000的整数';
		//  	}
		// }
		// $scope.changNum = function(){
		// 	var reg = /^\+?[1-9]\d*$/;
		// 	console.log(reg.test($scope.searchCont.sbsrbNum))

		// }
		/**
		 * test ceshi
		 * @param  {[type]} event [description]
		 * @return {[type]}       [description]
		 */
		$scope.keyPress = function(event) {
			var keyCode = event.keyCode;
			if ((keyCode >= 48 && keyCode <= 57)){
				console.log(this)
				console.log(event)

				event.returnValue = true;
			 }else{
				event.returnValue = false;
			}
		 }
		/**
		 * 模糊搜索
		 * @return {[type]} [description]
		 */
		$scope.queryQuote = function(val){
			return NetHealdCalculatorService.fluzzyEnqrBondListService({
				value:val
			}).then((res)=>{
				return res.data.data;
			})
		}
		var _flelds = ['retFee','sbsrbPrc','sbrbIntrt','cprsvPftIntrt','sbsrbNum','pyAmt','pftAmt'];
		/**
		 *选中 一行数据 匹配数据
		 * @return {[type]} [description]
		 */
		$scope.selected = function(){
			angular.forEach(_flelds,(_fleld)=>{
				$scope.searchCont.trm = $scope.searchCont.queryQuote.trm;
				$scope.searchCont.trmText = $scope.searchCont.queryQuote.trmText;
				$scope.searchCont[_fleld] ='';
				getRetFee();
				$scope.search();
			})
		}
		/**
		 * 正则 验证
		 */
		$scope.checkedValue = function (value , bool){
			var newStr = Number(value).toString();
			// debugger
			// if(newStr=='NaN'){

			// }
			// let reg = /^(\d{1,2}(\.\d{1,4})?|100)$/;
			// console.log(reg.test(value))
			// if(!reg.test(value)){
			//     debugger
			//     value = value.toString().substr(0,value.length-1);
			//     console.log(value)
			// }
		}

	}
});