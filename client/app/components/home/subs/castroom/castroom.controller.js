class CastroomController {
    constructor($location, $timeout, $interval, netCastService) {
        'ngInject';

        // 获取uid, lid
        this.uid = BONDCONFIG.USERINFO.uid + 1000000000;
        this.uname = BONDCONFIG.USERINFO.userName;
        this.live_id = sessionStorage.getItem("lid");

        console.log("第一个id: " + this.uid + "第二个id: " + this.live_id);

        // 自由聊天和提问tab切换
        this.castActive = true;
        this.rightTabActive = true;
        // 初始化提问变量
        this.q = "";
        this.msgInfo = [];
        this.questInfo = [];
        this.userList = [];
        var that = this;

        this.focusScroll = function() {
            document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight;
        };
        seajs.use('http://static.gensee.com/webcast/static/sdk/js/gssdk.js', ()=> {
            var channel = GS.createChannel();
            // 所有时间根据情况自动调用, 或者事件触发
            // 监听公聊信息
            channel.bind("onPublicChat", function (event) {
                console.log(event.data);
                $timeout(function () {
                    that.msgInfo.push(event.data);
                    document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight;
                }, 500);
            });
            // 监听问答
            channel.bind("onQAList", function (event) {
                console.log(event.data.list);
                $timeout(function () {
                    that.questInfo = event.data.list;
                    console.log(that.questInfo);
                    document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight + 50;
                }, 500);
            });
            // 监听用户在线人数
            channel.bind("onUserList", function(event) {
                that.userList = event.data.list;
                console.log(event);
            });
            // 用户加入
            channel.bind("onUserJoin", function(event) {
                that.userList.push(event.data.list);
                console.log(event);
            });
            // 用户离开
                // 定义删除数组元素函数
            this.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            channel.bind("onUserLeave", function(event) {
                var index = that.userList.indexOf(event.data.list);
                if (index > -1) {
                    that.userList.splice(index, 1);
                }
            });

            // 发送数据
            this.content = "";

            this.q = "";
            // 发送信息
            this.send = function () {
                /*
                 * 1. 插入信息到数据库, 然后查询数据库信息,展示聊天信息
                 * 2. 先存储到本地, 隔多久存储一次
                 */
                var info = {
                    content: this.content
                };

                channel.send(
                    "submitChat",
                    info,
                    function (result) {
                        console.log(result);
                        that.msgInfo.push(result.data);
                        $timeout(function () {
                            document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight + 50;
                        }, 500);
                    }
                );
            };
            // 发送提问信息
            this.qt = function () {
                /*
                 * 1. 插入信息到数据库, 然后查询数据库信息,展示聊天信息
                 * 2. 先存储到本地, 隔多久存储一次
                 */
                var info = {
                    content: this.q
                };

                channel.send(
                    "submitQuestion",
                    info,
                    function (result) {
                        console.log(result.data);
                        that.questInfo.push(result.data);
                        $timeout(function () {
                            document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight + 50;
                        }, 500);
                    }
                );
            };
            // 获取直播房间信息
            var info = {
                live_id: this.live_id,
                uid: this.uid
            };
            // netCastService.costlive(info).then(function(data) {
            //     console.log(data);
            //     that.data = data.data;
            // });

            // 单机切换提问和聊天tab
            this.free = function () {
                this.castActive = true;
            };
            this.quest = function () {
                this.castActive = false;
            };

            // 单机切换大纲和观众tab
            this.outline = function () {
                this.rightTabActive = true;
            };
            this.audience = function () {
                this.rightTabActive = false;
            };
        });
    }
}