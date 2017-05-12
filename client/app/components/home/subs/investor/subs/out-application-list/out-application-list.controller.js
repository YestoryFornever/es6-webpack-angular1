class OutListController {
    constructor(netInvestorService, $stateParams, $state, UikitPager) {
        this.netInvestorService = netInvestorService;
        this.stateParams = $stateParams;
        // 到处申报列表
        this.data = [];
        this.pageNum = 1;
        this.pageSize = 10;
        this.msg = "";
        this._state = $state;
        this.UikitPager = UikitPager;
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
            that.postData(params);
        };
        this.postData = function (params) {
            // 获取申购列表
            this.netInvestorService.outAppList(params).then(function (data) {
                console.log(data, "申购历史列表");
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
        this.postData(params);

        // 关闭弹出
        this.close = function () {
            this.modalInstance.close();
        };
    }
}