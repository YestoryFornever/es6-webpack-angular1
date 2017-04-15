class CastController {
    constructor(netCastService, $interval, pagetabService, changeUserService, userStatusService) {
        "ngInject";
        sessionStorage.removeItem("user_role");
        this.height = window.innerHeight - 120;
        this.sessionInfo = (lid, state, times) => {
            // 1. 传递参数, 每次单机直播模块更新session数据, 然后在castroom中获取session
            // 2. 通过ui.router params获取id然后在数据库查询传递过来的数据
            sessionStorage.setItem("lid", lid);
            sessionStorage.setItem("state", state);
            sessionStorage.setItem("times", times * 1000);
        };
        pagetabService.activeTab({
            tabKey: 'home.cast',
            routeState:'home.cast',
            routeLabel:'新债直通车'
        });

        this.list = [];
        this.page = [];
        this.ctrl = [];
        var that = this;
        var info = {
            cur_page: 1
        };
        // 获取直播列表
        netCastService.costList(info).then(function (data) {
            console.log(data);
            that.list = data.data.data.list;

            for (var i = 0; i < data.data.data.list.length; i++) {
                console.log(data.data.data.list[i].times);
                var item = {
                    time: data.data.data.list[i].times * 1000
                };
                that.ctrl.push(item);
            }
        });
        // 获取分页信息
        var page = 2;
        that.moreInfo = function () {
            var info = {
                cur_page: page
            };
            // 获取直播列表
            netCastService.costList(info).then(function (data) {
                if (data.data.data.list.length > 0) {
                    console.log(data);
                    // 数组中追加加载的对象.
                    for(var j = 0; j < data.data.data.list.length; j++) {
                        that.list.push(data.data.data.list[j]);
                    }
                    page++;
                    // 倒计时
                    for (var i = 0; i < data.data.data.list.length; i++) {
                        console.log(data.data.data.list[i].times);
                        var item = {
                            time: data.data.data.list[i].times * 1000
                        };
                        that.ctrl.push(item);
                    }
                }
            });
        };

        this.showModel = function(state, lid) {
            if(state != "4") {
                changeUserService.open();
            }
            else {
                sessionStorage.setItem("lid", lid);
                sessionStorage.setItem("user_role", 1);
                sessionStorage.setItem("state", state);
                window.location.href = "#/home/castroom";
                // 界面必须刷新一下, 要不然<gs:video-live>节点无法解析.
                window.location.reload();
            }
        };
    }
}