class EditModelController {
    constructor($stateParams, netInvestorService) {
        this.stateParams = $stateParams;
        var that = this;
        this.data = [];
        this.netInvestorService = netInvestorService;
    }

    $onInit() {
        var that = this;
        // 关闭弹出
        this.close = function () {
            this.modalInstance.close();
        };
        // 获取传递过来的数据
        console.log(this.resolve, "数据");
        // 回显数据
        this.data.sbrbStatId = this.resolve.params.item.sbrbStatId;
        this.data.dstrBondId = this.resolve.params.item.dstrBondId;
        this.data.whlTmsNum = this.resolve.params.item.whlTmsNum;
        this.data.bdyTmsNum = this.resolve.params.item.bdyTmsNum;
        this.data.bdyIntrt = this.resolve.params.item.bdyIntrt;
        let data = new Date(this.resolve.params.item.clsbidTmL);
        let y = data.getFullYear();
        let m = data.getMonth() + 1 < 9 ? "0" + (data.getMonth() + 1) : data.getMonth();
        let d = data.getDay() < 9 ? "0" + data.getDay() : data.getDay();
        let h = data.getHours() < 9 ? "0" + data.getHours() : data.getHours();
        let i = data.getMinutes() < 9 ? "0" + data.getMinutes() : data.getMinutes();

        this.data.clsbidTm = y + "年" + m + "月" + d + "日" + " " + h + ":" + i ;


        console.log(this.data.clsbidTm);
        // 提交数据
        this.sendToClient = function () {
            var params = {
                sbrbStatId: this.data.sbrbStatId,
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                whlTmsNum: this.data.whlTmsNum,
                bdyTmsNum: this.data.bdyTmsNum,
                bdyIntrt: this.data.bdyIntrt,
                clsbidTm: new Date(this.data.clsbidTm.replace(/年/g, '/').replace(/日/g, '').replace(/月/g, '/')).getTime()


            };
            console.log(params, "修改转发信息");
            this.netInvestorService.sendClient(params).then(function (data) {
                console.log(data, "发送给客户数据");
                alert(data.data.msg);
                that.modalInstance.close();
            })
        }
    }
}
