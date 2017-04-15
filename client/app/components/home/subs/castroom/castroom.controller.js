class CastroomController {
    constructor($location, $timeout, $interval, netCastService, $sce, $http, pagetabService) {
        'ngInject';
        var that = this;
        this.iconUrl = "";
        this.pagetabService = pagetabService;
        // this.uname = BONDCONFIG.USERINFO.userName;
        // // 获取机构
        // netCastService.userOrg({lid: this.lid}).then(function (data) {
        //     console.log('用户信息');
        //     if (data.data.data.userName == null || data.data.data.userName == "" || data.data.data.organizationShortName == null || data.data.data.organizationShortName == "") {
        //         that.uname = "游客";
        //         that.iconUrl = "../../../../../resource/images/ico_yk.png";
        //     }
        //     else {
        //         that.uname = BONDCONFIG.USERINFO.userName + " | " + data.data.data.organizationShortName;
        //         that.iconUrl = BONDCONFIG.USERINFO.iconUrl;
        //     }
        //     console.log(data);
        // });
        this.height = window.innerHeight - 120;
        this.msgScroll = window.innerHeight - 350;
        // 获取uid, lid
        this.uid = BONDCONFIG.USERINFO.uid + 1000000000;
        this.lid = BONDCONFIG.USERINFO.lid;
        this.live_id = sessionStorage.getItem("lid");
        this.state = sessionStorage.getItem("state");

        // 自由聊天和提问tab切换
        this.castActive = true;
        this.rightTabActive = true;
        // 初始化提问变量
        this.content = "";
        this.q = "";
        this.richtext = "";

        this.his_id = '';
        // 直播聊天信息
        this.msgInfo = [];
        // 直播问答列表
        this.questInfo = [];
        // 直播用户列表
        this.userList = [];
        // 录播聊天信息
        this.endMsg = [];
        // 录播用户列表
        this.userList = [];
        this.userListLength = "";
        // 聊天图标
        this.msgIco = {};
        // 录播提问列表
        this.questionList = [];
        this.localStorageInfo = [];
        this.live = {};
        this.icoState = false;
        this.icoText = "";
        this.noteHtml = "";
        this.userIco = [];
        this.message = "";
        this.ctrl = {
            time: sessionStorage.getItem("times")
        };
        this.info = [];
        this.showNormal = true;

        // 获取直播房间信息
        var info = {
            live_id: this.live_id,
            uid: this.uid - 1000000000,
            user_role: sessionStorage.getItem("user_role")
        };
        console.log(info, "直播参数");
        netCastService.costlive(info).then(function (data) {
            console.log(data, "直播间信息");
            if (data.data.status == "0") {
                console.log(data, "直播间信息");
                that.uname = data.data.data.user_name;
                that.iconUrl = data.data.data.head_url;
                console.log(that.iconUrl);
                that.his_id = data.data.data.his_url.split("play-")[1];
                that.live = data.data.data;
                that.noteHtml = $sce.trustAsHtml(data.data.data.note);
                that.own = data.data.data.live_id;
            }
            else {
                alert(data.data.msg);
            }
        });
        // 获取点播自由发言信息
        var params = {
            live_id: this.live_id,
            cur_page: 1
        };
        netCastService.endMsg(params).then(function (data) {
            that.endMsg = data.data.data.list;
        });
        // 滚动加载点播发言信息
        var m = 2;
        that.msgMore = function () {
            var params = {
                live_id: this.live_id,
                cur_page: m
            };
            netCastService.endMsg(params).then(function (data) {
                if (data.data.data.list.length > 0) {
                    for (var j = 0; j < data.data.data.list.length; j++) {
                        that.endMsg.push(data.data.data.list[j]);
                    }
                    m++;
                }
            });
        };


        // 用户列表
        var userParams = {
            live_id: this.live_id,
            cur_page: 1
        };
        netCastService.userList(userParams).then(function (data) {
            console.log(data, "观众列表");
            that.userList = data.data.data.list;
            that.userListLength = data.data.data.page.totalResult;
        });

        var userPage = 2;
        that.userMore = function () {
            var userParams = {
                live_id: this.live_id,
                cur_page: userPage
            };
            netCastService.userList(userParams).then(function (data) {
                if (data.data.data.list.length > 0) {
                    for (var j = 0; j < data.data.data.list.length; j++) {
                        that.userList.push(data.data.data.list[j]);
                    }
                    userPage++;
                }
            });
        };

        // 提问列表
        var questionParams = {
            live_id: this.live_id,
            uid: this.uid - 1000000000,
            cur_page: 1
        };
        netCastService.questionList(questionParams).then(function (data) {
            console.log(data);
            that.questionList = data.data.data.list;
        });

        // 加载更多
        var n = 2;
        that.questionMore = function () {
            var questionParams = {
                live_id: this.live_id,
                uid: this.uid - 1000000000,
                cur_page: n
            };
            netCastService.questionList(questionParams).then(function (data) {
                if (data.data.data.list.length > 0) {
                    for (var j = 0; j < data.data.data.list.length; j++) {
                        that.questionList.push(data.data.data.list[j]);
                    }
                    n++;
                }
            });
        };

        // 单机切换提问和聊天tab
        this.free = function () {
            if (that.state == "1") {
                $timeout(function () {
                    document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight + 50;
                }, 500);
            }
            this.castActive = true;
        };
        this.quest = function () {
            if (that.state == "1") {
                $timeout(function () {
                    document.getElementById("scroll2").scrollTop = document.getElementById("scroll2").scrollHeight + 50;
                }, 500);
            }
            this.castActive = false;
        };

        // 单机切换大纲和观众tab
        this.outline = function () {
            this.rightTabActive = true;
        };
        this.audience = function () {
            this.rightTabActive = false;
        };

        // 显示表情
        this.icoShow = function () {
            this.icoState = true;
        };
        // 隐藏图标
        this.icoHide = function (one, two, three) {
            this.icoState = false;
            // this.content += "/" + three;
            this.content += three;
            console.log(this.content);
        };
        // 单机切换播放位置
        this.exchange = function () {
            this.showNormal = !this.showNormal;
        };


        // 表情
        $http.get("https://static.gensee.com/webcast/static/emotion/icon.json").then(function (data) {
            console.log(data);
            that.msgIco = data.data;
        });

        // 刷新发送消息
        this.timeScroll = function () {
            document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight;
        };

        // 监听发送聊天内容
        seajs.use('https://static.gensee.com/webcast/static/sdk/js/gssdk.js', ()=> {
            var channel = GS.createChannel();
            // 所有时间根据情况自动调用, 或者事件触发
            // 停止 onStop
            if (that.state != 4) {
                channel.bind("onStop", function (event) {
                    console.log("结束");
                    that.message = "";
                    // 已结束
                    that.state = 5;
                });
                channel.bind("onStart", function (event) {
                    console.log("开始");
                    that.state = 1;
                    that.message = "";
                    // window.location.reload();
                });
                channel.bind("onPause", function (event) {
                    console.log("暂停");
                    that.state = 1;
                    that.message = "";
                });
                channel.bind("onPlay", function (event) {
                    console.log("播放");
                    that.state = 1;
                    that.message = "";
                });
            }
            // 监听公聊信息
            channel.bind("onPublicChat", function (event) {
                console.log("公聊信息");
                console.log(event);

                $timeout(function () {
                    netCastService.iconUrl(params).then(function (data) {
                        console.log(data.data.data.iconUrl);
                        if (data.data.data.length > 0) {
                            // if (event.data.sender == "游客") {
                            //     event.data.iconUrl = "../../../../../resource/images/ico_yk.png";
                            // }
                            // else {
                                event.data.iconUrl = data.data.data[0].iconUrl;
                            // }
                            that.msgInfo.push(event.data);
                        }
                        else {
                            that.msgInfo.push(event.data);
                        }
                        document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight + 50;
                    });
                    document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight + 50;
                }, 500);

            });
            // 监听问答
            channel.bind("onQAList", function (event) {
                console.log(event);
                $timeout(function () {
                    var arr = [];
                    for (var i = 0; i < event.data.list.length; i++) {
                        arr.push(event.data.list[i].qaownerId - 1000000000);
                    }

                    netCastService.iconUrl({userIdList: arr}).then(function (data) {
                        console.log(data);
                        for (var i = 0; i < data.data.data.length; i++) {
                            // if (event.data.list[i].submitor == "游客") {
                            //     event.data.list[i].answer = "../../../../../resource/images/ico_yk.png";
                            //     that.questInfo.push(event.data.list[i]);
                            // }
                            // else {
                                event.data.list[i].answer = data.data.data[i].iconUrl;
                                that.questInfo.push(event.data.list[i]);
                            // }
                        }
                        console.log(event.data.list);
                        console.log(that.questInfo);
                    });
                    console.log(event.data);
                }, 500);
                document.getElementById("scroll2").scrollTop = document.getElementById("scroll2").scrollHeight + 50;
            });

            // 发送信息
            this.send = function () {
                if (that.state == 2 || that.state == 3) {
                    that.message = "直播尚未开始";
                    that.content = "";
                }
                else {
                    if (that.state == 5) {
                        that.message = "直播已结束";
                        that.content = "";
                    }
                    else {
                        that.message = "";
                        if (that.content == "") {
                            that.message = "发送内容不能为空";
                            return false;
                        }
                        else {
                            this.message = "";
                            var info = {
                                content: this.content
                            };
                            channel.send(
                                "submitChat",
                                info,
                                function (result) {
                                    var sendInfo = {
                                        content: result.data.content,
                                        richtext: result.data.content,
                                        senderUid: that.uid - 1000000000,
                                        sender: that.uname,
                                        iconUrl: that.iconUrl
                                    };
                                    $timeout(function () {
                                        that.msgInfo.push(sendInfo);
                                    }, 500);
                                    document.getElementById("scroll").scrollTop = document.getElementById("scroll").scrollHeight + 50;
                                }
                            );
                            that.content = "";
                            that.q = "";
                        }
                    }
                }
            };
            // 发送提问信息
            this.qt = function () {
                /*
                 * 1. 插入信息到数据库, 然后查询数据库信息,展示聊天信息
                 * 2. 先存储到本地, 隔多久存储一次
                 */
                if (that.state == 2 || that.state == 3) {
                    that.message = "直播尚未开始";
                    that.q = "";
                }
                else {
                    if (that.state == 5) {
                        that.message = "直播已结束";
                        that.q = "";
                    }
                    else {
                        that.message = "";
                        if (that.q == "") {
                            that.message = "发送内容不能为空";
                            return false;
                        }
                        else {
                            this.message = "";
                            var info = {
                                content: this.q
                            };
                            channel.send(
                                "submitQuestion",
                                info,
                                function (result) {
                                    console.log(result.data);
                                    // 提问的时候
                                    var questionText = {
                                        question: result.data.content,
                                        qaownerId: that.uid - 1000000000,
                                        submitor: that.uname,
                                        answer: that.iconUrl
                                    };
                                    $timeout(function () {
                                        that.questInfo.push(questionText);
                                    }, 500);
                                    document.getElementById("scroll2").scrollTop = document.getElementById("scroll2").scrollHeight + 50;
                                }
                            );
                        }
                    }
                }
                document.getElementById("scroll2").scrollTop = document.getElementById("scroll2").scrollHeight + 50;
                that.content = "";
                that.q = "";
            };


            // 创建标签
            this.pagetabService.activeTab({
                tabKey: 'home.castroom',
                routeState: "home.castroom",
                routeParams: {
                    // iid: this.$stateParams.iid
                },
                routeLabel: '直播',
                click: function () {
                    window.location.reload();
                }
            });
        })
    }
}