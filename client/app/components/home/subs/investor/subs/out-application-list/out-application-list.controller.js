class OutListController {
    constructor(netInvestorService, $stateParams) {
        this.netInvestorService = netInvestorService;
        this.stateParams = $stateParams;
        // 到处申报列表
        this.data = [];
        this.pageNum = 1;
        this.pageSize = 10;
    }

    $onInit() {
        var that = this;
        var params = {
            // 路由传递过来的参数
            dstrBondId: this.stateParams.dstrBondId,
            issuId: this.stateParams.issuId,
            sndrTeamId: this.resolve.params.sid,
            rcptyTeamId: this.resolve.params.rid,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        };
        console.log(params);
        // 导出申购列表信息
        this.netInvestorService.outAppList(params).then(function (data) {
            for(var i = 0; i < data.data.data.list.length; i++) {
                data.data.data.list[i].sndrSbrbEStatus = data.data.data.list[i].sndrSbrbEStatus + "";
            }
            that.data = data.data.data.list;
            console.log(data, "申购历史");
        });
        // 关闭弹出
        this.close = function() {
            this.modalInstance.close();
        }

    }
}