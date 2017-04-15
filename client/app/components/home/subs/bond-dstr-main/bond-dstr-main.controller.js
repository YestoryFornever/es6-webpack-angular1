class BondDstrMainController {
	constructor(
		$http,
		$scope,
		$rootScope,
		$state,
		$uibModal,
		BondDstrMainService,
		userStatusService
	){
		"ngInject";
		this.$http = $http;
		this.$state = $state;
		this.$uibModal = $uibModal;
		this.BondDstrMainService = BondDstrMainService;
		this.userStatusService = userStatusService;

		this.name = 'bond-dstr-main';
		this.single = '115202';
		this.multiple = ['115202','108701'];
		this.pubReportData = {};
		this.subSttstcs = {
			/*am:'3.3',
			mm:'2.1',
			my:'0.044',
			tet:new Date().getTime()*/
		};
		this.cusSttstcs = {
			sbrbTnum:'',
			sbrbIntrt:'',
			whlTmsNum:'',
			bdyTmsNum:'',
			bdyIntrt:''
		};
		this.leader = {//当前团队负责人
			userId:this.userStatusService.uid,
			userNm:this.userStatusService.userName
		};
		this.mine = {
			fields:[],
			query:{},
			items:[],
			curItemIndex:0,
			emptyObj:{
				createTime:new Date,
				dlvTp:1,//交割方式(1上市2分销)
				rcptySbrbEStatus:4,
				rcptyUserNm:this.userStatusService.userName,
				rmrk:"",//备注
				sbrbChnl:1,//申购渠道(1平台2QQ3微信4录入)
				sbrbIntrt:0.01,//利率(单位0.01)
				sbrbNum:1000000,//申购量(单位元)
				sellrMod:1,//销售方式(1折返2单反)
				sndrInstId:undefined,//发送方机构id
				sndrInstNm:"",//发送方机构
				sndrTeamId:undefined,//发送方团队id
				sndrTeamNm:"",//发送方团队
				sndrUserId:undefined,//发送方用户id
				sndrUserNm:"",//发送方用户
				name:""
			}
		};
		this.tabFlag = 'm';
		this.bools={
			showMineTable:false
		}
		this.lists = {
			fields:[],
			query:{},
			items:[],
			page:{},
			curItemIndex:0
		};
		this.mineB = {
			fields:[],
			query:{},
			items:[],
			curItemIndex:0,
			showMineTable:false,
			emptyObj:{
				createTime:new Date,
				dlvTp:1,//交割方式(1上市2分销)
				rcptySbrbEStatus:4,
				rcptyUserNm:this.userStatusService.userName,
				rmrk:"",//备注
				sbrbChnl:1,//申购渠道(1平台2QQ3微信4录入)
				sbrbIntrt:0.01,//利率(单位0.01)
				sbrbNum:1000000,//申购量(单位元)
				sellrMod:1,//销售方式(1折返2单反)
				sndrInstId:undefined,//发送方机构id
				sndrInstNm:"",//发送方机构
				sndrTeamId:undefined,//发送方团队id
				sndrTeamNm:"",//发送方团队
				sndrUserId:undefined,//发送方用户id
				sndrUserNm:"",//发送方用户
				name:""
			}
		};
		this.listsB = {
			fields:[],
			query:{},
			items:[],
			page:{},
			curItemIndex:0
		};
		this.ids = {
			issuId:'',
			dstrBondId:''
		};
	}
	$onInit(){
		this.getState();
		this.getBondSbrbStat();
		this.getCustSbrbStat();
		this.getPnp();
		this.getCustSbrbList();
		this.getCustSbrbWinbidList();
		this.initListAD();
		this.initListA();
		this.initListBD();
		this.initListB();
	}
	toggleMsgTab(key){
		this.tabFlag=key;
	}
	getState(){
		this.ids.dstrBondId = this.$state.params.dstrBondId;
		this.ids.issuId = this.$state.params.issuId;
	}
	publishSubscribe(){//发布
		this.pubReportData = {
			ids:this.ids
		};
		let that = this;
		var modalInstance = that.$uibModal.open({
			animation: true,
			component:'pubReportDialog',
			windowClass:'pub-report-dialog',
			size: 'g lg',//'sm',
			resolve: {
				modalData:function(){
					return that.pubReportData;
				}
			}
		}).result.then(function (res) {
			console.info('报价窗口关闭');
		}, function () {
			console.info('报价窗口关闭');
		});
	}
	getBondSbrbStat(){//获取债券申购统计
		this.BondDstrMainService.getBondSbrbStat({
			issuId:this.ids.issuId
		})
		.then(
			data=>{
				let rslt = data.data.data;
				// debugger;
				this.subSttstcs = {
					am:rslt.whlTmsNum,
					mm:rslt.bdyTmsNum,
					my:rslt.bdyIntrt,
					tet:new Date(rslt.clsbidTmL)
				};
			},
			err=>console.warn(err)
		);
	}
	getCustSbrbStat(){//获取客户申购统计
		this.BondDstrMainService.getCustSbrbStat({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
		})
		.then(
			data=>{
				let rslt = data.data.data;
				this.cusSttstcs = {
					sbrbTnum:rslt.sbrbTnum,
					sbrbIntrt:rslt.sbrbIntrt,
					whlTmsNum:rslt.whlTmsNum,
					bdyTmsNum:rslt.bdyTmsNum,
					bdyIntrt:rslt.bdyIntrt
				}
			},
			err=>console.warn(err)
		);
	}
	immClsBid(){
		this.BondDstrMainService.immClsBid({
			issuId:this.ids.issuId,
		})
		.then(
			data=>{
				console.log(data.data)
			},
			err=>console.warn(err)
		);
	}
	getPnp(){//获取负责人
		this.BondDstrMainService.getPnp({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
		})
		.then(
			data=>{
				let rslt = data.data.data;
				this.leader = rslt;
			},
			err=>console.warn(err)
		);
	}
	updatePnp(){//更新负责人
		this.BondDstrMainService.updatePnp({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
		})
		.then(
			data=>{
				alert(data.data.msg);
				this.leader = {
					userId:this.userStatusService.uid,
					userNm:this.userStatusService.userName
				};
			},
			err=>console.warn(err)
		);
	}
	getCustSbrbList(){//获取客户申购列表
		this.BondDstrMainService.getCustSbrbList({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			pageNum:'1',
			pageSize:'20'
		})
		.then(
			data=>{
				let rslt = data.data.data;
				console.log(rslt)
				this.lists.items = rslt.list;
				this.lists.page = rslt.page;
			},
			err=>console.warn(err)
		);
	}
	getCustSbrbWinbidList(){//获取客户申购列表
		this.BondDstrMainService.getCustSbrbList({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			pageNum:'1',
			pageSize:'20'
		})
		.then(
			data=>{
				let rslt = data.data.data;
				this.listsB.items = rslt.list;
				this.listsB.page = rslt.page;
			},
			err=>console.warn(err)
		);
	}
	addCustSbrb(){
		let tmparr = [];
		switch(this.tabFlag){
			case 'm':
				tmparr = angular.copy(this.mine.emptyObj);
				break;
			case 'b':
				tmparr = angular.copy(this.mineB.emptyObj);
				break;
		}
		this.BondDstrMainService.addCustSbrb({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			bondSbrbVOList:tmparr
		})
		.then(data=>{
				let rslt = data.data.data;
				console.log(rslt);
				this.getCustSbrbList();
			},
			err=>console.warn(err)
		);
	}
	getSndrInstTeamUserList(val){
		return this.BondDstrMainService.getSndrInstTeamUserList({
			issuId:this.ids.issuId,
			dstrBondId:this.ids.dstrBondId,
			enqrVal:val||null
		})
		.then(data=>{
				let rslt = data.data.data;
				return rslt;
			},
			err=>console.warn(err)
		);
	}
	_getCUST(){
		let self = this;
		return function(){
			return self;
		}
	}
	selectRequisitioner(item,index){
		this.mine.items[this.mine.curItemIndex].sndrInstId = item.instId;
		this.mine.items[this.mine.curItemIndex].sndrInstNm = item.instNm;
		this.mine.items[this.mine.curItemIndex].sndrName = item.name;
		this.mine.items[this.mine.curItemIndex].sndrTeamId = item.teamId;
		this.mine.items[this.mine.curItemIndex].sndrTeamNm = item.teamNm;
		this.mine.items[this.mine.curItemIndex].sndrUserId = item.userId;
		this.mine.items[this.mine.curItemIndex].sndrUserNm = item.userNm;
	}
	mineTableInit(){
		this.bools.showMineTable = true;
		switch(this.tabFlag){
			case 'm':
				if(this.mine.items.length<1){
					this.addNewRow();
				}
				break;
			case 'b':
				if(this.mineB.items.length<1){
					this.addNewRow();
				}
				break;
		}
	}
	addNewRow(){
		switch(this.tabFlag){
			case 'm':
				this.mine.items.push(angular.copy(this.mine.emptyObj));
				break;
			case 'b':
				this.mineB.items.push(angular.copy(this.mineB.emptyObj));
				break;
		}
		
	}
	initListAD(){
		this.mine.items.CUST = this._getCUST()();
		this.mine.fields = [
			{
				label: '',
				tdClass:'td-class-1',
				thClass:'th-class-1',
				template: '<span></span>',
			},
			{
				label: '申购人',
				tdClass:'td-class-2',
				thClass:'th-class-2',
				template: `
					<span>
						<input
							ng-model="$item.name"
							uib-typeahead="item as item.name for item in items.CUST.getSndrInstTeamUserList($viewValue)"
							typeahead-template-url="templates/requisitioner.html"
							typeahead-on-select = "items.CUST.selectRequisitioner($item,$index)"
							placeholder="..." type="text"/>
						}
					</span>`,
				/*tdClick: function($item,ev){
					console.log($item);
				}*/
			},
			{
				label: '利率(%)',
				tdClass:'td-class-3',
				thClass:'th-class-3',
				template: '<span><input ng-model="$item.sbrbIntrt"/></span>',
			},
			{
				label: '申购量(亿)',
				tdClass:'td-class-4',
				thClass:'th-class-4',
				template: '<span><input ng-model="$item.sbrbNum"/></span>',
			},
			{
				label: '交割方式',
				tdClass:'td-class-5',
				thClass:'th-class-5',
				template: `
					<span>
						<select ng-model="$item.dlvTp" name="dlvTp">
							<option value="1" ng-selected="$item.dlvTp=='1'">上市</option>
							<option value="2" ng-selected="$item.dlvTp=='2'">分销</option>
						</select>
					</span>`,
			},
			{
				label: '销售方式',
				tdClass:'td-class-6',
				thClass:'th-class-6',
				template: `
					<span>
						<select ng-model="$item.sellrMod" name="sellrMod">
							<option value="1" ng-selected="$item.sellrMod=='1'">折价</option>
							<option value="2" ng-selected="$item.sellrMod=='2'">单返</option>
						</select>
					</span>`,
			},
			{
				label: '申购状态',
				tdClass:'td-class-7',
				thClass:'th-class-7',
				template: '<span>{{$item.rcptySbrbEStatus|applicationState}}</span>',
			},
			{
				label: '申购渠道',
				tdClass:'td-class-8',
				thClass:'th-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'td-class-9',
				thClass:'th-class-9',
				template: '<span>{{$item.createTime|date:"MM-dd HH:mm"}}</span>',
			},
			{
				label: '联系人',
				tdClass:'td-class-10',
				thClass:'th-class-10',
				template: '<span>{{$item.rcptyUserNm}}</span>',
			},
			{
				label: '备注',
				tdClass:'td-class-11',
				thClass:'th-class-11',
				template: '<span><input ng-model="$item.rmrk"/></span>',
			},
			{
				label: '',
				tdClass:'td-class-12',
				thClass:'th-class-12',
				template: '<span></span>',
			}
		];
	}
	initListA(){
		this.lists.fields = [
			{
				label: '',
				tdClass:'td-class-1',
				thClass:'th-class-1',
				template: '<span></span>',
			},
			{
				label: '申购人',
				tdClass:'td-class-2',
				thClass:'th-class-2',
				thNgHide:function(){
					return false? true : false;
				},
				template: "<span>{{$item.sndrInstNm}}-{{$item.sndrTeamNm}}-{{$item.sndrUserNm}}</span>",
				thClick: function(){
					//
				},
				thNgClass: function($item){
					return {}
				},
				tdClick: function($item,ev){// 关注
					//
				}
			},
			{
				label: '利率(%)',
				tdClass:'td-class-3',
				thClass:'th-class-3',
				template: '<span>{{$item.sbrbIntrt}}</span>',
			},
			{
				label: '申购量(亿)',
				tdClass:'td-class-4',
				thClass:'th-class-4',
				template: '<span>{{$item.sbrbNum|numChangeYiFilter}}</span>',
			},
			{
				label: '交割方式',
				tdClass:'td-class-5',
				thClass:'th-class-5',
				template: '<span>{{$item.dlvTp|applicationTransaction}}</span>',
			},
			{
				label: '销售方式',
				tdClass:'td-class-6',
				thClass:'th-class-6',
				template: '<span>{{$item.sellrMod|applicationSale}}</span>',
			},
			{
				label: '申购状态',
				tdClass:'td-class-7',
				thClass:'th-class-7',
				template: '<span>{{$item.rcptySbrbEStatus|applicationState}}</span>',
			},
			{
				label: '申购渠道',
				tdClass:'td-class-8',
				thClass:'th-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'td-class-9',
				thClass:'th-class-9',
				template: '<span>{{$item.createTime}}</span>',
			},
			{
				label: '联系人',
				tdClass:'td-class-10',
				thClass:'th-class-10',
				template: '<span>{{$item.rcptyUserNm}}</span>',
			},
			{
				label: '备注',
				tdClass:'td-class-11',
				thClass:'th-class-11',
				template: '<span>{{$item.rmrk}}</span>',
			},
			{
				label: '',
				tdClass:'td-class-12',
				thClass:'th-class-12',
				template: '<span></span>',
			}
		];
	}
	initListBD(){
		this.mineB.items.CUST = this._getCUST()();
		this.mineB.fields = [
			{
				label: '',
				tdClass:'tdb-class-1',
				thClass:'thb-class-1',
				template: '<span></span>',
			},
			{
				label: '申购人',
				tdClass:'tdb-class-2',
				thClass:'thb-class-2',
				template: `
					<span>
						<input
							ng-model="$item.name"
							uib-typeahead="item as item.name for item in items.CUST.getSndrInstTeamUserList($viewValue)"
							typeahead-template-url="templates/requisitioner.html"
							typeahead-on-select = "items.CUST.selectRequisitioner($item,$index)"
							placeholder="..." type="text"/>
						}
					</span>`,
				/*tdClick: function($item,ev){
					console.log($item);
				}*/
			},
			{
				label: '利率(%)',
				tdClass:'tdb-class-3',
				thClass:'thb-class-3',
				template: '<span><input ng-model="$item.sbrbIntrt"/></span>',
			},
			{
				label: '申购量(亿)',
				tdClass:'tdb-class-4',
				thClass:'thb-class-4',
				template: '<span><input ng-model="$item.sbrbNum"/></span>',
			},
			{
				label: '交割方式',
				tdClass:'tdb-class-5',
				thClass:'thb-class-5',
				template: `
					<span>
						<select ng-model="$item.dlvTp" name="dlvTp">
							<option value="1" ng-selected="$item.dlvTp=='1'">上市</option>
							<option value="2" ng-selected="$item.dlvTp=='2'">分销</option>
						</select>
					</span>`,
			},
			{
				label: '销售方式',
				tdClass:'tdb-class-6',
				thClass:'thb-class-6',
				template: `
					<span>
						<select ng-model="$item.sellrMod" name="sellrMod">
							<option value="1" ng-selected="$item.sellrMod=='1'">折价</option>
							<option value="2" ng-selected="$item.sellrMod=='2'">单返</option>
						</select>
					</span>`,
			},
			{
				label: '申购状态',
				tdClass:'tdb-class-7',
				thClass:'thb-class-7',
				template: '<span>{{$item.rcptySbrbEStatus|applicationState}}</span>',
			},
			{
				label: '申购渠道',
				tdClass:'tdb-class-8',
				thClass:'thb-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'tdb-class-9',
				thClass:'thb-class-9',
				template: '<span>{{$item.createTime|date:"MM-dd HH:mm"}}</span>',
			},
			{
				label: '联系人',
				tdClass:'tdb-class-10',
				thClass:'thb-class-10',
				template: '<span>{{$item.rcptyUserNm}}</span>',
			},
			{
				label: '备注',
				tdClass:'tdb-class-11',
				thClass:'thb-class-11',
				template: '<span><input ng-model="$item.rmrk"/></span>',
			},
			{
				label: '中标状态',
				tdClass:'tdb-class-12',
				thClass:'thb-class-12',
				template: '<span>{{$item.winbidEStatus}}</span>',
			},
			{
				label: '中标量(亿)',
				tdClass:'tdb-class-13',
				thClass:'thb-class-13',
				template: '<span>{{$item.winbidNum}}</span>',
			},
			{
				label: '待分配(亿)',
				tdClass:'tdb-class-14',
				thClass:'thb-class-14',
				template: '<span></span>',
			},
			{
				label: '票面利率(%)',
				tdClass:'tdb-class-15',
				thClass:'thb-class-15',
				template: '<span>{{$item.winbidIntrt}}</span>',
			},
			{
				label: '发送状态',
				tdClass:'tdb-class-16',
				thClass:'thb-class-16',
				template: '<span>{{$item.sndrEStatus}}</span>',
			}
		];
	}
	initListB(){
		this.listsB.fields = [
			{
				label: '',
				tdClass:'tdb-class-1',
				thClass:'thb-class-1',
				template: '<span></span>',
			},
			{
				label: '申购人',
				tdClass:'tdb-class-2',
				thClass:'thb-class-2',
				thNgHide:function(){
					return false? true : false;
				},
				template: "<span>{{$item.sndrInstNm}}-{{$item.sndrTeamNm}}-{{$item.sndrUserNm}}</span>",
				thClick: function(){
					//
				},
				thNgClass: function($item){
					return {}
				},
				tdClick: function($item,ev){// 关注
					//
				}
			},
			{
				label: '利率(%)',
				tdClass:'tdb-class-3',
				thClass:'thb-class-3',
				template: '<span>{{$item.sbrbIntrt}}</span>',
			},
			{
				label: '申购量(亿)',
				tdClass:'tdb-class-4',
				thClass:'thb-class-4',
				template: '<span>{{$item.sbrbNum|numChangeYiFilter}}</span>',
			},
			{
				label: '交割方式',
				tdClass:'tdb-class-5',
				thClass:'thb-class-5',
				template: '<span>{{$item.dlvTp|applicationTransaction}}</span>',
			},
			{
				label: '销售方式',
				tdClass:'tdb-class-6',
				thClass:'thb-class-6',
				template: '<span>{{$item.sellrMod|applicationSale}}</span>',
			},
			{
				label: '申购状态',
				tdClass:'tdb-class-7',
				thClass:'thb-class-7',
				template: '<span>{{$item.rcptySbrbEStatus|applicationState}}</span>',
			},
			{
				label: '申购渠道',
				tdClass:'tdb-class-8',
				thClass:'thb-class-8',
				template: '<span>{{$item.sbrbChnl|applicationChanel}}</span>',
			},
			{
				label: '申购时间',
				tdClass:'tdb-class-9',
				thClass:'thb-class-9',
				template: '<span>{{$item.createTime}}</span>',
			},
			{
				label: '联系人',
				tdClass:'tdb-class-10',
				thClass:'thb-class-10',
				template: '<span>{{$item.rcptyUserNm}}</span>',
			},
			{
				label: '备注',
				tdClass:'tdb-class-11',
				thClass:'thb-class-11',
				template: '<span>{{$item.rmrk}}</span>',
			},
			{
				label: '中标状态',
				tdClass:'tdb-class-12',
				thClass:'thb-class-12',
				template: '<span>{{$item.winbidEStatus}}</span>',
			},
			{
				label: '中标量(亿)',
				tdClass:'tdb-class-13',
				thClass:'thb-class-13',
				template: '<span>{{$item.winbidNum}}</span>',
			},
			{
				label: '待分配(亿)',
				tdClass:'tdb-class-14',
				thClass:'thb-class-14',
				template: '<span></span>',
			},
			{
				label: '票面利率(%)',
				tdClass:'tdb-class-15',
				thClass:'thb-class-15',
				template: '<span>{{$item.winbidIntrt}}</span>',
			},
			{
				label: '发送状态',
				tdClass:'tdb-class-16',
				thClass:'thb-class-16',
				template: '<span>{{$item.sndrEStatus}}</span>',
			}
		];
	}
}
