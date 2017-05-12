app.component('nowBond',{
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './now-bond.html',
	// controllerAs:'$instanceCtrl',
	controller: function($scope,nowBondService,AlertModalService,$state,NetBondquotationService){
		'ngInject';
		var that = this;
		this.nowBondService = nowBondService;
		this.AlertModalService = AlertModalService;
		this.NetBondquotationService = NetBondquotationService;
		this.$state = $state;
		console.log(this,$scope)
		var flagOk = false;
		var  reg = /^\d+([.]\d{0,6})?$/g;
		// 接收传参数
		this.$onInit = function(){
			if(this.resolve.modalData){
				this.isShow = true ;
				$scope.quoteList = this.resolve['modalData']['quoteList']  ;
				if($scope.quoteList[0]){

					this.drc = $scope.quoteList[0].drc;
					$scope.quoteList[0].searchBond = $scope.quoteList[0].bondCd;
					$scope.quoteList[0].num = NetBondquotationService.__n( ($scope.quoteList[0].num ?  $scope.quoteList[0].num : "0") ,true);
					$scope.quoteList[0].wthrAnon = $scope.quoteList[0].wthrAnon =='0' ? false : true;
					$scope.quoteList[0].wthrListg =  true;

					$scope.quoteList[0].yield = NetBondquotationService.__y($scope.quoteList[0].yldrto,true);
					$scope.quoteList[0].netprc = NetBondquotationService.__p($scope.quoteList[0].netprc,true);
				}
			}else{
				$scope.quoteList =[];
			}
		}
		$scope.quoteListChecked =[];
		// $scope.quoteList =[];//左侧 待发送数组
		var tmpItem = {
			checked:'',//是否选中
			drc:'',//方向
			bondid:'',//债券id
			bondCd:'',//债券代码
			searchBond:'',//模糊搜索=债券代码
			bondShrtnm:'',//债券简称
			num:'',//数量
			yield:'',//收益
			netprc:'',//净价
			wthrAnon:true,//是否匿名
			wthrListg:true,//是否大厅挂牌
			remark:'',//备注
		};
		//获取当前日期
		var tody = moment().format('YYYY-MM-DD');
		this.isShow =false;//显示大厅挂牌
		this.drc ='1' ; // 方向
		this.searchConditions = {
			creditType:"",//债券类型
			creditTypeSelecteds:[],//债券类型
			creditSymbol:"",//主体评级
			creditSymbolSelecteds:[],//主体评级
			dealDate:tody,//处理时间
			rateType:"",//票面
			rateTypeSelecteds:[],//票面
			termType:"D",//期限
			termStart:"",//期限开始
			termEnd:"",//期限结束
			pageNum:"1",//第几页
			pageSize:"50",//每一页有多少项
			orderCol:"sbjRtg",//以哪一列排序【sbjRtg主体评级】【rsdtrm	剩余期限】【yield 收益率】
			orderDirect:"desc"//desc倒序 asc正序
		};
		/**
		 * 计算净价 收益率 信息
		 * @type {Object}
		 */
		$scope.calInfo = {
			bondid:'',
			dealDate:tody,
			clearSpeed:'1',
			dealNum:'',
			cleanPrice:'',
			yield:'',
		}
		$scope._fields = ['creditType', 'creditSymbol', 'rateType'];
		$scope.searchBonds = function(){
			beforSaveScmInfo();
			nowBondService.searchBonds(that.searchConditions)
			.then((data)=>{
				that.searchList = data.data.data;
			});
		}
		$scope.changeDY =function(){
			that.searchConditions.termType = that.searchConditions.termType =="D" ? "Y" :"D";
		}
		/**
		 * 验证数量
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		$scope.validdationNum = function(value){
			var regFour = /^\d+$/;
			if(!regFour.test(value)){
		 		return '请输入大于0的整数';
		 	}
		}
		/**
		 * 验证收益率
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		$scope.validdationYield = function (value,item){
			var regTw0 = /^\d+([.]\d{0,4})?$/;
			if(!regTw0.test(value) || value <0 || value >100 ||value ==''){
		 		return '大于0小于100，最多4位小数';
		 	}
		}
		/**
		 * 验证净价
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		$scope.validdationNetprc = function (value,item){
			var regTw0 = /^\d+([.]\d{0,4})?$/;
			if(!regTw0.test(value) || value <0 || value >200 || value==''){
		 		return '大于0小于200，最多4位小数';
		 	}
		}
		/**
		 * 保存之前处理数据
		 * @return {[type]} [description]
		 */
		function beforSaveScmInfo (){
			angular.forEach($scope._fields,(_field)=>{
				var key = _field +'Selecteds';
				let arr = that.searchConditions[key]
				that.searchConditions[_field] = arr.join(',');
			})
		}
		$scope.searchBonds();
		function checkQuoteList (){
			angular.forEach($scope.quoteList, function(item,index) {
				if(!item.bondid){
					AlertModalService.open(null,'请输入债券代码');
					flagOk =false;
					return
				}else if(!item.num){
					AlertModalService.open(null,'请输入数量');
					flagOk =false;
					return
				}else if(!item.yield || item.yield<0 || item.yield>100){
					flagOk =false;
					AlertModalService.open(null,'请输入正确的收益率');
					return
				}else if(!item.netprc || item.netprc<0 ||item.netprc >200){
					flagOk =false;
					AlertModalService.open(null,'请输入正确的净价');
					return
				}else{
					flagOk =true;
				}
				item.wthrAnonCheck = item.wthrAnon ==true? '1' : item.wthrAnon ==false ? '0' : "1";
				item.wthrListgCheck =item.wthrListg ==true? '1'  :  item.wthrListg ==false ? '0' : "1" ;
				$scope.quoteListChecked.push({
					'bondid':item.bondid,
					'drc':that.drc,
					'num':item.num*10000,
					'yldrto':item.yield/100,
					'netprc':item.netprc,
					'wthrAnon':  item.wthrAnonCheck,
					'wthrListg':item.wthrListgCheck ,
					'rmrk':item.remark
				})
			})
		}
		$scope.ok = function(){
			checkQuoteList();
			if(flagOk){
				nowBondService.addBatchBondQuote($scope.quoteListChecked )
				.then((res)=>{
					if(res.data.status=="0"){
						AlertModalService.open(null,'操作成功');
						that.modalInstance.close();
						$state.go('home.bondquotation',{}, {reload: true});
					}else{
						let msg =res.data? res.data.msg : res.msg
						AlertModalService.open(null,msg);
					}
					// that.disabledButton =false;
				},(err)=>{
					let msg =res.data? res.data.msg : res.msg
					that.AlertModalService.open(null,msg);
				})
			}

		}
		/**
		 * 添加一行待发送数据
		 */
		$scope.addQuote = function(item){
			if(item){
				let obj = angular.copy( item);
				obj.wthrAnon = true;
				obj.wthrListg = true;
				obj.searchBond = obj.bondCd;
				if(obj.yield){
					obj.yield = NetBondquotationService.__y( obj.yield, true);
					$scope.netprc(obj);
				}
				$scope.quoteList.push(obj);
			}
			else{
				let newTemp = angular.copy(tmpItem);
				$scope.quoteList.push(newTemp);
			}
		}
		$scope.netprc =function(item){
			$scope.calInfo.bondid = item.bondid;
			if(item.yield){//收益
				if(item.yield>100){
					item.yield =100;
					return false;
				}else if(item.yield <0){
					item.yield =0;
					return false;
				}else{
					$scope.calInfo.yield = item.yield/100;
				}
			}else{
				item.netprc = '';
				return
			}
			nowBondService.calSettlementAmountYieldForCM($scope.calInfo)
			.then(function(res) {
				if(res.data.data ){
					if(res.data.data.cleanPrice){
						item['netprc'] = NetBondquotationService.__p (res.data.data.cleanPrice,true);
						$scope.calInfo.cleanPrice =  item['netprc'];
					}
				}
			});
		}
		/**
		 *  根据净价   计算收益率
		 * @return {[type]} [description]
		 */
		$scope.yield = function(item,searchList){
			$scope.calInfo.bondid = item.bondid;
			if(item.netprc ){//净价
				if(item.netprc>200){
					item.netprc = 200;
					return false;
				}else if(item.netprc<0){
					item.netprc = 0;
					return false
				}else{
					$scope.calInfo.cleanPrice = item.netprc  ;
				}
			}else{
				item.yield ="";
				return
			}

			nowBondService.calSettlementAmountCleanPriceForCM($scope.calInfo)
			.then(function(res) {
				if(res.data.data ){
					item.yield = NetBondquotationService.__y(res.data.data.yield,true);
					$scope.calInfo.yield =  item.yield;
				}
			});
		}
		/**
		 * 模糊搜索
		 */
		$scope.queryQuote = function(val){
			return nowBondService.searchBondBreed({'keyword': val})
			.then(function(res) {
				return res.data.data;
			});

		}
		$scope.onSelected = function(item){
			console.log(item)
			item.bondShrtnm = item.searchBond.bondShrtnm;
			item.bondCd = item.searchBond.bondCd
			item.bondid = item.searchBond.bondid
		}
		/**
		 * /
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.deleteRemark = function(item){
			if(item['remark'].length>=50){
				item.remark = item.remark.substr(0,50);
			}
		}
		/**
		 * 跳转详情页面
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		$scope.toDetail = function(item){
			that.modalInstance.dismiss('cansel');
			$state.go('home.acoupondetails',{bondid:(item.bondid)})
		}
		/**
		 * 右侧搜索列表排序
		 * @param  {[type]} orderName [description]
		 * @return {[type]}           [description]
		 */
		$scope.onTitleClick =function(orderName){
			if(that.searchConditions['orderCol'] ==orderName){
				that.searchConditions['orderDirect'] =that.searchConditions['orderDirect'] =='desc' ? 'asc':'desc';
			}
			that.searchConditions['orderCol'] = orderName;
			$scope.searchBonds();
		}
		/**
		 * 删除一条数据
		 * @return {[type]} [description]
		 */
		$scope.deleteList = function(index){
			$scope.quoteList.splice(index,1);
		}
	},
	// end controller
})