class ApplicationListController {
    // 构造函数中初始化一些变量
    constructor(netInvestorService, $stateParams, $state, userStatusService, addModelService, ProxyRequestService, pagetabService) {
        // 获取数据的服务
        this.investorService = netInvestorService;
        // 获取路由参数
        this.stateParams = $stateParams;
        // 我的申购
        this.myapp = [];
        this.username = "";
        this.navBarShow = true;
        this.proxyRequestService = ProxyRequestService;
        this.pagetabService = pagetabService;
        this.state = $state;

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
        this.updateClick = function() {
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
            // sessionStorage.setItem("userNm", data.data.data.userNm);
        });
        this.gotoAdmin = function () {
            // 成为负责人
            this.investorService.gotoAppAdmin(myAppList).then(function (data) {
                console.log(data);
                alert(data.data.msg);
                that.state.reload();
            })
        };
        // navbar 切换
        this.newsClick = function () {
            this.navBarShow = true;
        };
        this.resultClick = function () {
            this.navBarShow = false;
        };

        // 导出申购列表
        this.downLoadUrl = this.proxyRequestService._prefix + 'e-bonddstr/bonddstr/exportSbrbList?dstrBondId=' + this.stateParams.dstrBondId + '&issuId=' + this.stateParams.issuId + "&userId=" + BONDCONFIG.USERINFO.uid + "&id=" + Math.ceil(Math.random() * 10);
    }
}
