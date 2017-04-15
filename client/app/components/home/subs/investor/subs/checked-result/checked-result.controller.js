class CheckedResultController {
    constructor(netInvestorService, $stateParams, addModelService) {
        this.stateParams = $stateParams;
        this.netInvestorService = netInvestorService;
        this.dataList = [];
        this.pageNum = 1;
        this.pageSize = 10;
        this.addModelService = addModelService;
    }
    $onInit() {
        var that = this;
        // 定义获取数据的方法
        this.postData = function(params) {
            this.netInvestorService.checkedResult(params).then(function(data) {
                console.log(data);
                for(var i = 0; i < data.data.data.list.length; i++) {
                    data.data.data.list[i].sndrSbrbEStatus = data.data.data.list[i].sndrSbrbEStatus + "";
                    data.data.data.list[i].sbrbChnl = data.data.data.list[i].sbrbChnl + "";
                }
                that.dataList = data.data.data.list;
                that.pages = data.data.data.page;
            });
        };
        // 刚进入界面调用数据
        var params = {
            dstrBondId: this.stateParams.dstrBondId,
            issuId: this.stateParams.issuId,
            pageNum: this.pageNum,
            pageSize: this.pageSize
        };
        this.postData(params);

        // 单机分页调用数据
        this.pageChange = function(page) {
            var params = {
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                pageNum: page,
                pageSize: this.pageSize
            };
            this.postData(params);
        };

        // 点击行添加背景
        this.trClick = function(num) {
            this.trClicked = num;
        };
        // 打开弹窗口
        this.outModel = function (sid, rid) {
            this.addModelService.open(sid, rid);
        };
    }
}