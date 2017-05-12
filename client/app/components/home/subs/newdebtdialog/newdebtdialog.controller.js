class NewdebtdialogController {
	constructor(NewdebtdialogModalService, $scope, NetBondquotationService,healdCalculatorService) {
		"ngInject";
		this.name = 'bondTrial';
		this.NewdebtdialogModalService = NewdebtdialogModalService;
		this.healdCalculatorService = healdCalculatorService;
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
			bondSbrbVOList: [{
				num: 1,
				rcptyUserId: this.resolve.newdebtdialogModal.userId,
				rcptyTeamId: this.resolve.newdebtdialogModal.teamId,
				rcptyInstId: this.resolve.newdebtdialogModal.instId,
				sbrbChnl: 1,
				sbrbIntrt: '', //申购利率
				cprsvPftIntrt: '', //综收利率
				sbrbNum: '', //申购量
				dlvTp: '1', //交割类型
				sellrMod: '', //销售方式
				retFee: '', //返费
				rmrk: '', //备注
			}]

		}
		this.addSbrblistInfo_num = 0;
		// this.allNum = 0;

		// 4.5.6计算综收利率
		this.zonngshou = {
			sbrbIntrt: '',
			retFee: '',
			trm: ''
		};
		// 计算票面利率
		this.piaomian = {
			cprsvPftIntrt: '',
			retFee: '',
			trm: ''
		}
		this.Infolist_newdebt.trm_one=0;
	}

	$onInit() {
		this.updateOfrEStatusInfos();
		// this.liveBonds();
		console.log(this.resolve.newdebtdialogModal);
		console.log(this.addSbrblistInfo.bondSbrbVOList);
	}

	


	// 添加申购利率/交割类型
	addnewDebtin(item1) {
		if (this.allnewdebt_num <= 20) {
			var  addnewDebtinInfo = {
				rcptyUserId: this.resolve.newdebtdialogModal.userId,
				rcptyTeamId: this.resolve.newdebtdialogModal.teamId,
				rcptyInstId: this.resolve.newdebtdialogModal.instId,
				num: this.allnewdebt_num,
				sbrbChnl: 1,
				sbrbIntrt: '', //申购利率
				sbrbNum: '', //申购量
				dlvTp: '1', //交割类型
				sellrMod: '', //销售方式
				cprsvPftIntrt: '', //综收利率
				retFee: '', //返费
				rmrk: '', //备注
			};
			if (this.Infolist_newdebt.trm.indexOf('Y') != -1) {
				this.Infolist_newdebt.trm_one = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
				if (this.Infolist_newdebt.trm_one >= 1) {
					addnewDebtinInfo.retFee = 0.1;
				}
			} else if(this.Infolist_newdebt.trm.indexOf('D') != -1){
				this.Infolist_newdebt.trm_one= this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
				if(this.Infolist_newdebt.trm_one>360){
					addnewDebtinInfo.retFee = 0.1;
				}else{
					addnewDebtinInfo.retFee = (0.1 * this.Infolist_newdebt.trm_one / 360).toFixed(4);
				}
				
			}else{
				if(this.Infolist_newdebt.trm>360){
					addnewDebtinInfo.retFee = 0.1;
				}else{
					addnewDebtinInfo.retFee = (0.1 * this.Infolist_newdebt.trm / 360).toFixed(4);
				}
				
			}

			if (this.allnewdebtobject.roleId == '1') {
				addnewDebtinInfo.sellrMod = '2'
			} else {
				addnewDebtinInfo.sellrMod = '1'
			}

			if (this.addSbrblistInfo.bondSbrbVOList.indexOf(addnewDebtinInfo) == "-1") {
				this.addSbrblistInfo.bondSbrbVOList.push(addnewDebtinInfo);
			}
			this.allnewdebt_num++;


			console.log(this.addSbrblistInfo.bondSbrbVOList);
		}
	}
	rateAdd() { // 申购量占发行量的比例(%)
		
		this.addSbrblistInfo_num = 0;
		if (this.Infolist_newdebt.issuNum != 0) {
			for (var i = 0, len = this.addSbrblistInfo.bondSbrbVOList.length; i < len; i++) {
				// if(this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum>=0&&this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum<=100){
					// this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum*1;
					this.addSbrblistInfo_num = Number(this.addSbrblistInfo_num )+ Number(this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum );
				// }else{
				// 	alert('请输入0~100之间的数字')
				// }
				
				// console.log( this.addSbrblistInfo_num);
				// this.addSbrblistInfo_num = (this.addSbrblistInfo_num / this.Infolist_newdebt.issuNum) * 100;

			}
			if(this.Infolist_newdebt.issuNum){
				// if(this.Infolist_newdebt.issuNum.indexOf('亿')!=-1){
				// 	this.allNum =this.Infolist_newdebt.issuNum.replace("亿",'');
				// 	this.addSbrblistInfo_num = this.addSbrblistInfo_num*100 / this.allNum ;
				// }else{
					this.addSbrblistInfo_num = Number(this.addSbrblistInfo_num) / Number(this.allNum );
					console.log(this.addSbrblistInfo_num);
				// }
				
			}else{
				this.addSbrblistInfo_num = 0;
			}


			// this.addSbrblistInfo_num=this.addSbrblistInfo_num/10000;
		}
		
		
		
		// this.addSbrblistInfo_num = ((this.addSbrblistInfo_num / (this.allNum )).toFixed(4) )* 100;
		console.log(this.addSbrblistInfo_num);
		console.log(this.Infolist_newdebt.issuNum);

	}
 


	// 4.5.6计算综收利率
	clcCprsvPftIntrts(obj_two) {
		console.log(obj_two);
		// if(obj_two.sbrbIntrt>0||obj_two.sbrbIntrt==''){
			this.zonngshou.sbrbIntrt = obj_two.sbrbIntrt;
			this.zonngshou.retFee = obj_two.retFee;
			console.log(this.Infolist_newdebt.trm);
			if (this.Infolist_newdebt.trm.indexOf('Y') != -1) {
				this.zonngshou.trm = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1) * 360;
			} else if(this.Infolist_newdebt.trm.indexOf('D') != -1){
				this.zonngshou.trm = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
			}else{
				this.zonngshou.trm = this.Infolist_newdebt.trm;
			}
			console.log(this.zonngshou);
			let promise = this.NewdebtdialogModalService.clcCprsvPftIntrt(this.zonngshou);
			promise.then((res) => {
				if (res.data) {
					console.log(res.data.data);

					obj_two.cprsvPftIntrt = res.data.data;
					
				}
			});
		// }else{
		// 	alert('请输入数字');
		// }
		// alert(this.isNumbers(obj_two.sbrbIntrt));
		
	}
	//直播接口
	liveBonds() {
		let promise = this.NewdebtdialogModalService.clcSbrbIntrt({
			userId: BONDCONFIG.USERINFO.uid,
			// issuId: this.resolve.newdebtdialogModal.issuId,
			dstrBondId: this.resolve.newdebtdialogModal.dstrBondId,
		});
		promise.then((res) => {
			if (res.data) {
				console.log(res);



			}
		});
	}
// 只能输入数字
        is_isNumbers(num) {
            var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
            if(!re.test(num)) {
                return false;
            }else if(num>100||num<0){
            	return true_one;
            }else{
            	return true;
            }
        };

	// 计算票面利率
	clcSbrbIntrts(obj_one) {
		// debugger;
			// if(obj_one.cprsvPftIntrt>0||obj_one.cprsvPftIntrt==''){
				this.piaomian.cprsvPftIntrt = obj_one.cprsvPftIntrt;
				this.piaomian.retFee = obj_one.retFee;
				// this.piaomian.trm = this.Infolist_newdebt.trm
				if (this.Infolist_newdebt.trm.indexOf('Y') != -1) {
					this.piaomian.trm = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1) * 360;
				} else if(this.Infolist_newdebt.trm.indexOf('D') != -1){
					this.piaomian.trm = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
				}else{
					this.piaomian.trm = this.Infolist_newdebt.trm;
				}
				console.log(this.piaomian);
				let promise = this.NewdebtdialogModalService.clcSbrbIntrt(this.piaomian);
				promise.then((res) => {
					if (res.data) {
						console.log(res);
						obj_one.sbrbIntrt = res.data.data;
						

					}
				});
			// }else{
			// 	alert('请输入数字');
			// }
			
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
		console.log(this.hengtiaoinfo);
		// debugger;
			let promise = this.NewdebtdialogModalService.updateOfrEStatus(this.hengtiaoinfo);
			promise.then((res) => {
				console.log(res);
				// debugger;
				this.Infolist_newdebt = res.data.data;
				if (this.Infolist_newdebt.trm.indexOf('Y') != -1) {
					if(this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1)>=1)
					// this.Infolist_newdebt.trm = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
					// if (this.Infolist_newdebt.trm >= 1) {
						this.addSbrblistInfo.bondSbrbVOList[0].retFee = 0.1;
						this.Infolist_newdebt.retFee = 0.1;
					// }
				} else if(this.Infolist_newdebt.trm.indexOf('D') != -1){
					this.Infolist_newdebt.trm_one = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
					if(this.Infolist_newdebt.trm_one>360){
						this.addSbrblistInfo.bondSbrbVOList[0].retFee = 0.1;
						this.Infolist_newdebt.retFee = 0.1;
					}else{
						this.addSbrblistInfo.bondSbrbVOList[0].retFee = (0.1 * this.Infolist_newdebt.trm_one / 360).toFixed(4);
						this.Infolist_newdebt.retFee =(0.1 * this.Infolist_newdebt.trm_one / 360).toFixed(4);
					}
					
				}else{
					if(this.Infolist_newdebt.trm>360){
						this.addSbrblistInfo.bondSbrbVOList[0].retFee = 0.1;
						this.Infolist_newdebt.retFee = 0.1;
					}else if(this.Infolist_newdebt.trm<360){
						this.addSbrblistInfo.bondSbrbVOList[0].retFee = (0.1 * this.Infolist_newdebt.trm / 360).toFixed(4);
						this.Infolist_newdebt.retFee =(0.1 * this.Infolist_newdebt.trm / 360).toFixed(4);
					}
				}

				if (this.allnewdebtobject.roleId == '1') {
					this.addSbrblistInfo.bondSbrbVOList[0].sellrMod = '2'
				} else {
					this.addSbrblistInfo.bondSbrbVOList[0].sellrMod = '1'
				}
				this.allNum =Number(this.Infolist_newdebt.issuNum);
				console.log(this.allnewdebtobject.roleId);
				console.log(this.addSbrblistInfo.bondSbrbVOList[0].sellrMod);
				console.log(this.Infolist_newdebt);
			});
		}
		// 我要申购
	addSbrbList() {

		
		// for (var i = 0, len_02 = this.addSbrblistInfo.bondSbrbVOList.length; i < len_02; i++) {
		// 	if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt && this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt >= 0 && this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt <= 100) { //如果概率存在
		// 		if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt.indexOf('.') != -1) {
		// 			if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbIntrt.split('.')[1].length > 4) {
		// 				alert("请重新输入，小数点后最多四位");
		// 			}
		// 		}
		// 	} else {
		// 		alert("请重新输入，概率应小于或等于1");
		// 	}
		// 	// 数量
		// 	if (this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum && this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum >= 0 && this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum <= 1000000) { //如果概率存在
		// 		this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum = this.addSbrblistInfo.bondSbrbVOList[i].sbrbNum;
		// 	} else {
		// 		alert("请重新输入申购量,申购量小于或等于100");
		// 	}

		// }

		let promise2 = this.NewdebtdialogModalService.addSbrb(this.addSbrblistInfo);
		promise2.then((res) => {
			alert(res.data.msg);
			this.modalInstance.close();


		}).catch(function(err) { //除去状态0的状态码 
                alert(err.data.msg);
            });;
	}
// 只能输入数字
        isNumbers(num) {
            var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
            if(!re.test(num)) {
                return "请输入数字";
            }
            if(num>100||num<0){
            	return "请输0到100之间的数字"
            }
            return ;
        };


	//  // 表单验证
        
       
        
        // 4. 申购量
        // 5.备注
        sbrbIntrtdate (value){// 1. 票面利率
        	// return value;
            return this.isNumbers(value);
        };
        retFeedate (value){ // 2. 返费
            return this.isNumbers(value);
        };
        cprsvPftIntrtdate(value){// 3. 总收利率
            return this.isNumbers(value);
        };
       sbrbNumVdate (value){
            return this.isNumbers(value);
        };
        rmrkdate(value){
        	if(value.length>10){
        		return "最多输入10个字";
        	}

        };



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
		// debugger;
		this.addSbrblistInfo.bondSbrbVOList = [{
			rcptyUserId: this.resolve.newdebtdialogModal.userId,
			rcptyTeamId: this.resolve.newdebtdialogModal.teamId,
			rcptyInstId: this.resolve.newdebtdialogModal.instId,
			sbrbChnl: 1,
			num: 1,
			sbrbIntrt: '', //申购利率
			sbrbNum: '', //申购量
			dlvTp: '1', //交割类型
			sellrMod: '', //销售方式
			rmrk: '', //备注
			cprsvPftIntrt: '', //综收利率
			retFee: '', //返费
		}];
		if (this.allnewdebtobject.roleId == '1') {
			this.addSbrblistInfo.bondSbrbVOList[0].sellrMod = '2'
		} else {
			this.addSbrblistInfo.bondSbrbVOList[0].sellrMod = '1'
		}
		if (this.Infolist_newdebt.trm.indexOf('Y') != -1) {
			this.Infolist_newdebt.trm_one= this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
			if (this.Infolist_newdebt.trm_one >= 1) {
				this.addSbrblistInfo.bondSbrbVOList[0].retFee = 0.1;
			}
		} else if(this.Infolist_newdebt.trm.indexOf('D') != -1){
			this.Infolist_newdebt.trm_one= this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
			if(this.Infolist_newdebt.trm_one>360){
				this.addSbrblistInfo.bondSbrbVOList[0].retFee = 0.1;
			}else{
				this.addSbrblistInfo.bondSbrbVOList[0] = (0.1 * this.Infolist_newdebt.trm / 360).toFixed(4);
			}
			
		}else{
			if(this.Infolist_newdebt.trm>360){
				this.addSbrblistInfo.bondSbrbVOList[0].retFee = 0.1;
			}else{
				this.addSbrblistInfo.bondSbrbVOList[0].retFee = (0.1 * this.Infolist_newdebt.trm / 360).toFixed(4);
			}
		}


		this.allnewdebt_num = 2;

	}

	//清空方法2
	clearInfo_two(){

		angular.forEach(this.addSbrblistInfo.bondSbrbVOList,function(obj,index){
			console.log(this.addSbrblistInfo.bondSbrbVOList);
			obj.sbrbIntrt='';//申购利率
			obj.sbrbNum='';//申购量
			obj.cprsvPftIntrt='';//综收利率
			obj.rmrk= '';//备注
			if (this.allnewdebtobject.roleId == '1') {
				obj.sellrMod = '2';
			} else {
				obj.sellrMod = '1';
			};
			if (this.Infolist_newdebt.trm.indexOf('Y') != -1) {
				this.Infolist_newdebt.trm_one = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
				if (this.Infolist_newdebt.trm_one >= 1) {
					obj.retFee = 0.1;
				}
			} else if(this.Infolist_newdebt.trm.indexOf('D') != -1){
				this.Infolist_newdebt.trm_one = this.Infolist_newdebt.trm.substring(0, this.Infolist_newdebt.trm.length - 1);
				if(this.Infolist_newdebt.trm_one>360){
					obj.retFee = 0.1;
				}else{
					obj = (0.1 * this.Infolist_newdebt.trm / 360).toFixed(4);
				}
				
			}else{
				if(this.Infolist_newdebt.trm>360){
					obj.retFee = 0.1;
				}else{
					obj.retFee = (0.1 * this.Infolist_newdebt.trm / 360).toFixed(4);
				}
			}
   
        });

		// this.allnewdebt_num = 2;
	}
		
}