class ApplicationMsgController {
    // 构造函数中初始化一些变量
    constructor(ProxyRequestService, UikitPager, netInvestorService, $stateParams, userStatusService, addModelService, $state) {
        this.proxyRequestService = ProxyRequestService;
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
        this.state = $state;
        this.multiple = [];

        this.sendEditList = [];
        this.UikitPager = UikitPager;
        this.userName = BONDCONFIG.USERINFO.userName;

        this.ringArray = [];
        this.msgStatistics = {
            total: 0
        };
    }

    // 复杂和大量的逻辑代码写在初始化函数中
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
            that.resultList(params);
        };
        this.resultList = function (params) {
            // 获取申购列表
            this.investorService.applicationList(params).then(function (res) {
                console.log(res, "投资者列表");
                for (var i = 0; i < res.data.data.list.length; i++) {
                    res.data.data.list[i].sndrSbrbEStatus = res.data.data.list[i].sndrSbrbEStatus + "";
                    res.data.data.list[i].sbrbIntrt = res.data.data.list[i].sbrbIntrt + "";
                    res.data.data.list[i].sbrbNum = res.data.data.list[i].sbrbNum + "";

                    res.data.data.list[i].rcptyInstId = res.data.data.list[i].rcptyInstId + "";
                    res.data.data.list[i].rcptyTeamId = res.data.data.list[i].rcptyTeamId + "";
                    res.data.data.list[i].rcptyUserId = res.data.data.list[i].rcptyUserId + "";
                    res.data.data.list[i].dlvTp = res.data.data.list[i].dlvTp + "";
                    res.data.data.list[i].sellrMod = res.data.data.list[i].sellrMod + "";
                    res.data.data.list[i].sbrbChnl = res.data.data.list[i].sbrbChnl + "";
                    // 给修改申购联系人字段name赋值
                    // res.data.data.list[i].name = res.data.data.list[i].rcptyInstNm + "-" + res.data.data.list[i].rcptyTeamNm + "-" + res.data.data.list[i].rcptyUserNm;
                }
                if (res.data.data.list.length > 0) {
                    res.data.data.list[0].readMsg = true;
                    for (let n = 0; n < res.data.data.list.length; n++) {
                        if (res.data.data.list[n].rcptyUserId == res.data.data.list[0].rcptyUserId) {
                            res.data.data.list[n].readMsg = true
                        }
                    }
                    that.single = res.data.data.list[0].rcptyUserId;
                }
                that.items = res.data.data.list;
                var totalPage = res.data.data.page.totalResult;//总页数
                that.Pager.setTotal(totalPage);
                that.Pager.setPage(params.pageNum);
            });
        };
        this.resultList(params);


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
            if (this.admin.userNm == BONDCONFIG.USERINFO.userName) {
                this.addState = !this.addState;
            }
            else {
                alert("您不是团队负责人，无法添加申购！");
            }
        };
        // 双击查看历史信息
        this.outModel = function (sid, rid) {
            this.addModelService.open(sid, rid);
        };
        this.trClick = function (num, sid, mid, item) {
            // 添加单机样式
            this.trClicked = num;
            if (mid == '1') {
                var params = {
                    sbrbId: sid
                };
                this.investorService.readNewMsg(params).then(function (data) {
                    console.log(data, "修改新消息按钮");
                    if (data.data.status == 0) {
                        var params = {
                            // 路由传递过来的参数
                            dstrBondId: that.stateParams.dstrBondId,
                            issuId: that.stateParams.issuId,
                            // 单机分页获取的参数
                            pageNum: that.pageNum,
                            pageSize: that.pageSize
                        };
                        that.resultList(params);
                    }
                })
            }

            // 处理消息标志
            console.log(item.rcptyUserId, "单机的id");
            if (this.changeSingMul == true) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].rcptyUserId == item.rcptyUserId) {
                        this.items[i].readMsg = true;
                    }
                    else {
                        this.items[i].readMsg = false;
                    }
                }
            }
            else {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].rcptyUserId == item.rcptyUserId) {
                        this.items[i].readMulMsg = !this.items[i].readMulMsg;
                    }
                }
            }
            // 单元的时候直接更新单选id值
            this.single = item.rcptyUserId;

            if (item.readMulMsg == true) {
                // 传值
                this.multiple.push(item.rcptyUserId);
                this.multiple = _.uniq(this.multiple);
            }
            else {
                this.multiple = _.remove(this.multiple, function (n) {
                    return n != item.rcptyUserId;
                })
            }
            console.log(this.multiple);
        };
        // 撤销申购状态
        this.changeState = function (sbrbId) {
            var params = {
                sbrbId: sbrbId
            };
            console.log(sbrbId, "撤销id");
            this.investorService.cancelMsg(params).then(function (data) {
                console.log(data, "撤销申购状态");
                that.state.reload();
            })
        };
        // rcptyRingLetterId 环信id
        var ringArray = [];
        this.ringChange = function (state, item) {
            item.checked = !item.checked;
            console.log(state, item.checked);
            if (item.checked) {
                for (let j = 0; j < this.items.length; j++) {
                    if (this.items[j].rcptyUserId == item.rcptyUserId) {
                        this.items[j].checked = true;
                    }
                }
            }
            else {
                for (let j = 0; j < this.items.length; j++) {
                    if (this.items[j].rcptyUserId == item.rcptyUserId) {
                        this.items[j].checked = false;
                    }
                }
            }

            if (state == true) {
                ringArray.push(item.rcptyUserId);
                // 单元的时候直接更新单选id值
                this.single = item.rcptyUserId;
            }
            else {
                for (var i = 0; i < ringArray.length; i++) {
                    if (ringArray[i] == item.rcptyUserId) {
                        ringArray.splice(i, 1);
                        break;
                    }
                }
            }
            this.multiple = ringArray;
            console.log(this.multiple);

        };
        // 删除申购
        this.delApp = function (id) {
            var params = {
                sbrbId: id
            };
            console.log(id);
            this.investorService.deleteApp(params).then(
                function (data) {
                    console.log(data);
                    that.state.reload();
                },
                function (err) {
                    alert(err.data.msg);
                }
            )
        };

        // 获取联系人
        this.getUserList = function (val) {
            var params = {
                dstrBondId: this.stateParams.dstrBondId,
                issuId: this.stateParams.issuId,
                enqrVal: val
            };
            console.log(params);
            return this.investorService.searchUser(params).then(function (data) {
                console.log(data, "用户列表");
                return data.data.data;
            });
        };

        // 修改值
        var editArr = [];
        this.changeSend = function (item) {
            console.log(item, "修改行信息");
            // 标示
            item.is_change = true;
            item.editList = true;
            that.msgClick();

        };
        // 用户失去焦点
        this.userClick = function (item) {
            item.rcptyInstId = item.rcptyNm.instId;
            item.rcptyTeamId = item.rcptyNm.teamId;
            item.rcptyUserId = item.rcptyNm.userId;
            console.log(item, "获取参数");
            // 标示
            item.is_change = true;
            item.editList = true;
            // 生产申购不需要失去焦点修改界面
            if (item.sbrbId == "" || item.sbrbId == undefined) {
                return false;
            }
            else {
                // 如果是未发送才在失去焦点的时候修改信息, 其他都是点发送统一修改
                if (item.sndrSbrbEStatus == 1) {
                    // 更新每行的值
                    var params = {
                        bondSbrbVOList: [item]
                    };
                    console.log(params, "修改行信息参数");
                    this.investorService.updateList(params).then(function (data) {
                        console.log(data, "修改行信息");
                        var params = {
                            // 路由传递过来的参数
                            dstrBondId: that.stateParams.dstrBondId,
                            issuId: that.stateParams.issuId,
                            // 单机分页获取的参数
                            pageNum: that.pageNum,
                            pageSize: that.pageSize
                        };
                        that.resultList(params);
                    }, function (err) {
                        console.log(err, "错误信息");
                    });
                }
            }
        };
        // 其他失去焦点
        this.webSend = function (item) {
            // 标示
            item.is_change = true;
            // item.editList = true;
            // 如果是未发送才在失去焦点的时候修改信息, 其他都是点发送统一修改
            if (item.sndrSbrbEStatus == 1 || item.sbrbChnl == 4) {
                console.log(item, "修改行信息");
                // 更新每行的值
                var params = {
                    bondSbrbVOList: [item]
                };
                console.log(params, "修改行信息参数");
                this.investorService.updateList(params).then(function (data) {
                    console.log(data);
                    var params = {
                        // 路由传递过来的参数
                        dstrBondId: that.stateParams.dstrBondId,
                        issuId: that.stateParams.issuId,
                        // 单机分页获取的参数
                        pageNum: that.pageNum,
                        pageSize: that.pageSize
                    };
                    that.resultList(params);
                    // 刷新外部方法
                    that.msgClick();
                });
            }
        };
        // 申购列表修改票面利率和综合利率
        this.clcChange = function (item) {
            item.editList = true;
            item.is_change = true;
            var pms = {
                cprsvPftIntrt: item.cprsvPftIntrt,
                retFee: item.retFee,
                trm: that.stateParams.trm
            };
            console.log(pms, "票面利率参数");
            this.investorService.clcIntrt(pms).then(function (data) {
                item.sbrbIntrt = data.data.data;
                console.log(data, "票面利率");
            });
        };
        this.cprChange = function (item) {
            item.editList = true;
            item.is_change = true;
            var pm = {
                sbrbIntrt: item.sbrbIntrt,
                retFee: item.retFee,
                trm: that.stateParams.trm
            };
            console.log(pm, "宗收利率");
            this.investorService.cprIntrt(pm).then(function (data) {
                item.cprsvPftIntrt = data.data.data;
                console.log(data, "综收利率");
            });
        };

        // 发送
        this.sendApp = function () {
            if (this.admin.userNm == BONDCONFIG.USERINFO.userName) {

                var sendEditList = _.filter(this.items, function (item) {
                    return (item.is_change && item.sbrbBtch) || item.sndrSbrbEStatus == 1;
                });
                console.log(sendEditList, "发送修改的列表");
                if (sendEditList.length > 0) {
                    // 路由传递过来的参数
                    var params = {
                        dstrBondId: this.stateParams.dstrBondId,
                        issuId: this.stateParams.issuId,
                        bondSbrbVOList: sendEditList

                    };
                    console.log(params);
                    this.investorService.sendApplication(params).then(function (data) {
                        alert(data.data.msg);
                        console.log(data);
                        that.state.reload();
                    }, function (err) {
                        alert(err.data.msg);
                    });
                }
                else {
                    alert("没有修改任何信息, 不能发送!");
                }
            }
            else {
                alert("您不是团队负责人，无法添加申购！");
            }
        };
        // 获取负责人
        var myAppList = {
            dstrBondId: this.stateParams.dstrBondId,
            issuId: this.stateParams.issuId
        };
        this.investorService.getPerson(myAppList).then(function (data) {
            console.log("负责人");
            console.log(data);
            that.admin = data.data.data;
        });

        // 导出申购列表
        this.downLoadUrl = this.proxyRequestService._prefix + 'e-bonddstr/bonddstr/exportSbrbList?dstrBondId=' + this.stateParams.dstrBondId + '&issuId=' + this.stateParams.issuId + "&userId=" + BONDCONFIG.USERINFO.uid + "&id=" + Math.ceil(Math.random() * 10);;
    }
}
