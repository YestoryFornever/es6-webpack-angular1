class ApplicationController {
    constructor(netInvestorService, $stateParams, $state, $scope) {
        console.log(this.pmod, "状态值");
        // 添加申购信息
        this.addItems = [];
        // 单机行号
        this.trNum = 0;
        // 获取路由参数
        this.stateParams = $stateParams;
        this._state = $state;
        // 服务
        this.netInvestorService = netInvestorService;
        // 申购用户名
        this.userNm = "";

        // 提示信息
        this.message = "";

        this.pageNum = 1;
        this.pageSize = 10;
        this.$scope = $scope;
    }

    $onInit() {
        var that = this;
        // 调用用户信息接口
        this.getUserList = function (val) {
            console.log(val, "搜索条件");
            var params = {
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                enqrVal: val
            };
            console.log(params);
            return this.netInvestorService.searchUser(params).then(function (data) {
                console.log(data, "用户列表");
                return data.data.data;
            });
        };

        // 默认数据
        this.addItems = [
            {
                sbrbIntrt: "",
                sbrbNum: "",
                dlvTp: "1",
                sbrbChnl: "1", //状态
                sellrMod: "1",
                cprsvPftIntrt: "",
                retFee: this.stateParams.trm < 360 ? (0.1 * (parseInt(this.stateParams.trm) / 360)).toFixed(4) : 0.1,
                rmrk: ""
            }
        ];
        // 单机行,选中行号,添加样式.
        this.trClick = function (num) {
            console.log(num);
            // 添加单机样式1
            this.trClicked = num;
            // 当前单机的行号
            if (num != null || num != undefined) {
                this.trNum = num;
            }
        };
        // 添加标位
        this.addPlace = function () {
            this.addItems.push(
                {
                    sbrbIntrt: "",
                    sbrbNum: "",
                    dlvTp: "1",
                    sbrbChnl: "1", //状态
                    sellrMod: "1",
                    cprsvPftIntrt: "",
                    retFee: 0.1,
                    rmrk: ""
                }
            )
        };
        // 复制标位
        this.copyPlace = function () {
            if (this.trNum != null || this.trNum != undefined) {
                this.addItems.push(
                    {
                        name: this.addItems[this.trNum].name != undefined ? this.addItems[this.trNum].name : "",
                        sbrbIntrt: this.addItems[this.trNum].sbrbIntrt,
                        sbrbNum: this.addItems[this.trNum].sbrbNum,
                        dlvTp: this.addItems[this.trNum].dlvTp,
                        sbrbChnl: this.addItems[this.trNum].sbrbChnl, //状态
                        sellrMod: this.addItems[this.trNum].sellrMod,
                        cprsvPftIntrt: this.addItems[this.trNum].cprsvPftIntrt,
                        retFee: this.addItems[this.trNum].retFee,
                        rmrk: this.addItems[this.trNum].rmrk
                    }
                );
                console.log(this.addItems);
            }
            else {
                alert("请先选择要复制的行");
            }
        };
        // 取消
        this.cancelAdd = function () {
            console.log(this.state);
            this.state = false;
        };
        // 清空
        this.clearAdd = function () {
            this.$scope.addApplicationForm.reset;
            this.addItems = [
                {
                    sbrbIntrt: "",
                    sbrbNum: "",
                    dlvTp: "1",
                    sbrbChnl: "1", //状态
                    sellrMod: "1",
                    cprsvPftIntrt: "",
                    retFee: this.stateParams.trm < 360 ? (0.1 * (parseInt(this.stateParams.trm) / 360)).toFixed(4) : 0.1,
                    rmrk: ""
                }
            ];
        };
        // 确定
        this.submitAdd = function () {
            console.log(this.addItems);
            // 处理一下this.addItems
            for (var i = 0; i < this.addItems.length; i++) {
                this.addItems[i].rcptyInstId = this.addItems[i].name.instId;
                this.addItems[i].rcptyTeamId = this.addItems[i].name.teamId;
                this.addItems[i].rcptyUserId = this.addItems[i].name.userId;
                if (this.addItems[i].sbrbIntrt < 0) {
                    alert("票面利率不能为负值");
                    return false;
                }
            }
            console.log(this.addItems);
            var params = {
                // 路由传递过来的参数
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                bondSbrbVOList: this.addItems
            };
            console.log(params);
            this.message = "";
            this.netInvestorService.addApplication(params).then(function (data) {
                console.log(data, "添加申购列表");
                if (data.status == 200) {
                    that._state.reload();
                }
            }, function (err) {
                alert(err.data.msg);
            });
        };
        // 计算票面利率
        this.clcInt = function (item) {
            console.log(item);
            var params = {
                cprsvPftIntrt: item.cprsvPftIntrt,
                retFee: item.retFee,
                trm: that.stateParams.trm
            };
            console.log(params, "票面利率参数");
            this.netInvestorService.clcIntrt(params).then(function (data) {
                item.sbrbIntrt = data.data.data;
                console.log(data, "票面利率");
            });
        };
        // 计算综收利率
        this.cprInt = function (item) {
            console.log(item);
            var params = {
                sbrbIntrt: item.sbrbIntrt,
                retFee: item.retFee,
                trm: that.stateParams.trm
            };
            console.log(params, "宗收利率");
            this.netInvestorService.cprIntrt(params).then(function (data) {
                item.cprsvPftIntrt = data.data.data;
                console.log(data, "综收利率");
            });
        };
        // 只能输入数字
        this.isNumber = function (num) {
            var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
            if (!re.test(num)) {
                return "请输入数字";
            }
        };

        // 表单验证
        // 1. 票面利率
        // 2. 返费
        // 3. 总收利率
        // 4. 申购量
        this.sbrbIntrtValidate = function (value) {
            return this.isNumber(value);
        };
        this.retFeeValidate = function (value) {
            return this.isNumber(value);
        };
        this.cprsvPftIntrtValidate = function (value) {
            return this.isNumber(value);
        };
        this.sbrbNumValidate = function (value) {
            return this.isNumber(value);
        };
        this.userValidate = function (value, index) {
            console.log(value, "选择的行号码", index);
            if (value == "" || value == undefined) {
                return "联系人不能为空";
            }
            else {
                if (value.roleId == 1) {
                    this.addItems[index].sellrMod = "2";
                }
                else {
                    this.addItems[index].sellrMod = "1";
                }
                console.log(value.roleId, value.friendInd, "角色和是否是好友");

                // if(value.friendInd == 2) {
                //     this.addItems[index].sbrbChnl = "4";
                // }
                // else {
                //     this.addItems[index].sbrbChnl = "1";
                // }
            }
        };
    }
}
