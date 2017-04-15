class ChangeUserController {
    constructor(netCastService) {
        this.iconUrl = BONDCONFIG.USERINFO.iconUrl;
        this.username = BONDCONFIG.USERINFO.userName;
        console.log(this.iconUrl);
        this.message = "";
        this.netCastService = netCastService;


        this.uid = BONDCONFIG.USERINFO.uid + 1000000000;
        this.lid = BONDCONFIG.USERINFO.lid;
        this.live_id = sessionStorage.getItem("lid");
        this.state = sessionStorage.getItem("state");

        this.me = false;
        this.under  = false;
    }

    $onInit() {
        var that = this;
        // 关闭弹出
        this.close = function () {
            this.modalInstance.close();
            sessionStorage.removeItem("user_role");
        };
        // 我
        this.meClick = function () {
            sessionStorage.setItem("user_role", 1);
            this.me = true;
            this.under = false;
        };
        this.undefinedClick = function () {
            sessionStorage.setItem("user_role", 2);
            this.me = false;
            this.under = true;
        };
        // 确定
        this.goClassRoom = () => {
            // 获取直播房间信息
            var info = {
                live_id: this.live_id,
                uid: this.uid - 1000000000,
                user_role: sessionStorage.getItem("user_role")
            };
            this.netCastService.costlive(info).then(function (data) {
                console.log(data, "这里做判断");
                if (data.data.status == "0") {
                    if(sessionStorage.getItem("user_role") != undefined || sessionStorage.getItem("user_role") != null) {
                        that.message = "";
                        window.location.href = "#/home/castroom";
                        // 界面必须刷新一下, 要不然<gs:video-live>节点无法解析.
                        window.location.reload();
                    }
                    else {
                        that.message = "请先选择角色";
                    }
                }
                else {
                    that.message = data.data.msg;
                }
            });


        };
    }
}