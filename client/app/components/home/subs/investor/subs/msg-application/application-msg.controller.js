class ApplicationMsgController {
    // 构造函数中初始化一些变量
    constructor(pagetabService, netInvestorService, $stateParams, userStatusService, addModelService) {
        // 创建标签的服务
        this.pagetabService = pagetabService;
        // 获取数据的服务
        this.investorService = netInvestorService;
        // 获取路由参数
        this.stateParams = $stateParams;
        // 获取登录信息的服务
        this.userStatusService = userStatusService;
        // 弹窗
        this.addModelService = addModelService;
        // 分页变量和每页显示条目, 单机分页和调整每页显示个数的时候, 修改下面的值.
        this.pageNum = "1";
        this.pageSize = "10";
        // 添加申购列表状态
        this.addState = false;
        this.pages = {};
        this.msgState = 1;
        // 复选框数组取值
        this.checkMsg = [];
    }

    // 复杂和大量的逻辑代码写在初始化函数中
    $onInit() {
        var that = this;
        // 创建标签
        this.pagetabService.activeTab({
            tabKey: 'home.investor',
            routeState: 'home.investor',
            routeLabel: '投资者'
        });
        // 获取数据方法
        this.resultList = function (params) {
            // 获取申购列表
            this.investorService.applicationList(params).then((res)=> {
                for (var i = 0; i < res.data.data.list.length; i++) {
                    res.data.data.list[i].sndrSbrbEStatus = res.data.data.list[i].sndrSbrbEStatus + "";
                }
                this.items = res.data.data.list;
                this.pages = res.data.data.page;
                console.log(this.items);
            });
        };
        // 初始数据
        var params = {
            // 路由传递过来的参数
            dstrBondId: this.stateParams.dstrBondId,
            issuId: this.stateParams.issuId,
            // 单机分页获取的参数
            pageNum: this.pageNum,
            pageSize: this.pageSize
        };
        this.resultList(params);

        // 分页
        this.pageChange = function (page) {
            var params = {
                // 路由传递过来的参数
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                // 单机分页获取的参数
                pageNum: page,
                pageSize: this.pageSize
            };
            this.resultList(params);
        };
        // 每页显示条目
        this.changePageSize = function (page) {
            var params = {
                // 路由传递过来的参数
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                // 单机分页获取的参数
                pageNum: this.pageNum,
                pageSize: page
            };
            // 获取申购列表
            this.resultList(params);
        };
        // 打开/关闭添加申购
        this.addModel = function () {
            this.addState = !this.addState;
        };
        this.outModel = function (sid, rid) {
            this.addModelService.open(sid, rid);
        };
        this.trClick = function (num) {
            // 添加单机样式
            this.trClicked = num;
        };
        // 发送
        this.sendApp = function () {
            // 路由传递过来的参数
            var params = {
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId
            };
            console.log(params);
            this.investorService.sendApplication(params).then(function (data) {
                alert(data.data.msg);
                console.log(data);
            })
        };
        // 新消息
        this.readNews = function (sid) {
            console.log(sid);
            var params = {
                sbrbId: sid
            };
            this.investorService.readNewMsg(params).then(function (data) {
                console.log(data);
                alert(data.data.msg);
                that.msgState = data.data.status;
            })
        }
    }
}