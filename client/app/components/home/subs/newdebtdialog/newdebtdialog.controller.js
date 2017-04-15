class NewdebtdialogController {
	constructor(NewdebtdialogModalService, $scope, NetBondquotationService) {
		"ngInject";
		this.name = 'bondTrial';
		this.NewdebtdialogModalService = NewdebtdialogModalService;
		this.NetBondquotationService = NetBondquotationService;
		this.$scope = $scope;
		// this.newdebtlist = [];
		//清空所以信息
		this.clearnewdebtlist = [];
		this.allnewdebtobject = this.resolve.newdebtdialogModal;
		this.iWantDstr_info = {
				userId: BONDCONFIG.USERINFO.uid,
				issuId: this.resolve.newdebtdialogModal.issuId,
				dstrBondId: this.resolve.newdebtdialogModal.dstrBondId
			}
			// 4.1.7获取债券横条信息(发行信息)
		this.hengtiaoinfo = {
			userId: BONDCONFIG.USERINFO.uid,
			issuId: this.resolve.newdebtdialogModal.issuId,
			dstrBondId: this.resolve.newdebtdialogModal.dstrBondId,
			rcptyUserId: this.resolve.newdebtdialogModal.userId,
			rcptyTeamId: this.resolve.newdebtdialogModal.teamId,
			rcptyInstId: this.resolve.newdebtdialogModal.instId
		}



		this.Infolist_newdebt = {};
		this.allnewdebt_num = 2;
		// 4.5.6我要申购
		this.addSbrblistInfo = {
			userId: BONDCONFIG.USERINFO.uid,
			issuId: this.resolve.newdebtdialogModal.issuId,
			dstrBondId: this.resolve.newdebtdialogModal.dstrBondId,
			bondSbrbVOList: [
			{
				num:1,
				rcptyUserId: this.resolve.newdebtdialogModal.userId,
				rcptyTeamId: this.resolve.newdebtdialogModal.teamId,
				rcptyInstId: this.resolve.newdebtdialogModal.instId,
				sbrbChnl: 1,
				sbrbIntrt: '', //申购利率
				sbrbNum: '', //申购量
				dlvTp: '1', //交割类型
				sellrMod: '1', //销售方式
				rmrk: '', //备注
			}
			]

		}
		this.addSbrblistInfo_num = 0;
	}

	$onInit() {
		this.updateOfrEStatusInfos();
		console.log(this.resolve.newdebtdialogModal);
	}

	// 添加申购利率/交割类型
	addnewDebtin(item1) {
			if (this.allnewdebt_num <= 20) {
				let addnewDebtinInfo = {
					rcptyUserId: this.resolve.newdebtdialogModal.userId,
					rcptyTeamId: this.resolve.newdebtdialogModal.teamId,
					rcptyInstId: this.resolve.newdebtdialogModal.instId,
					num: this.allnewdebt_num,
					sbrbChnl:1,
					sbrbIntrt: '', //申购利率
					sbrbNum: '', //申购量
					dlvTp: '1', //交割类型
					sellrMod: '1', //销售方式
					rmrk: '', //备注
				};
				if (this.addSbrblistInfo.bondSbrbVOList.indexOf(addnewDebtinInfo) == "-1") {
					this.addSbrblistInfo.bondSbrbVOList.push(addnewDebtinInfo);
				}
				this.allnewdebt_num++;
				// for (var i = 0, len = this.newdebtlist.length; i < len; i++) {
				// 	this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt = this.newdebtlist[i].sbrbIntrt;
				// 	this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum = this.newdebtlist[i].sbrbNum;
				// 	this.addSbrblistInfo.bondSbrbVOList[i].dlvTp = this.newdebtlist[i].dlvTp;
				// 	this.addSbrblistInfo.bondSbrbVOList[i].sellrMod = this.newdebtlist[i].sellrMod;
				// 	this.addSbrblistInfo.bondSbrbVOList[i].rmrk = this.newdebtlist[i].rmrk;
				// }
				// this.addSbrblistInfo.bondSbrbVOList = this.newdebtlist;
				// this.addSbrblistInfo.bondSbrbVOList.sbrbChnl = 1;
				// 申购量占发行量的比例(%)
				for (var i = 0, len = this.addSbrblistInfo.bondSbrbVOList.length; i < len; i++) {
					if (this.Infolist_newdebt.issuNum != 0) {
						this.addSbrblistInfo_num = this.addSbrblistInfo_num + this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum ;
						// this.addSbrblistInfo_num = (this.addSbrblistInfo_num / this.Infolist_newdebt.issuNum) * 100;

					}
					// this.addSbrblistInfo_num=this.addSbrblistInfo_num/10000;
				}
				this.addSbrblistInfo_num = (this.addSbrblistInfo_num / this.Infolist_newdebt.issuNum*10000) * 100;




				console.log(this.addSbrblistInfo.bondSbrbVOList);
			}
		}
		// 4.5.1我要分销
	iWantDstrs() {
			console.log(this.iWantDstr_info);
			let promise = this.NewdebtdialogModalService.iWantDstr(this.iWantDstr_info);
			promise.then((res) => {
				if (res.data) {
					// console.log(res);
					alert(res.data.msg);
				}
			});
		}
		// 4.5.5取发行详情
	updateOfrEStatusInfos() {
			// debugger;
			let promise = this.NewdebtdialogModalService.updateOfrEStatus(this.hengtiaoinfo);
			promise.then((res) => {
				// console.log(res);
				this.Infolist_newdebt = res.data.data;
				// console.log(this.Infolist_newdebt);
			});
		}
		// 我要申购
	addSbrbList() {

			// console.log(this.addSbrblistInfo);
			// debugger;
			for (var i = 0, len = this.addSbrblistInfo.bondSbrbVOList.length; i < len; i++) {
				if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt && this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt >= 0 && this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt <= 100) { //如果概率存在
					if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt.indexOf('.') != -1) {
						if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt.split('.')[1].length > 4) {
							alert("请重新输入，小数点后最多四位");
						}
					}
				} else {
					alert("请重新输入，概率应小于或等于1");
				}
				// 数量
				if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum && this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum >= 0 && this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum <= 1000000) { //如果概率存在
					this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum = this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum;
				} else {
					alert("请重新输入申购量,申购量小于或等于1000000");
				}

			}
			
			let promise2 = this.NewdebtdialogModalService.addSbrb(this.addSbrblistInfo);
			promise2.then((res) => {
				alert(res.data.msg);
				this.modalInstance.close();
				
				
			});
		}  

		// 关闭弹窗
	closenewDebt() {
			this.modalInstance.close();
		}
		//清空所以信息
	clearInfo() {
		// for (var i = 0, len = this.newdebtlist.length; i < len; i++) {
		// 	this.newdebtlist[i].sbrbIntrt = '';
		// 	this.newdebtlist[i].sbrbNum = '';
		// 	this.newdebtlist[i].dlvTp = '1';
		// 	this.newdebtlist[i].sellrMod = '1';
		// 	this.newdebtlist[i].rmrk='';

		// }
		this.addSbrblistInfo.bondSbrbVOList =[{
				rcptyUserId: this.resolve.newdebtdialogModal.userId,
				rcptyTeamId: this.resolve.newdebtdialogModal.teamId,
				rcptyInstId: this.resolve.newdebtdialogModal.instId,
				sbrbChnl: 1,
				num:1,
				sbrbIntrt: '', //申购利率
				sbrbNum: '', //申购量
				dlvTp: '1', //交割类型
				sellrMod: '1', //销售方式
				rmrk: '', //备注
			}] ;
		this.allnewdebt_num = 2;
		
	}
}