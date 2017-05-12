class DistributorMainController {
    // 构造函数中初始化一些变量
    constructor(netDistributorService, $stateParams, $state, $scope, userStatusService, addModelService, ProxyRequestService, pagetabService) {
        // 获取数据的服务
        this.investorService = netDistributorService;
        // 获取路由参数
        this.stateParams = $stateParams;
        this.pagetabService = pagetabService;
        // 我的申购
        this.myapp = [];
        this.username = "";
        this.show = true;
        this.proxyRequestService = ProxyRequestService;

        this.navBarShow = true;
        this.state = $state;
        this.mywinbid = false;
        this.$scope = $scope;

        this.pagetabService.activeTab({
            tabKey: 'home.newdebtinformationdetails',
            routeState: this.state.$current.name,
            routeParams: angular.copy(this.stateParams),
        });
    }

    $onInit() {
        var that = this;
        this.username = BONDCONFIG.USERINFO.userName;
        // 我的申购
        var myAppList = {
            dstrBondId: this.stateParams.dstrBondId,
            issuId: this.stateParams.issuId
        };
        this.investorService.myApplication(myAppList).then(function (data) {
            console.log(data);
            that.myapp = data.data.data;
        });
        // 如果更新数据，修改中标总量数据
        this.sendMsg = function () {
            // 我的申购
            this.investorService.myApplication(myAppList).then(function (data) {
                console.log(data);
                that.myapp = data.data.data;
            });
        };
        // 获取负责人
        this.investorService.getPerson(myAppList).then(function (data) {
            console.log("负责人");
            console.log(data);
            that.admin = data.data.data;
        });
        this.gotoAdmin = function () {
            // 成为负责人
            this.investorService.gotoAppAdmin(myAppList).then(function (data) {
                console.log(data);
                alert(data.data.msg);
                that.state.reload();
            })
        };

        // 生产我的申购列表
        this.updateMyList = function () {
            this.mywinbid = true;
            var params = {
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                pageNum: 1,
                pageSize: 10
            };
            console.log(params, "生成我的申购参数");
            this.investorService.updateMyList(params).then(function (data) {
                for (var i = 0; i < data.data.data.length; i++) {
                    data.data.data[i].dlvTp = data.data.data[i].dlvTp + "";
                    data.data.data[i].sellrMod = data.data.data[i].sellrMod + "";
                    data.data.data[i].sndrSbrbEStatus = data.data.data[i].sndrSbrbEStatus + "";
                    data.data.data[i].sbrbChnl = data.data.data[i].sbrbChnl + "";

                    data.data.data[i].sbrbIntrt = data.data.data[i].sbrbIntrt;
                    data.data.data[i].cprsvPftIntrt = data.data.data[i].cprsvPftIntrt;
                }
                that.items = data.data.data;
                console.log(data, "生成申购列表");
                alert(data.data.msg);
                // 刷新外部数据
                that.$scope.$broadcast('refresh-cust-sbrb');
            }, function (err) {
                console.log(err);
                alert(err.data.msg);
            })
        };
        //
        this.updateWinbid = function () {
            this.winbid = "b";
            console.log(this.winbid);
        };
        // navbar 切换
        this.newsClick = function () {
            this.navBarShow = true;
        };
        this.resultClick = function () {
            this.navBarShow = false;
        };

        // 导出申购列表
        this.downLoadUrl = this.proxyRequestService._prefix + 'e-bonddstr/bonddstr/exportSbrbList?dstrBondId=' + this.stateParams.dstrBondId + '&issuId=' + this.stateParams.issuId + "&userId=" + BONDCONFIG.USERINFO.uid + "&id=" + Math.ceil(Math.random() * 10);;
        this.downUrl = 'e-bonddstr/bonddstr/exportDstbCustSbrbList?dstrBondId=' + this.stateParams.dstrBondId + '&issuId=' + this.stateParams.issuId + "&userId=" + BONDCONFIG.USERINFO.uid  + "&id=" + Math.ceil(Math.random() * 10);;
    }
}
