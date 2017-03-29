app.factory('bondquotationService',['$http','$q','$uibModal',function($http,$q,$uibModal){
	console.log(BONDCONFIG);
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
		/**
		 * 打开好友弹窗
		 */
		openFirend(item){//打开好友弹窗
			let that =this;
			that.dataFriendModal = {
				friendObj:{}
			}
			$uibModal.open({
				animation: true,
				component:'acoupond',
				size: 'xl',//'lg',//'sm',
				resolve: {
					friendModal:function(){
						that.dataFriendModal.friendObj = item ? item :{};
						return that.dataFriendModal ;
					}
				}
			}).result.then(function (selectedItem) {},that);
		},
		// 获取结算行情
		getCBLatestWeekValuation(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/getCBLatestWeekValuation",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 获取报价列表
		queryQuoteList(obj){
			let date = new Date();
			let time = date.getMinutes() + date.getSeconds();
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/queryQuoteList?"+time,
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		//获取方案列表
		queryScmList(obj){
			console.log(obj)
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/queryScmList",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		//删除自选方案
		deleteScm(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/deleteScm",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 新增自选方案
		addScm(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/addScm",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 更新自选方案
		updateScm(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/updateScm",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 债券搜索
		searchBondBreed(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/searchBondBreed",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 获取详情
		queryBondBaseInfo(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/queryDetailBondBaseInfo",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 更新报价状态
		updateQuoteState(obj,name){
			let sendObj = {
				bondOfrid:'',
			}
			sendObj['bondOfrid'] = obj['bondOfrid'];
			sendObj[name] = obj[name];
			console.log(sendObj);
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/updateQuoteState",
				data: JSON.stringify(sendObj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 获取方案详情
		getScmDetail(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/getScmDetail",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		getIssuerListByFullName(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"E_project_base/authority/getIssuerListByFullName",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		addBatchBondQuote(quoteListChecked){//批量新增报价
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/addBatchBondQuote",
				data: JSON.stringify({
					'drc':'',
					'addList':quoteListChecked
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		updateBondQuote(obj){//xiugai报价
			let deferred = $q.defer();
			let date = new Date();
			let time = date.getMinutes() + date.getSeconds();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/updateBondQuote?"+time ,
				data: JSON.stringify({
					"drc": obj.drc,
					"bondOfrid":obj.bondOfrid,
					"bondid":obj.bondid,
					"num":obj.num*10000,
					"yldrto":obj.yldrto/100,
					"netprc":obj.netprc,
					"wthrAnon":obj.wthrAnon,
					"rmrk":(obj.rmrk ? obj.rmrk : ''),

				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		/*净价收益率反显*/
		__y(key,bool){
			if(bool){
				let reg =/\./;
				if(key ){
					key = key*100+'';
					if(reg.test(key)){

						let two =key.split('.')[1]? key.split('.')[1] :'0';
							two =  two.length>4 ? two :( two + "0000");
						key = key.split('.')[0]+ "." + (two.substr(0,4));
					}else if(key.length==1){
						key = key + ".0000";
					}
				}
			}else{
				return key/100;
			}
			return key;
		},
		__p(key,bool){
			if(bool){
				let reg =/\./;
				if(key ){key = key+'';
					if(reg.test(key)){
						key = key.split('.')[0]+ "." + key.split('.')[1].substr(0,4);
					}
				}
			}
			return key;
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
		tabLablel:{
			name:'',
			value:[{ name:'全部',value:'A'},{name:'我的报价',value:'B'}]
		},
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
			0:{name:'全部',value:''},
			value1:{
					1:{name:'利率债',truthy:false,value:'1'},
					2:{name:'国债',truthy:false,value:'2'},
					3:{name:'央票',truthy:false,value:'3'},
					4:{name:'政金债',truthy:false,value:'4'},
					5:{name:'地方债',truthy:false,value:'5'},
				},
			value2:{
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
					0:{name:'全部',truthy:true,value:''},
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
					0:{name:'全部',truthy:true,value:''},
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
					0:{name:'全部',truthy:true,value:''},
					1:{name:'含权',truthy:false,value:'1'},
					2:{name:'不含权',truthy:false,value:'2'},
				}
		},
		crclMkt:{
			name:'流通市场',
			value:{
					0:{name:'全部',truthy:true,value:''},
					1:{name:'银行间',truthy:false,value:'1'},
					2:{name:'上交所',truthy:false,value:'2'},
					3:{name:'深交所',truthy:false,value:'3'},
				}
		},
		rsdtrm:{
			name:'剩余期限',
			value:{
					0:{name:'全部',truthy:true,value:''},
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
					0:{name:'全部',truthy:true,value:''},
					1:{name:'央企',truthy:false,value:'1'},
					2:{name:'国企',truthy:false,value:'2'},
					3:{name:'民企',truthy:false,value:'3'},
					99:{name:'其他',truthy:false,value:'99'},
				}
		},
		wrnt:{
			name:'担保',
			value:{
					0:{name:'全部',truthy:true,value:''},
					1:{name:'担保人',truthy:false,value:'1'},
					2:{name:'担保物',truthy:false,value:'2'},
					3:{name:'无担保',truthy:false,value:'3'},
				}
		},
		face:{
			name:'票息',
			value:{
					0:{name:'全部',truthy:true,value:''},
					1:{name:'浮息',truthy:false,value:'1'},
					2:{name:'固息',truthy:false,value:'2'},
				}
		},
		year:{
			"data":[
				{"label": "2017",'checked':false,'id':'2017', "children": []},
				{"label": "2016",'checked':false,'id':'2016', "children": []},
				{"label": "2015",'checked':false,'id':'2015', "children": []},
				{"label": "2014",'checked':false,'id':'2014', "children": []},
				{"label": "2013",'checked':false,'id':'2013', "children": []},
				{"label": "2012",'checked':false,'id':'2012', "children": []},
				{"label": "2011",'checked':false,'id':'2011', "children": []},
				{"label": "2010",'checked':false,'id':'2010', "children": []},
				{"label": "2009",'checked':false,'id':'2009', "children": []},
				{"label": "2008",'checked':false,'id':'2008', "children": []},
				{"label": "2007",'checked':false,'id':'2007', "children": []},
				{"label": "2006",'checked':false,'id':'2006', "children": []},
				{"label": "2005",'checked':false,'id':'2005', "children": []},
				{"label": "2004",'checked':false,'id':'2004', "children": []},
				{"label": "2003",'checked':false,'id':'2003', "children": []},
				{"label": "2002",'checked':false,'id':'2002', "children": []},
				{"label": "2001",'checked':false,'id':'2001', "children": []},
				{"label": "2000",'checked':false,'id':'2000', "children": []},
				{"label": "1999",'checked':false,'id':'1999', "children": []},
				{"label": "1998",'checked':false,'id':'1998', "children": []},
				{"label": "1997",'checked':false,'id':'1997', "children": []},
				{"label": "1996",'checked':false,'id':'1996', "children": []},
				{"label": "1995",'checked':false,'id':'1995', "children": []},
				{"label": "1994",'checked':false,'id':'1994', "children": []},
				{"label": "1993",'checked':false,'id':'1993', "children": []},
				{"label": "1992",'checked':false,'id':'1992', "children": []},
				{"label": "1991",'checked':false,'id':'1991', "children": []},
				{"label": "1990",'checked':false,'id':'1990', "children": []},
			]
		},
		section:{
			"data":[
				{"label": "农、林、牧、渔业",'checked':false,'id':'A', "children": [
					{"label": "农业",'checked':false,'id':'1', "children": false},
					{"label": "林业",'checked':false,'id':'2', "children": false},
					{"label": "畜牧业",'checked':false,'id':'3', "children": false},
					{"label": "渔业",'checked':false,'id':'4', "children": false},
					{"label": "农、林、牧、渔服务业",'checked':false,'id':'5', "children": false},
				]},
				{"label": "采矿业",'checked':false,'id':'B', "children": [
					{"label": "煤炭开采和洗选业",'checked':false,'id':'6', "children": false},
					{"label": "石油和天然气开采业",'checked':false,'id':'7', "children": false},
					{"label": "黑色金属矿采选业",'checked':false,'id':'8', "children": false},
					{"label": "有色金属矿采选业",'checked':false,'id':'9', "children": false},
					{"label": "非金属矿采选业",'checked':false,'id':'10', "children": false},
					{"label": "开采辅助活动",'checked':false,'id':'11', "children": false},
					{"label": "其他采矿业",'checked':false,'id':'12', "children": false},
				]},
				{"label": "制造业",'checked':false,'id':'C', "children": [
					{"label": "农副食品加工业",'checked':false,'id':'13', "children": false},
					{"label": "食品制造业",'checked':false,'id':'14', "children": false},
					{"label": "酒、饮料和精制茶制造业",'checked':false,'id':'15', "children": false},
					{"label": "烟草制品业 ",'checked':false,'id':'16', "children": false},
					{"label": "纺织业",'checked':false,'id':'17', "children": false},
					{"label": "纺织服装、服饰业",'checked':false,'id':'18', "children": false},
					{"label": "皮革、毛皮、羽毛及其制品和制鞋业",'checked':false,'id':'19', "children": false},

				]},
				{"label": "电力、热力、燃气及水生产和供应业",'checked':false,'id':'D', "children": false},
				{"label": "建筑业",'checked':false,'id':'E', "children": false},
				{"label": "批发和零售业",'checked':false,'id':'F', "children": false},
				{"label": "交通运输、仓储和邮政业",'checked':false,'id':'G', "children": false},
				{"label": "住宿和餐饮业",'checked':false,'id':'H', "children": false},
				{"label": "信息传输、软件和信息技术服务业",'checked':false,'id':'I', "children": false},
				{"label": "金融业",'checked':false,'id':'J', "children": false},
				{"label": "房地产业",'checked':false,'id':'K', "children": false},
				{"label": "租赁和商务服务业",'checked':false,'id':'L', "children": false},
				{"label": "科学研究和技术服务业",'checked':false,'id':'M', "children": false},
				{"label": "水利、环境和公共设施管理业",'checked':false,'id':'N', "children": false},
				{"label": "居民服务、修理和其他服务业",'checked':false,'id':'O', "children": false},
				{"label": "教育",'checked':false,'id':'P', "children": false},
				{"label": "卫生和社会工作",'checked':false,'id':'Q', "children": false},
				{"label": "文化、体育和娱乐业",'checked':false,'id':'R', "children": false},
				{"label": "公共管理、社会保障和社会组织",'checked':false,'id':'S', "children": false},
				{"label": "国际组织",'checked':false,'id':'T', "children": false},
			]
		},
		location: {
			"data":[
				{"label": "华东地区",'checked':false,'id':'1', "children": [
					{"label": "上海",'checked':false,'id':'11', "children": false},
					{"label": "江苏",'checked':false,'id':'12', "children": false},
					{"label": "安徽",'checked':false,'id':'13', "children": false},
					{"label": "浙江",'checked':false,'id':'14', "children": false},
					{"label": "山东",'checked':false,'id':'15', "children": false},
					{"label": "福建",'checked':false,'id':'16', "children": false},
					{"label": "江西",'checked':false,'id':'17', "children": false},
					{"label": "台湾",'checked':false,'id':'18', "children": false},
				]},
				{"label": "华北地区",'checked':false,'id':'2', "children": [
					{"label": "北京",'checked':false,'id':'21', "children": false},
					{"label": "天津",'checked':false,'id':'22', "children": false},
					{"label": "河北",'checked':false,'id':'23', "children": false},
					{"label": "山西",'checked':false,'id':'24', "children": false},
					{"label": "内蒙古",'checked':false,'id':'25', "children": false},

				]},
				{"label": "东北地区",'checked':false,'id':'3', "children": [
					{"label": "辽宁",'checked':false,'id':'31', "children": false},
					{"label": "吉林",'checked':false,'id':'32', "children": false},
					{"label": "黑龙江",'checked':false,'id':'33', "children": false},

				]},
				{"label": "华中地区",'checked':false,'id':'4', "children": [
					{"label": "河南",'checked':false,'id':'41', "children": false},
					{"label": "湖北",'checked':false,'id':'42', "children": false},
					{"label": "湖南",'checked':false,'id':'43', "children": false},

				]},
				{"label": "华南地区",'checked':false,'id':'5', "children": [
					{"label": "广东",'checked':false,'id':'51', "children": false},
					{"label": "广西",'checked':false,'id':'52', "children": false},
					{"label": "海南",'checked':false,'id':'53', "children": false},
					{"label": "香港",'checked':false,'id':'54', "children": false},
					{"label": "澳门",'checked':false,'id':'55', "children": false},

				]},
				{"label": "西南地区",'checked':false,'id':'6', "children": [
					{"label": "重庆",'checked':false,'id':'61', "children": false},
					{"label": "四川",'checked':false,'id':'62', "children": false},
					{"label": "云南",'checked':false,'id':'63', "children": false},
					{"label": "贵州",'checked':false,'id':'64', "children": false},
					{"label": "西藏",'checked':false,'id':'65', "children": false},

				]},
				{"label": "西北地区",'checked':false,'id':'7', "children": [
					{"label": "陕西",'checked':false,'id':'71', "children": false},
					{"label": "宁夏",'checked':false,'id':'72', "children": false},
					{"label": "甘肃",'checked':false,'id':'73', "children": false},
					{"label": "青海",'checked':false,'id':'74', "children": false},
					{"label": "新疆",'checked':false,'id':'75', "children": false},

				]},
			]
		}


	}
}]);
