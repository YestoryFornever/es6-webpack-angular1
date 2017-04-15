class NewdebtinformationdetailsController {
	constructor(newdebtinformationdetailsService, $state, $stateParams, $uibModal, $mdDialog, pagetabService, NewdebtdialogModalService, netCastService) {
		"ngInject";
		this.name = 'newdebtinformationdetails';
		this.newdebtinformationdetailsService = newdebtinformationdetailsService;
		this.NewdebtdialogModalService = NewdebtdialogModalService;
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		this.$mdDialog = $mdDialog;
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
			// this.activeTab1();
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
					this.yeqian_header = this.newobj_one.bondNm;
					this.activeTab1();
				}
				console.log(this.newobj_one);
			});
		}
		//获取债券基本信息
	getBondDetails() {
		let promise = this.newdebtinformationdetailsService.getBondDetail(this.getBondBarInfos_info);
		promise.then((res) => {
			if (res.data) {
				// console.log(res);
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



	// **********************页签
	activeTab1() {
		this.pagetabService.activeTab({
			tabKey: 'home.newdebtinformationdetails',
			routeState: "home.newdebtinformationdetails",
			routeParams: {
				iid: this.$stateParams.iid
			},
			routeLabel: this.newobj_one.bondNm
			// 
		});
	}

}