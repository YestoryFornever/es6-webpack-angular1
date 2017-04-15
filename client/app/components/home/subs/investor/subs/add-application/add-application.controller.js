class addApplicationController {
    constructor(netInvestorService, $stateParams, $state) {
        // 添加申购信息
        this.addItems = [];
        // 单机行号
        this.trNum = 0;
        // 获取路由参数
        this.stateParams = $stateParams;
        this._state = $state;
        // 服务
        this.netInvestorService = netInvestorService;
        // 用户列表
        this.applicationUser = [];
        // 申购用户名
        this.userNm = "";

        // 提示信息
        this.message = "";
    }

    $onInit($state) {
        var that = this;

        // 调用用户信息接口
        var params = {
            dstrBondId: this.stateParams.dstrBondId,
            issuId: this.stateParams.issuId
        };
        console.log(params);
        this.netInvestorService.searchUser(params).then(function (data) {
            that.applicationUser = data.data.data;
            console.log(data);
        });

        // 默认数据
        this.addItems = [
            {
                sbrbIntrt: "",
                sbrbNum: "",
                dlvTp: "1",
                sbrbChnl: "1",
                sellrMod: "1",
                rmrk: ""
            }
        ];
        // 单机行,选中行号,添加样式.
        this.trClick = function (num) {
            console.log(num);
            // 添加单机样式
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
                    dlvTp: "",
                    sbrbChnl: "1",
                    sellrMod: "",
                    rmrk: ""
                }
            )
        };
        // 复制标位
        this.copyPlace = function () {
            if (this.trNum != null || this.trNum != undefined) {
                this.addItems.push(this.addItems[this.trNum]);
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
            this.addItems = [];
        };
        // 给申购用户名赋值
        this.addAppUser = function (someId) {
            console.log(someId);
            var idArr = someId.split("-");
            // 需要传递给后台的参数
            this.addItems[this.trNum].rcptyInstId = idArr[0];
            this.addItems[this.trNum].rcptyTeamId = idArr[1];
            this.addItems[this.trNum].rcptyUserId = idArr[2];
            
            
        };
        // 确定
        this.submitAdd = function () {
            var params = {
                // 路由传递过来的参数
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                bondSbrbVOList: this.addItems
            };
            for (var i = 0; i < this.addItems.length; i++) {
                if (this.addItems[i].userNm == "" ||
                    this.addItems[i].sbrbIntrt == "" ||
                    this.addItems[i].sbrbNum == "") {
                    this.message = "添加申购列表信息不能为空";
                    return false;
                }
                else {
                    this.message = "";
                    this.netInvestorService.addApplication(params).then(function (data) {
                        console.log(data);
                        if (data.status == 200) {
                            window.location.reload();
                        }
                    });
                    console.log(params);
                }
            }
        };
        // 分页

        // 每页显示条数
    }
}