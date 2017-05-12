class ModelListController {
    constructor(netInvestorService, $stateParams, $state, UikitPager) {
        this.UikitPager = UikitPager;
        this.netInvestorService = netInvestorService;
        this.stateParams = $stateParams;
        // 到处申报列表
        this.data = [];
        this.pageNum = 1;
        this.pageSize = 10;
        this.msg = "";
        this._state = $state;
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
        this.Pager = new this.UikitPager(that.pageSize, 5);
        this.Pager.onSelected = function (page) {
            params.pageNum = page;
            that.gotoData(params);
        };
        this.gotoData = function (pm) {
            this.netInvestorService.outAppList(params).then(function (data) {
                console.log(data, "申购历史数据");
                for (var i = 0; i < data.data.data.list.length; i++) {
                    data.data.data.list[i].sndrSbrbEStatus = data.data.data.list[i].sndrSbrbEStatus + "";
                }
                that.sbrbSmy = data.data.data.sbrbSmy;
                that.data = data.data.data.list;
                var totalPage = data.data.data.page.totalResult;//总页数
                that.Pager.setTotal(totalPage);
                that.Pager.setPage(params.pageNum);
            });
        };
        this.gotoData(params);

        // 关闭弹出
        this.close = function () {
            this.modalInstance.close();
        };
    }
}
