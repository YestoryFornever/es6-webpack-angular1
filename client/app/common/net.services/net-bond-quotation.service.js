app.factory('NetBondquotationService', function($http,$q,$uibModal, ProxyRequestService){
	return {
		openCalculator(item){//计算器 弹窗
			this.dataCalculatorModal ={
				itemInfo:{},
			}
			let that =this;
			$uibModal.open({
				animation: true,
				component:'bondTrial',
				windowClass:'my-bond-trial',
				size: 'xs',//'lg',//'sm',
				resolve: {
					modalData:function(){
						that.dataCalculatorModal['itemInfo']   = item ? item :{};
						return that.dataCalculatorModal;
					}
				}
			}).result.then(function (selectedItem) {},that);
		},
		
		// 获取结算行情
		getCBLatestWeekValuation(obj){
			return ProxyRequestService.post('ainas/web/getCBLatestWeekValuation', {
					bondid:obj.bondid
			});
		},
		// 获取报价列表
		queryQuoteList(obj){
			return ProxyRequestService.post('e-bondquote/bondOfr/queryQuoteList', {
						queryFlag:obj.queryFlag,
						wthrFcs:obj.wthrFcs,
						bondid:obj.bondid,
						ofrEStatus:obj.ofrEStatus,
						pageNum:obj.pageNum,
						pageSize:obj.pageSize,
						order:obj.order,
						desc:obj.desc,

			}).then((response)=>{
				if(response.data && response.data.data && response.data.data[0]){
					response.data.page = response.data.data[0].page;//临时处理后端数据格式不规范的问题
				}
				return response;
			});
		},
		//获取方案列表
		queryScmList(obj){
			return ProxyRequestService.post('e-bondquote/bondScm/queryScmList', {
				scmEStatus:obj.scmEStatus
			});
		},
		//删除自选方案
		deleteScm(obj){
			return ProxyRequestService.post('e-bondquote/bondScm/deleteScm', {
				scmid:obj.scmid
			});
		},
		// 新增自选方案
		addScm(obj){
			return ProxyRequestService.post('e-bondquote/bondScm/addScm', obj||{
					scmNm:obj.scmNm,
					scmEStatus:obj.scmEStatus,
					drc:obj.drc,
					yldrto:obj.yldrto,
					valtbpMns:obj.valtbpMns,
					bondTp:obj.bondTp,
					rsdtrm:obj.rsdtrm,
					opRsdtrm:obj.opRsdtrm,
					opRsdtrmUt:obj.opRsdtrmUt,
					sbjRtg:obj.sbjRtg,
					dbtitmRtg:obj.dbtitmRtg,
					issuPsn:obj.issuPsn,
					issuEntp:obj.issuEntp,
					ctou:obj.ctou,
					wrnt:obj.wrnt,
					wrght:obj.wrght,
					face:obj.face,
					crclMkt:obj.crclMkt,
					idy:obj.idy,
					rgon:obj.rgon,
					yr:obj.yr,
			});
		},
		// 更新自选方案
		updateScm(obj){
			return ProxyRequestService.post('e-bondquote/bondScm/updateScm', obj||{
					scmid:obj.scmid,
					scmNm:obj.scmNm,
					scmEStatus:obj.scmEStatus,
					drc:obj.drc,
					yldrto:obj.yldrto,
					valtbpMns:obj.valtbpMns,
					bondTp:obj.bondTp,
					rsdtrm:obj.rsdtrm,
					opRsdtrm:obj.opRsdtrm,
					opRsdtrmUt:obj.opRsdtrmUt,
					sbjRtg:obj.sbjRtg,
					dbtitmRtg:obj.dbtitmRtg,
					issuPsn:obj.issuPsn,
					issuEntp:obj.issuEntp,
					ctou:obj.ctou,
					wrnt:obj.wrnt,
					wrght:obj.wrght,
					face:obj.face,
					crclMkt:obj.crclMkt,
					idy:obj.idy,
					rgon:obj.rgon,
					yr:obj.yr,
			});
		},
		// 债券搜索
		searchBondBreed(obj){
			return ProxyRequestService.post('e-bondquote/bondOfr/searchBondBreed', {
					keyWord:obj.keyWord,
					queryFlag:obj.queryFlag,
					wthrFcs:obj.wthrFcs,
					pageNum:obj.pageNum,
					pageSize:obj.pageSize,

			});
		},
		// 获取详情
		queryBondBaseInfo(obj){
			return ProxyRequestService.post('ainas/web/queryDetailBondBaseInfo', {
				bondid:obj.bondid
			});
		},
		// 更新报价状态
		updateQuoteState(obj){
			return ProxyRequestService.post('e-bondquote/bondOfr/updateQuoteState', {
				bondOfrid: obj.bondOfrid,
				wthrFcs: obj.wthrFcs,
				ofrEStatus:obj.ofrEStatus,
				wthrAlrdy:obj.wthrAlrdy
			});
		},
		// 获取方案详情
		getScmDetail(obj){
			return ProxyRequestService.post('e-bondquote/bondScm/getScmDetail',obj|| {
				bondOfrid: obj.bondOfrid,
				wthrFcs: obj.wthrFcs,
				ofrEStatus:obj.ofrEStatus,
				wthrAlrdy:obj.wthrAlrdy
			});
		},
		/**
		 * /4.1.27	获取发行机构列表
		 * @param  {[type]} obj [description]
		 * @return {[type]}     [description]
		 */
		getIssuerListByFullName(obj){
			return ProxyRequestService.post('E_project_base/authority/getIssuerListByFullName',{
				organizationFullName:obj.organizationFullName
			});
		},
		/**
		 * ///批量新增报价
		 * @param {[type]} quoteListChecked [description]
		 */
		addBatchBondQuote(quoteListChecked){
			return ProxyRequestService.post('e-bondquote/bondOfr/addBatchBondQuote',{
				'drc':"",
				'addList':quoteListChecked
			});
		},
		/**
		 * ///修改报价
		 * @param  {[type]} obj [description]
		 * @return {[type]}     [description]
		 */
		updateBondQuote(obj){
			return ProxyRequestService.post('e-bondquote/bondOfr/updateBondQuote',{
					"drc": obj.drc,
					"bondOfrid":obj.bondOfrid,
					"bondid":obj.bondid,
					"num":obj.num*10000,
					"yldrto":obj.yldrto/100,
					"netprc":obj.netprc,
					"wthrAnon":obj.wthrAnon,
					"rmrk":(obj.rmrk ? obj.rmrk : ''),
			});
		},
		/*净价收益率反显*/
		__y(key,bool){
			if(bool){
				let reg =/\./;
				if(key ){
					key = key*1000000;
					key = Math.round(key)/10000;
					// if(reg.test(key)){

					// 	let two =key.split('.')[1]? key.split('.')[1] :'0';
					// 		two =  two.length>4 ? two :( two + "0000");
					// 	key = key.split('.')[0]+ "." + (two.substr(0,4));
					// }else if(key.length==1){
					// 	key = key + ".0000";
					// }
				}
			}else{
				return key/100;
			}
			return parseFloat(key);
		},
		__p(key,bool){
			if(bool){
				let reg =/\./;
				if(key ){
					key = key*10000;
					key = Math.round(key)/10000;
					// if(reg.test(key)){
					// 	key = key.split('.')[0]+ "." + key.split('.')[1].substr(0,4);
					// }
				}
			}
			return parseFloat(key);
		},
		__n(key,bool){
			if(!key){
				return '';
			}
			if(bool){
				key = parseInt(key/10000);
			}else{
				return key*10000;
			}
			return key;
		},
		__BP(key,bool){
			if(!key){
				return "";
			}
			if(bool){
				key = key*10000;
			}else{
				return parseFloat(key/10000);
			}
			return key ;
		},
		/**
		 * 默认方案列表
		 * @type {Array}
		 */
		defaultList:[{ 
			scmNm:'全部',scmid:'A'
		},{
			scmNm:'我的报价',scmid:'B'
		}],

		scm:{
			name:'自选方案',
			value:'',
		},
		drc:{
			name:'方向',
			value:[{name:'买入',truthy:false,value:'-1'},{name:'卖出',truthy:false,value:'1'},]
		},
		yldrto:{
			name:'收益率%',
			value:[{name:'0',value:''},{name:'1',value:''},]
		},
		valtbpMns:{
			name:'估值BP差',
			value:[{name:'0',value:''},{name:'1',value:''},]
		},
		bondTp:{
			name:'债券类型',
			values1:{
				1:{name:'利率债',truthy:false,value:'1'},
				2:{name:'国债',truthy:false,value:'2'},
				3:{name:'央票',truthy:false,value:'3'},
				4:{name:'政金债',truthy:false,value:'4'},
				5:{name:'地方债',truthy:false,value:'5'},
			},
			values2: {
				6:{name:'信用债',truthy:false,value:'6'},
				7:{name:'短融',truthy:false,value:'7'},
				8:{name:'央票',truthy:false,value:'8'},
				9:{name:'企业债',truthy:false,value:'9'},
				11:{name:'PPN',truthy:false,value:'11'},
				10:{name:'公司债',truthy:false,value:'10'},
				99:{name:'其他',truthy:false,value:'99'},
			}
		},
		sbjRtg:{
			name:'主体评级',
			value:{
				// 0:{name:'全部',truthy:true,value:''},
				1:{name:'AAA',truthy:false,value:'1'},
				2:{name:'AA+',truthy:false,value:'2'},
				3:{name:'AA',truthy:false,value:'3'},
				4:{name:'AA-',truthy:false,value:'4'},
				5:{name:'A',truthy:false,value:'5'},
				99:{name:'其他',truthy:false,value:'99'},
			}
		},
		dbtitmRtg:{
			name:'债券评级',
			value:{
					// 0:{name:'全部',truthy:true,value:''},
					1:{name:'AAA',truthy:false,value:'1'},
					2:{name:'A-1',truthy:false,value:'2'},
					3:{name:'AA+',truthy:false,value:'3'},
					4:{name:'AA',truthy:false,value:'4'},
					5:{name:'AA-',truthy:false,value:'5'},
					6:{name:'A+',truthy:false,value:'6'},
					99:{name:'其他',truthy:false,value:'99'},
				}
		},
		wrght:{
			name:'含权',
			value:{
					// 0:{name:'全部',truthy:true,value:''},
					1:{name:'含权',truthy:false,value:'1'},
					2:{name:'不含权',truthy:false,value:'2'},
				}
		},
		crclMkt:{
			name:'流通市场',
			value:{
					// 0:{name:'全部',truthy:true,value:''},
					1:{name:'银行间',truthy:false,value:'1'},
					2:{name:'上交所',truthy:false,value:'2'},
					3:{name:'深交所',truthy:false,value:'3'},
				}
		},
		rsdtrm:{
			name:'剩余期限',
			value:{
					// 0:{name:'全部',truthy:true,value:''},
					1:{name:'3M',truthy:false,value:'1'},
					2:{name:'3-6M',truthy:false,value:'2'},
					3:{name:'6-9M',truthy:false,value:'3'},
					4:{name:'9-12M',truthy:false,value:'4'},
					5:{name:'1-3Y',truthy:false,value:'5'},
					6:{name:'3-5Y',truthy:false,value:'6'},
					7:{name:'5-7Y',truthy:false,value:'7'},
					8:{name:'7-10Y',truthy:false,value:'8'},
					9:{name:'10Y',truthy:false,value:'9'},
				}
		},
		issuEntp:{
			name:'发行企业',
			value:{
					// 0:{name:'全部',truthy:true,value:''},
					1:{name:'央企',truthy:false,value:'1'},
					2:{name:'国企',truthy:false,value:'2'},
					3:{name:'民企',truthy:false,value:'3'},
					99:{name:'其他',truthy:false,value:'99'},
				}
		},
		wrnt:{
			name:'担保',
			value:{
					// 0:{name:'全部',truthy:true,value:''},
					1:{name:'担保人',truthy:false,value:'1'},
					2:{name:'担保物',truthy:false,value:'2'},
					3:{name:'无担保',truthy:false,value:'3'},
				}
		},
		face:{
			name:'票息',
			value:{
					// 0:{name:'全部',truthy:true,value:''},
					1:{name:'浮息',truthy:false,value:'1'},
					2:{name:'固息',truthy:false,value:'2'},
				}
		},
		year:{
			"data":[
					{"label": "2017",'id':'2017', "children": false},
					{"label": "2016",'id':'2016', "children": false},
					{"label": "2015",'id':'2015', "children": false},
					{"label": "2014",'id':'2014', "children": false},
					{"label": "2013",'id':'2013', "children": false},
					{"label": "2012",'id':'2012', "children": false},
					{"label": "2011",'id':'2011', "children": false},
					{"label": "2010",'id':'2010', "children": false},
					{"label": "2009",'id':'2009', "children": false},
					{"label": "2008",'id':'2008', "children": false},
					{"label": "2007",'id':'2007', "children": false},
					{"label": "2006",'id':'2006', "children": false},
					{"label": "2005",'id':'2005', "children": false},
					{"label": "2004",'id':'2004', "children": false},
					{"label": "2003",'id':'2003', "children": false},
					{"label": "2002",'id':'2002', "children": false},
					{"label": "2001",'id':'2001', "children": false},
					{"label": "2000",'id':'2000', "children": false},
					{"label": "1999",'id':'1999', "children": false},
					{"label": "1998",'id':'1998', "children": false},
					{"label": "1997",'id':'1997', "children": false},
					{"label": "1996",'id':'1996', "children": false},
					{"label": "1995",'id':'1995', "children": false},
					{"label": "1994",'id':'1994', "children": false},
					{"label": "1993",'id':'1993', "children": false},
					{"label": "1992",'id':'1992', "children": false},
					{"label": "1991",'id':'1991', "children": false},
					{"label": "1990",'id':'1990', "children": false},
			]
		},
		section:{
			"data":[
				{"label": "农、林、牧、渔业",'id':'A', "children": [
					{"label": "农业",'id':'1', "children": false},
					{"label": "林业",'id':'2', "children": false},
					{"label": "畜牧业",'id':'3', "children": false},
					{"label": "渔业",'id':'4', "children": false},
					{"label": "农、林、牧、渔服务业",'id':'5', "children": false},
				]},
				{"label": "采矿业",'id':'B', "children": [
					{"label": "煤炭开采和洗选业",'id':'6', "children": false},
					{"label": "石油和天然气开采业",'id':'7', "children": false},
					{"label": "黑色金属矿采选业",'id':'8', "children": false},
					{"label": "有色金属矿采选业",'id':'9', "children": false},
					{"label": "非金属矿采选业",'id':'10', "children": false},
					{"label": "开采辅助活动",'id':'11', "children": false},
					{"label": "其他采矿业",'id':'12', "children": false},
				]},
				{"label": "制造业",'id':'C', "children": [
					{"label": "农副食品加工业",'id':'13', "children": false},
					{"label": "食品制造业",'id':'14', "children": false},
					{"label": "酒、饮料和精制茶制造业",'id':'15', "children": false},
					{"label": "烟草制品业 ",'id':'16', "children": false},
					{"label": "纺织业",'id':'17', "children": false},
					{"label": "纺织服装、服饰业",'id':'18', "children": false},
					{"label": "皮革、毛皮、羽毛及其制品和制鞋业",'id':'19', "children": false},
					{"label": "木材加工和木、竹、藤、棕、草制品业",'id':'20', "children": false},
					{"label": "家具制造业 ",'id':'21', "children": false},
					{"label": "造纸和纸制品业 ",'id':'22', "children": false},
					{"label": "印刷和记录媒介复制业",'id':'23', "children": false},
					{"label": "文教、工美、体育和娱乐用品制造业",'id':'24', "children": false},
					{"label": "石油加工、炼焦和核燃料加工业 ",'id':'25', "children": false},
					{"label": "化学原料和化学制品制造业",'id':'26', "children": false},
					{"label": "医药制造业 ",'id':'27', "children": false},
					{"label": "化学纤维制造业",'id':'28', "children": false},
					{"label": "橡胶和塑料制品业",'id':'29', "children": false},
					{"label": "非金属矿物制品业",'id':'30', "children": false},
					{"label": "黑色金属冶炼和压延加工业 ",'id':'31', "children": false},
					{"label": "有色金属冶炼和压延加工业 ",'id':'32', "children": false},
					{"label": "金属制品业 ",'id':'33', "children": false},
					{"label": "通用设备制造业",'id':'34', "children": false},
					{"label": "专用设备制造",'id':'35', "children": false},
					{"label": "汽车制造业",'id':'36', "children": false},
					{"label": "铁路、船舶、航空航天和其他运输设备制造业",'id':'37', "children": false},
					{"label": "电气机械和器材制造业 ",'id':'38', "children": false},
					{"label": "计算机、通信和其他电子设备制造业",'id':'39', "children": false},
					{"label": "仪器仪表制造业",'id':'40', "children": false},
					{"label": "其他制造业",'id':'41', "children": false},
					{"label": "废弃资源综合利用业",'id':'42', "children": false},
					{"label": "金属制品、机械和设备修理业",'id':'43', "children": false},
				]},
				{"label": "电力、热力、燃气及水生产和供应业",'id':'D', "children": [
					{"label": "电力、热力生产和供应业",'id':'44', "children": false},
					{"label": "燃气生产和供应业 ",'id':'45', "children": false},
					{"label": "水的生产和供应业",'id':'46', "children": false},
				]},
				{"label": "建筑业",'id':'E', "children": [
					{"label": "房屋建筑业",'id':'47', "children": false},
					{"label": "土木工程建筑业",'id':'48', "children": false},
					{"label": "建筑安装业",'id':'49', "children": false},
					{"label": "建筑装饰和其他建筑业",'id':'50', "children": false},
				]},
				{"label": "批发和零售业",'id':'F', "children": [
					{"label": "批发业",'id':'51', "children": false},
					{"label": "零售业",'id':'52', "children": false},
				]},
				{"label": "交通运输、仓储和邮政业",'id':'G', "children": [
					{"label": "铁路运输业",'id':'53', "children": false},
					{"label": "道路运输业",'id':'54', "children": false},
					{"label": "水上运输业",'id':'55', "children": false},
					{"label": "航空运输业 ",'id':'56', "children": false},
					{"label": "管道运输业 ",'id':'57', "children": false},
					{"label": "装卸搬运和运输代理业 ",'id':'58', "children": false},
					{"label": "仓储业  ",'id':'59', "children": false},
					{"label": "邮政业 ",'id':'60', "children": false},
				]},
				{"label": "住宿和餐饮业",'id':'H', "children": [
					{"label": "住宿业 ",'id':'61', "children": false},
					{"label": "餐饮业 ",'id':'62', "children": false},
				]},
				{"label": "信息传输、软件和信息技术服务业",'id':'I', "children": [
					{"label": "电信、广播电视和卫星传输服务 ",'id':'63', "children": false},
					{"label": "互联网和相关服务 ",'id':'64', "children": false},
					{"label": "软件和信息技术服务业 ",'id':'65', "children": false},
				]},
				{"label": "金融业",'id':'J', "children": [
					{"label": "货币金融服务 ",'id':'66', "children": false},
					{"label": "资本市场服务 ",'id':'67', "children": false},
					{"label": "保险业 ",'id':'68', "children": false},
					{"label": "其他金融业 ",'id':'69', "children": false},

				]},
				{"label": "房地产业",'id':'K', "children": [
					{"label": "房地产业 ",'id':'70', "children": false},
				]},
				{"label": "租赁和商务服务业",'id':'L', "children": [
					{"label": "租赁业 ",'id':'71', "children": false},
					{"label": "商务服务业 ",'id':'72', "children": false},
				]},
				{"label": "科学研究和技术服务业",'id':'M', "children": [
					{"label": "研究和试验发展 ",'id':'73', "children": false},
					{"label": "专业技术服务业 ",'id':'74', "children": false},
					{"label": "科技推广和应用服务业 ",'id':'75', "children": false},
				]},
				{"label": "水利、环境和公共设施管理业",'id':'N', "children": [
					{"label": "水利管理业 ",'id':'76', "children": false},
					{"label": "生态保护和环境治理业 ",'id':'77', "children": false},
					{"label": "公共设施管理业 ",'id':'78', "children": false},
				]},
				{"label": "居民服务、修理和其他服务业",'id':'O', "children": [
					{"label": "居民服务业 ",'id':'79', "children": false},
					{"label": "机动车、电子产品和日用产品修理业 ",'id':'80', "children": false},
					{"label": "其他服务业 ",'id':'81', "children": false},
				]},
				{"label": "教育",'id':'P', "children": [
					{"label": "教育 ",'id':'82', "children": false},
				]},
				{"label": "卫生和社会工作",'id':'Q', "children": [
					{"label": "卫生 ",'id':'83', "children": false},
					{"label": "社会工作 ",'id':'84', "children": false},
				]},
				{"label": "文化、体育和娱乐业",'id':'R', "children": [
					{"label": "新闻和出版业 ",'id':'85', "children": false},
					{"label": "广播、电视、电影和影视录音制作业 ",'id':'86', "children": false},
					{"label": "文化艺术业 ",'id':'87', "children": false},
					{"label": "体育 ",'id':'88', "children": false},
					{"label": "娱乐业 ",'id':'89', "children": false},
				]},
				{"label": "公共管理、社会保障和社会组织",'id':'S', "children": [
					{"label": "中国共产党机关 ",'id':'90', "children": false},
					{"label": "国家机构 ",'id':'91', "children": false},
					{"label": "人民政协、民主党派 ",'id':'92', "children": false},
					{"label": "社会保障 ",'id':'93', "children": false},
					{"label": "群众团体、社会团体和其他成员组织 ",'id':'94', "children": false},
					{"label": "基层群众自治组织 ",'id':'95', "children": false},
				]},
				{"label": "国际组织",'id':'T', "children": [
					{"label": "国际组织 ",'id':'96', "children": false},
				]},
			]
		},
		location: {
			"data":[
				{"label": "华东地区",'id':'1', "children": [
					{"label": "上海",'id':'11', "children": false},
					{"label": "江苏",'id':'12', "children": false},
					{"label": "安徽",'id':'13', "children": false},
					{"label": "浙江",'id':'14', "children": false},
					{"label": "山东",'id':'15', "children": false},
					{"label": "福建",'id':'16', "children": false},
					{"label": "江西",'id':'17', "children": false},
					{"label": "台湾",'id':'18', "children": false},
				]},
				{"label": "华北地区",'id':'2', "children": [
					{"label": "北京",'id':'21', "children": false},
					{"label": "天津",'id':'22', "children": false},
					{"label": "河北",'id':'23', "children": false},
					{"label": "山西",'id':'24', "children": false},
					{"label": "内蒙古",'id':'25', "children": false},

				]},
				{"label": "东北地区",'id':'3', "children": [
					{"label": "辽宁",'id':'31', "children": false},
					{"label": "吉林",'id':'32', "children": false},
					{"label": "黑龙江",'id':'33', "children": false},

				]},
				{"label": "华中地区",'id':'4', "children": [
					{"label": "河南",'id':'41', "children": false},
					{"label": "湖北",'id':'42', "children": false},
					{"label": "湖南",'id':'43', "children": false},

				]},
				{"label": "华南地区",'id':'5', "children": [
					{"label": "广东",'id':'51', "children": false},
					{"label": "广西",'id':'52', "children": false},
					{"label": "海南",'id':'53', "children": false},
					{"label": "香港",'id':'54', "children": false},
					{"label": "澳门",'id':'55', "children": false},

				]},
				{"label": "西南地区",'id':'6', "children": [
					{"label": "重庆",'id':'61', "children": false},
					{"label": "四川",'id':'62', "children": false},
					{"label": "云南",'id':'63', "children": false},
					{"label": "贵州",'id':'64', "children": false},
					{"label": "西藏",'id':'65', "children": false},

				]},
				{"label": "西北地区",'id':'7', "children": [
					{"label": "陕西",'id':'71', "children": false},
					{"label": "宁夏",'id':'72', "children": false},
					{"label": "甘肃",'id':'73', "children": false},
					{"label": "青海",'id':'74', "children": false},
					{"label": "新疆",'id':'75', "children": false},

				]},
			]
		},
		/**
		 * 通过IDS集合获取地区列表
		 * @param  {[type]} ids [description]
		 * @return {[type]}     [description]
		 */
		findLocationById(ids){
			var res = [];
			angular.forEach(this.location.data, function(items){
				angular.forEach(items.children, function(item){
					if (ids.indexOf(item.id)>=0) {
						res.push(item);
					};
				});
			});
			return res;
		},
		/**
		 * 自选方案字段
		 * 目前少字段，后期补
		 */
		scmFields: {
			scmNm:'',
			scmEStatus:'1',
			drc:'-1',
			yldrto:'',
			valtbpMns:'',
			bondTp:'',
			rsdtrm:'',
			sbjRtg:'',
			dbtitmRtg:'', 
			issuPsn:'', 
			issuEntp:'', 
			ctou:'',
			wrnt:'', 
			wrght:'', 
			face:'', 
			crclMkt:'', 
			idy:'', 
			rgon:'', 
			yr:'2017',
		}


	}
});
