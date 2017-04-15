class ApplicationListController {
    // 构造函数中初始化一些变量
    constructor(pagetabService, netInvestorService, $stateParams, userStatusService, addModelService) {
        // 获取数据的服务
        this.investorService = netInvestorService;
        // 获取路由参数
        this.stateParams = $stateParams;
        // 我的申购
        this.myapp = [];
        this.username = "";
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

        // 获取负责人
        this.investorService.getPerson(myAppList).then(function(data) {
            console.log("负责人");
            console.log(data);
            that.admin = data.data.data;
        });
        this.gotoAdmin = function() {
            // 成为负责人
            this.investorService.gotoAppAdmin(myAppList).then(function (data) {
                console.log(data);
                alert(data.data.msg);
            })
        }
    }
}