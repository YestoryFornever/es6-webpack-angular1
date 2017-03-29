
/**
 * 用户相关接口 DEMO
 * @type {[type]}
 */
app.factory(function($http,$q, userStatusService, ProxyRequestService,$uibModal){
	return {
		/**
		 * 生成UUID
		 */
		generateUuid: function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		},
		/**
		 * 用户登录
		 * @param  {String} account
		 * @param  {String} password
		 * @param  [Number] ifSecond
		 * @return {[type]}
		 */
		login: function(account, password, ifSecond){
			return ProxyRequestService.post('/E_project_base/authority/login/loginValidate',{
				loginName:account,
				loginPassword:password,
				// pictureAuthkey:"",
				loginWay:"4",
				loginTerminalType:"2",
				equipmentNumber:"WEB-EBASE",
				numberOfLanding:this.generateUuid(),
				// auroraID:"",
				isCarryOn:ifSecond?"1":""
			});
		},
		/**
		 * 4.1.12	获取个人信息页用户信息
		 */
		getUserInfoPageDetail()
		{
			return ProxyRequestService.post('/E_project_base/authority/user/getUserInfoPageDetail',{

			});
		},
		/**
		 * 计算器
		 *
		 */
		openCalculator(item){//计算器 弹窗
			this.$uibModal = $uibModal;
			this.dataCalculatorModal ={
				itemInfo:{},
			}
			let that =this;
			that.$uibModal.open({
				animation: true,
				component:'bondTrial',
				windowClass:'my-bond-trial',
				size: 'xs',//'lg',//'sm',
				resolve: {
					modalData:function(){
						if(item){
							that.dataCalculatorModal['itemInfo'] = item;
						}
						return that.dataCalculatorModal;
					}
				}
			}).result.then(function (selectedItem) {},that);
		},
		/**
		 *报价列表
		 */
		queryQuoteList(obj){
			return ProxyRequestService.post('/e-bondquote/bondOfr/queryQuoteList',obj);
		},
	}
});