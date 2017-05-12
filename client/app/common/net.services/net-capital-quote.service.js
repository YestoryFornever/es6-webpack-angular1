
/**
 * 用户相关接口 DEMO
 * @type {[type]}
 */
app.factory('netCapitalQuoteService',['$http','$q', 'userStatusService', 'ProxyRequestService',function($http,$q, userStatusService, ProxyRequestService,$uibModal){
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
		 * /
		 * 4.2.1 [线上资金报价  提取报价]
		 * ofrDscList =[""]
		 */
		onlineAnalysisOfr(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/online/analysisOfr',{
				ofrDscList:obj.ofrDscList
			});
		},
		/**
		 * 4.2.2 [线上资金报价	发布报价]
		 */
		onlineAddOfr(arr){
			/**
			 *[{drc:1,trmTp:'1,2',trmLwrLmtVal:'',trmUpLmVal:'',trmUnit:'',amt:'',amtUnit:'',mode:'1,2',intrtTp:'',intrtVal:'',txnRst:'',rmrk:''}]
			 */
			return ProxyRequestService.post('/e-bondquote/capitalQuote/online/addOfr',arr);
		},
		/**
		 *4.2.3 [线上资金报价	查询报价大厅]
		 *{
			drc:'',
			trmTp:"",//期限类型
			trmLwrLmtVal:'',//期限下限值
			trmLwrLmtUnit:'',//期限下限单位
			trmUpLmVal:'',//期限上限值
			trmUpLmUnit:'',//期限上限单位
			mode:'',//模式
			intrtTp:'',//利率类型
			intRtStrtVal:'',//利率开始值
			intRtEndVal:'',//利率结束值
			amtStrtVal:'',//金额开始值
			amtEndVal:'',//金额结束值
			amtUnit:'',//金额单位
			cltnEStatus:'',//收藏状态
			pageNum:1,
			pageSize:50,
		}
		 */
		onlineQueryOfrHall(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/online/queryOfrHall',{

					drc:obj.drc,
					trmTp:obj.trmTp,
					trmLwrLmtVal:obj.trmLwrLmtVal,
					trmLwrLmtUnit:obj.trmLwrLmtUnit,
					trmUpLmVal:obj.trmUpLmVal,
					trmUpLmUnit:obj.trmUpLmUnit,
					amt:obj.amt,
					amtStrtVal:obj.amtStrtVal,
					amtEndVal:obj.amtEndVal,
					amtUnit:obj.amtUnit,
					mode:obj.mode,
					intrtTp:obj.intrtTp,
					intrtVal:obj.intrtVal,
					intRtStrtVal:obj.intRtStrtVal,
					intRtEndVal:obj.intRtEndVal,
					cltnEStatus:obj.cltnEStatus,
					pageNum:obj.pageNum,
					pageSize:obj.pageSize,
				});
		},
		/**
		 *
		 * 4.2.4	更新报价收藏状态
		 * {
		 * ofrid  : 报价ID
		 * cltnEStatus: 收藏状态
		 * }
		 */
		onlineUpdateOfrCltnEStatus(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/updateOfrCltnEStatus',{
				ofrid:obj.ofrid,
				cltnEStatus:obj.cltnEStatus,

			});
		},
		/**
		 *
		 * 4.2.5	获取我的报价列表
		 */
		onlineGetMyOfrList(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/online/getMyOfrList',{
				pageNum:obj.pageNum,
				pageSize:obj.pageSize,

			});
		},
		/**
		 *
		 *4.2.6	更新报价状态
		 *{
		 * ofrid  : 报价ID
		 * eStatus: 报价状态
		 * }
		 */
		updateOfrEStatus(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/updateOfrEStatus',{
				ofrid:obj.ofrid,
				eStatus:obj.eStatus,
			});
		},
		/**
		 *
		 *4.2.7	更新报价
		 */
		onlineUpdateOfr(obj){
			console.log(obj)
			return ProxyRequestService.post('e-bondquote/capitalQuote/online/updateOfr',{
							ofrid :obj.ofrid,
							drc	:obj.drc,
							trmTp :obj.trmTp,
							trmLwrLmtVal :obj.trmLwrLmtVal,
							trmUpLmVal :obj.trmUpLmVal,
							trmUnit :obj.trmUnit,
							amt :obj.amt,
							amtUnit :obj.amtUnit,
							mode:obj.mode,
							intrtTp:obj.intrtTp,
							intrtVal:obj.intrtVal,
							txnRst:obj.txnRst,
							rmrk:obj.rmrk,
							eStatus:obj.eStatus,
							pageNum:obj.pageNum,
							pageSize:obj.pageSize,
			
						});
		},
		/**线上
		 * 根据 ID 获取详细信息 填充列表
		 * @return {[type]} [description]
		 */
		getOnlineOfrDetails(ofrid){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/online/getOnlineOfrDetails',{
				ofrid:ofrid,
			});
		},
		/**线下
		 * 根据 ID 获取详细信息 填充列表
		 * @return {[type]} [description]
		 */
		getOfflineOfrDetails(ofrid){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/offline/getOfflineOfrDetails',{
				ofrid:ofrid
			});
		},
		/**
		 *
		 *	4.3.1	提取报价
		 *	ofrDscList=['',''];
		 */
		offlineAnalysisOfr(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/offline/analysisOfr',{
				ofrDscList:obj.ofrDscList,
			});
		},
		/**
		 *
		 *4.3.2	发布报价
		 *[{drc:1,trmTp:'1,2',trmLwrLmtVal:'',trmUpLmVal:'',trmUnit:'',amt:'',amtUnit:'',mode:'1,2',intrtTp:'',intrtVal:'',txnRst:'',rmrk:''}]
		 */
		offlineAddOfr(arr){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/offline/addOfr',arr);
		},
		/**
		 *
		 *4.3.3	查询报价大厅
		 *{
			drc:'1',方向
			trmTp:'1,2',期限类型
			trmLwrLmtVal:'',期限下限值
			trmUpLmVal:'',期限上限值
			trmUnit:'', 期限单位
			intRtStrtVal:'',利率开始值
			intRtEndVal:'',利率结束值
			ctlg:'1,2',种类
			cltnEStatus:'',收藏状态
			pageNum: 当前页面
			pageSize:每页显示条数
			
			drc:"",//方向
			trmTp:"",//期限
			trmLwrLmtVal:"",//期限下限值
			trmLwrLmtUnit:"1",//期限下限值单位
			trmUpLmVal:"",//期限上限值
			trmUpLmUnit:"1",//期限上限单位
			intRtStrtVal:"",//利率開始值
			intRtEndVal:"",//利率結束值
			ctlg:"",//种类
			cltnEStatus:"",//收藏状态
			pageNum:1,
			pageSize:50,

		}
		 */
		offlineQueryOfrHall(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/offline/queryOfrHall',{
				drc:obj.drc,
				trmTp:obj.trmTp,
				trmLwrLmtVal:obj.trmLwrLmtVal,
				trmLwrLmtUnit:obj.trmLwrLmtUnit,
				trmUpLmVal:obj.trmUpLmVal,
				trmUpLmUnit:obj.trmUpLmUnit,
				intRtStrtVal:obj.intRtStrtVal,
				intRtEndVal:obj.intRtEndVal,
				ctlg:obj.ctlg,
				cltnEStatus:obj.cltnEStatus,
				pageNum:obj.pageNum,
				pageSize:obj.pageSize,

			});
		},
		/**
		 *
		 *4.3.5	获取我的报价列表
		 */
		offlineGetMyOfrList(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/offline/getMyOfrList',{
				pageNum:obj.pageNum,
				pageSize:obj.pageSize,

			});
		},
		/**
		 *
		 *4.3.7	更新报价
		 *{}
		 */
		templte:{
			drc:'',//方向
			ctlg:'',//种类
			dy1IntRtVal :'',//隔夜
			dy7IntRtVal :'',//7天
			dy14IntRtVal:'',//14天
			dy21IntRtVal:'',//21
			mo1IntRtVal:'',//1月
			mo2IntRtVal:'',//2月
			mo3IntRtVal:'',//3月
			mo6IntRtVal:'',//6个月
			mo9IntRtVal :'',//9个月
			yr1IntRtVal:'',//1年
			rmrk:'',//
			uDFTrmList:[],
			uDFTrm1:'',
			uDFTrmUnit1:'',
			uDFInRtVal1:'',
			uDFTrm2:'',
			uDFTrmUnit2:"",
			uDFInRtVal2:'',
			uDFTrm3:"",
			uDFTrmUnit3:"",
			uDFInRtVal3:"",
			uDFTrm4:"",
			uDFTrmUnit4:"",
			uDFInRtVal4:"",
			uDFTrm5:"",
			uDFTrmUnit5:"",
			uDFInRtVal5:"",
		},
		offlineUpdateOfr(obj){
			return ProxyRequestService.post('/e-bondquote/capitalQuote/offline/updateOfr',{
				ofrid:obj.ofrid,//报价ID
				drc:obj.drc,//
				ctlg:obj.ctlg,//

				dy1IntRtVal :obj.dy1IntRtVal,
				dy7IntRtVal :obj.dy7IntRtVal,
				dy14IntRtVal:obj.dy14IntRtVal,
				dy21IntRtVal:obj.dy21IntRtVal,

				mo1IntRtVal:obj.mo1IntRtVal,
				mo2IntRtVal:obj.mo2IntRtVal,
				mo3IntRtVal:obj.mo3IntRtVal,
				mo6IntRtVal:obj.mo6IntRtVal,
				mo9IntRtVal :obj.mo9IntRtVal,
				yr1IntRtVal:obj.yr1IntRtVal,
				// 自定义期限1  期限单位  期限值

				uDFTrm1:obj.uDFTrm1,
				uDFTrmUnit1:obj.uDFTrmUnit1,
				uDFInRtVal1:obj.uDFInRtVal1,
				// 自定义期限2  期限单位  期限值

				uDFTrm2:obj.uDFTrm2,
				uDFTrmUnit2:obj.uDFTrmUnit2,
				uDFInRtVal2:obj.uDFInRtVal2,
				// 自定义期限3  期限单位  期限值

				uDFTrm3:obj.uDFTrm3,
				uDFTrmUnit3:obj.uDFTrmUnit3,
				uDFInRtVal3:obj.uDFInRtVal3,
				// 自定义期限4 期限单位  期限值

				uDFTrm4:obj.uDFTrm4,
				uDFTrmUnit4:obj.uDFTrmUnit4,
				uDFInRtVal4:obj.uDFInRtVal4,
				// 自定义期限5  期限单位  期限值
				uDFTrm5:obj.uDFTrm5,
				uDFTrmUnit5:obj.uDFTrmUnit5,
				uDFInRtVal5:obj.uDFInRtVal5,

				rmrk:obj.rmrk,
				eStatus:obj.eStatus,

			});
		},
		/**
		 * [drc 方向 复选]
		 * @type {Object}
		 */
		drc:{
			name:'方向',
			value:{
					// 0:{name:'全部',value:''},
					1:{name:'融入',value:'1'},
					2:{name:'融出',value:'2'},
				}
		},
		/**
		 * [trmTp 复选 期限]
		 * @type {Object}
		 */
		trmTp:{
			name:'期限',
			value:{
					// 0:{name:'全部',value:''},
					1:{name:'隔夜',value:'1'},
					2:{name:'7天',value:'2'},
					3:{name:'14天',value:'3'},
					4:{name:'21天',value:'4'},
					5:{name:'1个月',value:'5'},
					6:{name:'2个月',value:'6'},
					7:{name:'3个月',value:'7'},
					8:{name:'6个月',value:'8'},
					9:{name:'9个月',value:'9'},
					10:{name:'1年',value:'10'},
					11:{name:'自定义',value:'11'},
				}
		},
		/**
		 * [uDFTrm 期限  自定义]
		 * @type {Object}
		 */
		uDFTrm:{
			name:'自定义',
			value:{
					0:{name:'',value:''},
					1:{name:'',value:''},
				}
		},
		/**
		 * [mode 模式 复选]
		 * @type {Object}
		 */
		mode:{
			name:'模式',
			value:{
					// 0:{name:'全部',value:''},
					1:{name:'押利率',value:'1'},
					2:{name:'押信用',value:'2'},
					3:{name:'押中债',value:'3'},
					4:{name:'押上清',value:'4'},
					5:{name:'押存单',value:'5'},
				}
		},
		/**
		 * [intrtTp 利率 复选]
		 * @type {Object}
		 */
		intrtTp:{
			name:'利率',
			value:{
					// 0:{name:'全部',value:''},
					1:{name:'加权',value:'1'},
					2:{name:'加点',value:'2'},
					3:{name:'减点',value:'3'},
					4:{name:'自定义',value:'4'},
				},
			value2:{
					4:{name:'自定义',value:'4'},
					5:{name:'',value:''},
					6:{name:'',value:''},
				}
		},
		/**
		 * [intRtVal 自定义利率]
		 * @type {Object}
		 */
		intRtVal:{
			name:'全部',
			value:{
					0:{name:'',value:''},
					1:{name:'',value:''},
				}
		},
		/**
		 * [ctlg 种类]
		 * @type {Object}
		 */
		ctlg:{
			name:'种类',
			value:{
					// 0:{name:'全部',value:''},
					1:{name:'资金',value:'1'},
					2:{name:'结构性存款',value:'2'},
					3:{name:'银行同存',value:'3'},
					4:{name:'非银同存',value:'4'},
					5:{name:'协议存款',value:'5'},
				}
		},
		txnRst:{
			name:'交易限制',
			value:{
				1:{name:'限银行',value:'1'},
				2:{name:'限农信',value:'2'},
				3:{name:'限直连',value:'3'},
				4:{name:'限存款机构',value:'4'},
				5:{name:'其他',value:'5'},
			}
		},
		/*期限  */
		trmTpSelect:[
			{label:'隔夜',id:'1'},
			{label:'7天',id:'2'},
			{label:'14天',id:'3'},
			{label:'21天',id:'4'},
			{label:'1个月',id:'5'},
			{label:'2个月',id:'6'},
			{label:'3个月',id:'7'},
			{label:'6个月',id:'8'},
			{label:'9个月',id:'9'},
			{label:'1年',id:'10'},
			{label:'自定义',id:'11'},
		],
		/*模式  */
		modeSelect:[
			{label:'押利率',id:'1'},
			{label:'押信用',id:'2'},
			{label:'押中债',id:'3'},
			{label:'押上清',id:'4'},
			{label:'押存单',id:'5'},
		],
		/*下拉 利率*/
		intrtTpSelect:[
			{label:'加权',id:'1'},
			{label:'加点',id:'2'},
			{label:'减点',id:'3'},
			{label:'自定义',id:'4'},
		],
		/*下拉 种类数据*/
		ctlgSelect:[
			{label:'资金',id:'1'},
			{label:'结构性存款',id:'2'},
			{label:'银行同存',id:'3'},
			{label:'非银同存',id:'4'},
			{label:'协议存款',id:'5'},
		],
		/*下拉 复选数据*/
		txnRstSelect:[
			{label:'限银行',id:'1'},
			{label:'限农信',id:'2'},
			{label:'限直连',id:'3'},
			{label:'限存款机构',id:'4'},
			{label:'其他',id:'5'},
		],
		/*下拉 方向*/
		drcSelect:[
			{label:'融入',id:'1'},
			{label:'融出',id:'2'},
		],
		/*下拉 天 月 年*/
		dayMonSelect:[
			{label:'天',id:'1'},
			{label:'月',id:'2'},
			{label:'年',id:'3'},
		],
		/*下拉 万  亿*/
		MoneySelect:[
			{label:'万',id:'1'},
			{label:'亿',id:'2'},
		]
	}
}]);