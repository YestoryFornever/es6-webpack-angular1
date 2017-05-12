class NewdebtinformationdetailsController {
	constructor(newdebtinformationdetailsService, $scope, $state, $stateParams,healdCalculatorService, $uibModal, $mdDialog, pagetabService, NewdebtdialogModalService, netCastService) {
		"ngInject";
		this.name = 'newdebtinformationdetails';
		this.newdebtinformationdetailsService = newdebtinformationdetailsService;
		this.healdCalculatorService = healdCalculatorService;
		this.NewdebtdialogModalService = NewdebtdialogModalService;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		this.$mdDialog = $mdDialog;
		this.$state= $state;
		this.netCastService = netCastService;
		this.pagetabService = pagetabService;
		// 4.1.2获取债券横条信息(发行信息)
		this.getBondBarInfos_info = {
			userId: BONDCONFIG.USERINFO.uid,
			issuId: this.$stateParams.issuId
		};
		this.newobj_one = {};
		this.newobj_two = {};
		this.newobj_three = {};
		//获取债券基本信息
		this.newdata_one = [];
		this.aachange = {

		};
		//获取承销团列表
		this.newdata_chengxiao = [];
		// 4.1.5获取债券日历
		this.getBondCdrs_info = {};
		// 4.5.2获取分销好友列表
		this.debtinfriend_info = {
			userId: BONDCONFIG.USERINFO.uid,
			issuId: this.$stateParams.issuId,
			dstrBondId: this.$stateParams.dstrBondId
		};
		this.debtinfriendList = [];
		this.yeqian_header='';
		this.liveBond_info={
			bondID: this.$stateParams.dstrBondId
		}
		this.liveBond_id={};
		this.liveBond_lid = '';

		this.pagetabService.activeTab({
			tabKey: 'home.newdebtinformationdetails',
			routeState: this.$state.$current.name,
			routeParams: angular.copy(this.$stateParams),
			routeLabel: '……'
		});
	}

	$onInit() {
			this.tanchuangflag = false; //控制承销团弹窗

			// 初始化函数
			// this.queryBondBaseInfo(this.$stateParams.bondid);
			// 初始化我的好友列表
			console.log(this.$stateParams.issuId);
			// 简介
			this.jianjie = false;
			this.fanwei = false;
			this.aaaaa=false;
			this.getBondBarInfos();
			this.getBondDetails();
			this.getUwrtGrpLists();
			this.getIssuerInfos();
			this.getBondCdrs();
			this.getDstrFriendLists();
			this.liveBonds();

		}
		//调用弹窗
	openNewdebtdialog(list) {
			this.NewdebtdialogModalService.openDialog(this.list);
		}
		// 4.1.7获取债券横条信息(发行信息)
	getBondBarInfos() {
			let promise = this.newdebtinformationdetailsService.getBondBarInfo(this.getBondBarInfos_info);
			promise.then((res) => {
				if (res.data) {
					this.newobj_one = res.data.data;
					// if(this.newobj_one.bondNm){
					// 	if(this.newobj_one.bondNm.length>14){
					// 		this.newobj_one.bondNm = this.newobj_one.bondNm.substring(0,14);
					// 	}
					// }
					// if(this.newobj_one.issuNum){
					// 	this.newobj_one.issuNum = this.newobj_one.issuNum/100000000;
					// }

					this.yeqian_header = this.newobj_one.bondNm;
					this.pagetabService.activeTab({
						tabKey: 'home.newdebtinformationdetails',
						routeLabel: this.newobj_one.bondNm
					});
				}
			});
		}
		//直播接口
	liveBonds() {
		// if(this.getBondBarInfos_info.bondID){
			let promise = this.newdebtinformationdetailsService.liveBond(this.liveBond_info);
			promise.then((res) => {
				if (res.data) {
					this.liveBond_lid = res.data.data;
					console.log(this.liveBond_lid);
					if(this.liveBond_lid!=0){
						this.enterLives();
					}
					
				}
			});
		// }
		
	}
		// 4.2.2进入直播
	enterLives() {
		// if(this.liveBond_lid){
			let promise = this.newdebtinformationdetailsService.enterLive({
			live_id:this.liveBond_lid,
			uid:BONDCONFIG.USERINFO.uid,
			user_role:1
			});
			promise.then((res) => {
				if (res.data) {
					this.liveBond_id = res.data.data;
					console.log(this.liveBond_id);

				}
			});
		// }
		
	}

		clickEnterLive(){
			// this.liveBonds();
			// ui-sref="home.cast({lid:$ctrl.liveBond_id.lid,state:$ctrl.liveBond_id.state})"
			this.$state.go('home.cast',{lid:this.liveBond_id.lid,state:this.liveBond_id.state});
	
		}

		//获取债券基本信息
	getBondDetails() {
		let promise = this.newdebtinformationdetailsService.getBondDetail(this.getBondBarInfos_info);
		promise.then((res) => {
			if (res.data) {
				// console.log(res);
				// if(res.data.data.issuNum){
				// 	res.data.data.issuNum = res.data.data.issuNum/100000000;
				// }
				this.newobj_two = res.data.data;
				
			}
			// console.log(this.newobj_two);
		});
	}

	// 点击承销团出现弹窗
	opendialog() {
			this.tanchuangflag = !this.tanchuangflag;
		}
		// 点击承销团内容弹窗消失
	canceldialog() {
			this.tanchuangflag = false;
		}
		// 4.1.6获取承销团列表
	getUwrtGrpLists() {
			let promise = this.newdebtinformationdetailsService.getUwrtGrpList(this.getBondBarInfos_info);
			promise.then((res) => {
				if (res.data) {
					console.log(res);
					this.newdata_chengxiao = res.data.data;
				}
				// console.log(this.newobj_two);
			});
		}
		// 4.1.4获取债券发行人信息(暂无接口数据)
	getIssuerInfos() {
			let promise = this.newdebtinformationdetailsService.getIssuerInfo(this.getBondBarInfos_info);
			promise.then((res) => {
				if (res.data) {
					this.newobj_three =res.data.data;
					console.log(this.newobj_three);
				}
				// console.log(this.newobj_two);
			});
		}
		// 4.1.5获取债券日历
	getBondCdrs() {
			let promise = this.newdebtinformationdetailsService.getBondCdr(this.getBondBarInfos_info);
			promise.then((res) => {
				if (res.data) {
					this.getBondCdrs_info = res.data.data;
					// console.log(res);
				}

			});
		}
		// 4.5.2获取分销好友列表
	getDstrFriendLists() {
			let promise = this.newdebtinformationdetailsService.getDstrFriendList(this.debtinfriend_info);
			promise.then((res) => {
				if (res.data) {
					console.log(res);
					for (var i in res.data.data) {
						if (res.data.data[i].realNmCtfnEStatus == '3') {
							res.data.data[i].realNmCtfnEStatus = "实名认证";
						} else if (res.data.data[i].realNmCtfnEStatus == '0') {
							res.data.data[i].realNmCtfnEStatus = "未认证";
						} else if (res.data.data[i].realNmCtfnEStatus == '1') {
							res.data.data[i].realNmCtfnEStatus = "认证中";
						}
					}
					this.debtinfriendList = res.data.data;
					console.log(this.debtinfriendList);
				}
			});
		}
		//这些好友在分销此债券的弹窗
	friendtipDialog(list) {
		this.aaaaa=true;
		console.log(this.aaaaa);
		// $('.shengoudialog').show();
		this.aachange = list;
		this.aachange.issuId = this.$stateParams.issuId;
		this.aachange.dstrBondId = this.$stateParams.dstrBondId
	}
	closefriendtipDialog() {
		// $('.shengoudialog').hide();
		this.aaaaa=false;
	}
	//申购助手跳转
			//1:主承
			// 2:联承
			// 3:在团
			// 4:不在团
			// 5:投资
	jumpTo(roleId){
		// debugger;
		if(roleId=='1'){//则进入申购助手-”主承商“页面；
			this.$state.go('home.newdebtinformationdetails.bond-dstr-main',{dstrBondId:this.$stateParams.dstrBondId,issuId:this.$stateParams.issuId,trm:this.newobj_one.trm});
			return;
		}else if(roleId=='2'||roleId=='3'||roleId=='4'){//则进入申购助手-”分销商页面；
			this.$state.go('home.newdebtinformationdetails.distributor',{dstrBondId:this.$stateParams.dstrBondId,issuId:this.$stateParams.issuId,roleId:roleId,trm:this.newobj_one.trm});
			return;
		}else if(roleId=='5'){
			this.$state.go('home.newdebtinformationdetails.investor',{dstrBondId:this.$stateParams.dstrBondId,issuId:this.$stateParams.issuId,trm:this.newobj_one.trm});
			return;
				// if(alrdySbrbInd){//已申购标识存在 进入投资者页面
				// 	$state.go('home.investor',{dstrBondId:this.$stateParams.dstrBondId,issuId:this.$stateParams.issuId,trm:this.newobj_one.trm});
				// }else{//默认进入债券详情页面
				// 	$state.go('home.newdebtinformationdetails',{dstrBondId:this.$stateParams.dstrBondId,issuId:this.$stateParams.issuId,trm:this.newobj_one.trm});
				// }
			
		}
	}
	//资料详情跳转
	jumpTodetail(){
		this.$state.go('home.newdebtinformationdetails',{dstrBondId:this.$stateParams.dstrBondId,issuId:this.$stateParams.issuId,roleId:this.newobj_one.roleId,trm:this.newobj_one.trm,enqrTp:this.$stateParams.enqrTp,});
	}


}