class AcoupondetailsController {
	constructor(acoupondetailsService, $state, $stateParams, $uibModal, $mdDialog, pagetabService, NetBondquotationService) {
		"ngInject";
		this.name = 'acoupondetails';
		this.acoupondetailsService = acoupondetailsService;
		this.NetBondquotationService = NetBondquotationService;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		this.$mdDialog = $mdDialog;
		this.pagetabService = pagetabService;
		this.queryBondBaseInfos = {
			bondid: "this.$stateParams.bondid"
		};
		
		this.bads = [];
		this.list = '';
		// 发行信息
		this.info = [];
		this.bond_id = '';
		this.creditInfo = [];
		this.customSelected = '';
		this.searchBondBreedInfo = {
			keyword: '',
		}

		this.nameAll = '';

		this.bond = {
				tabKey: 'home.acoupondetails',
				routeState: "home.acoupondetails",
				routeLabel: '',
				
			}
			// 债券代码或简称模糊搜索

		this.article_one = '';
		this.article_one_content = '';
		this.article_two = '';
		this.article_two_content = '';

	}

	$onInit() {
		this.target = false;
		this.target1 = false;
		// 债券代码或简称
		this.dics = false;
		//好友
		this.tag == false;
		// 群主
		this.gruop == false;

		// 初始化函数
		this.queryBondBaseInfo(this.$stateParams.bondid);
		// 初始化我的好友列表

		// 简介
		this.jianjie=false;
		this.fanwei=false;

	}
	openCalculator(list) {
		this.NetBondquotationService.openCalculator(this.list);
		// let that =this;
		// that.dataForModal ={
		// 	itemInfo:{
		// 		bondCd:'',
		// 		num:'',
		// 		netprc:'',

		// 		yldrto:'',
		// 	}
		// }
		// that.$uibModal.open({
		// 	animation: that.animationsEnabled,
		// 	component:'bondTrial',
		// 	windowClass:'my-bond-trial',
		// 	size: 'xs',//'lg',//'sm',
		// 	resolve: {
		// 		modalData:function(){

		// 			that.dataForModal['itemInfo'] =list;
		// 			return  that.dataForModal;
		// 		}
		// 	}
		// }).result.then(function (selectedItem) {
		// 	// that.selected = selectedItem;
		// 	// let tmplist = that.dataForModal.quoteList;
		// 	// that.quoteListChecked =[];//清空数组
		// 	// tmplist.forEach(function(item,index){
		// 	// 		that.quoteListChecked.push({
		// 	// 			'bondid':item.bondid,
		// 	// 			'drc':item.drc,
		// 	// 			'num':item.num,
		// 	// 			'yldrto':item.yield,
		// 	// 			'netprc':item.netprc,
		// 	// 			'wthrAnon':item.wthrAnon,
		// 	// 			'wthrListg':item.wthrAnon,
		// 	// 			'rmrk':item.remark
		// 	// 		});
		// 	},that);
	}



	// 详情信息

	queryBondBaseInfo(id) {
			this.queryBondBaseInfos.bondid = id||sessionStorage.getItem('bondid');
			console.log(this.queryBondBaseInfos);
			sessionStorage.setItem('bondid',this.queryBondBaseInfos.bondid);
			console.log(sessionStorage.getItem('bondid'));
			let promise = this.acoupondetailsService.detailInfo(this.queryBondBaseInfos);
			promise.then((res) => {
				console.log(res);
				// console.log(res.data);
				// console.log(res.data.data.issueInfos);
				if (res.data) {
					if (res.data.status == '0') {

						if (res.data.data) {
							res.data.data.issueAmount = res.data.data.issueAmount / 100000000;

							// .toFixed()表示保留小数点位数
							res.data.data.rsdtrm = parseFloat(res.data.data.rsdtrm).toFixed(2);
							if (res.data.data.bondRate == '--') {
								res.data.data.bondRate = res.data.data.bondRate;
							} else {
								res.data.data.bondRate = parseFloat((res.data.data.bondRate) * 100).toFixed(2);
							}

						}
						// this.list.push(res.data.data);
						this.nameAll = res.data.data.marketType;
						if (this.nameAll == "银行间") {
							this.nameAll = "IB";
						} else if (this.nameAll == "沪市") {
							this.nameAll = "SH";
						} else if (this.nameAll == "深市") {
							this.nameAll = "SZ";
						}
						this.list = res.data.data;
						console.log(this.list);
						this.bond_id = this.list.bondCd;
						// if(res.data.data.issueInfoDtos[0].scope=='--'){
						// 	this.target=false;
						// }else {
						// 	this.target=true;
						// }
						// if(res.data.data.issueInfoDtos[0].profile=='--'){
						// 	this.target1=false;
						// }else {
						// 	this.target1=true;
						// }
						this.info = res.data.data.issueInfoDtos;
						if(this.info[0].scope=='--'){
							this.jianjie=false;
						}else if(this.info[0].scope!='--'){
							this.jianjie=true;
						}
						if(this.info[0].profile=='--'){
							this.fanwei=false;
						}else if(this.info[0].profile!='--'){
							this.fanwei=true;
						}	
							


						// this.article_one=this.info[0].scope.substring(0,200);
						// this.article_one_content=this.info[0].scope.substring(200);
						// this.article_two=this.info[0].profile.substring(0,200);
						// this.article_two_content=this.info[0].profile.substring(200);
						console.log(this.bond_id);
						// 存在循环表格数据

						this.creditInfo = res.data.data.issueInfoDtos[0].creditInfoDtos;

						this.activeTab1();
					} else {

					}
				} else {
					alert(res.msg)
				}
				// console.log(this.list);
				// console.log(this.info);
				// console.log(this.creditInfo);


			}, (data) => {

				this.activeTab1();
			});
		}
		// 债券搜索   模糊查询
	queryQuoteList(val) {
			this.bads = [];
			// console.log(val)
			// this.searchBondBreedInfo.keyWord = val;
			// console.log(this.searchBondBreedInfo);
			// console.log(this.customSelected)
			if (this.searchBondBreedInfo.keyword == '') {
				this.dics = false;
				this.queryBondBaseInfos.bondid = '';
			} else if (this.searchBondBreedInfo.keyword || this.searchBondBreedInfo.keyword.length > 0) {
				this.dics = true;
			}
			let promise = this.acoupondetailsService.searchBondBreed(this.searchBondBreedInfo);
			return promise.then((res) => {
				console.log(res)
				if (res.data) {
					// if(res.data.data ){
					console.log(res.data.data)
						// 加

					for (var i = 0; i < res.data.data.length; i++) {

						var obj = {
							"name": res.data.data[i].bondCd + '/' + res.data.data[i].bondShrtnm,
							"id": res.data.data[i].bondid
						};


						this.bads.push(obj);
						// if( this.bads.length>0){
						// 	this.dics=true;
						// }else{
						// 	this.dics=false;
						// }

						console.log(this.bads);

					}

				}

			}, (data) => {

			});

		}
		// 查询
	search(item) {
			console.log(item);
			this.searchBondBreedInfo.keyword = item.name;
			this.queryBondBaseInfos.bondid = item.id;

			this.dics = false;
			this.queryBondBaseInfo(item.id);


			// console.log(this.customSelected)
		}
		// 展开、收起
	doCheck() {
		this.target = !this.target;
		var bx = document.getElementById("box");
		console.log(this.target);

	}
	doCheck1() {
			this.target1 = !this.target1;
			var bx = document.getElementsByClassName("box");
			console.log(this.target1);

		}
		// 关闭搜索
	searchCloce() {
			var inp = document.getElementById("ip");
			inp.value = "";
			// inp.placeholder="16国开10";
			console.log(inp);
		}
		// **********************
	activeTab1() {
		this.bond.routeLabel = this.list.bondShrtnm;
		this.pagetabService.activeTab(this.bond);
	}

}