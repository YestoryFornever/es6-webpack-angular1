class CheckedResultController {
    constructor(netInvestorService, $stateParams, addModelService, UikitPager) {
        this.stateParams = $stateParams;
        this.netInvestorService = netInvestorService;
        this.dataList = [];
        this.pageNum = 1;
        this.pageSize = 10;
        this.addModelService = addModelService;
        this.UikitPager = UikitPager;
    }

    $onInit() {
        var that = this;
        // 初始数据
        var params = {
            // 路由传递过来的参数
            dstrBondId: this.stateParams.dstrBondId,
            issuId: this.stateParams.issuId,
            // 单机分页获取的参数
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
            this.netInvestorService.checkedResult(params).then(function (data) {
                console.log(data);
                for (var i = 0; i < data.data.data.list.length; i++) {
                    data.data.data.list[i].winbidEStatus = data.data.data.list[i].winbidEStatus + "";
                    data.data.data.list[i].sndrSbrbEStatus = data.data.data.list[i].sndrSbrbEStatus + "";
                    data.data.data.list[i].sbrbChnl = data.data.data.list[i].sbrbChnl + "";
                }
                that.dataList = data.data.data.list;
                var totalPage = data.data.data.page.totalResult;//总页数
                that.Pager.setTotal(totalPage);
                that.Pager.setPage(params.pageNum);
            });
        };
        this.postData(params);


        // 点击行添加背景
        this.trClick = function (num) {
            this.trClicked = num;
        };
        // 打开弹窗口
        this.outModel = function (sid, rid) {
            this.addModelService.open(sid, rid);
        };

        // 撤销申购状态
        this.changeState = function (sbrbId) {
            var params = {
                sbrbId: sbrbId
            };
            console.log(sbrbId, "撤销id");
            this.netInvestorService.cancelMsg(params).then(function (data) {
                console.log(data, "撤销申购状态");
            })
        };
        // 修改中标结果
        this.changeSelectWinbid = function (item) {
            console.log(item);
            let params = {
                sbrbId: item.sbrbId,
                winbidEStatus: item.winbidEStatus,
                winbidNum: item.winbidNum,
                winbidIntrt: item.winbidIntrt
            };
            console.log(params, "中标分配参数");
            this.netInvestorService.editSelectedWinbid(params).then(function (data) {
                    console.log(data, "分配中标结果");
                    var params = {
                        // 路由传递过来的参数
                        dstrBondId: that.stateParams.dstrBondId,
                        issuId: that.stateParams.issuId,
                        // 单机分页获取的参数
                        pageNum: that.pageNum,
                        pageSize: that.pageSize
                    };
                    that.postData(params);
                    that.msgClick();
                },
                function (err) {
                    that.message = err.data.msg;
                })
        }
    }
}
