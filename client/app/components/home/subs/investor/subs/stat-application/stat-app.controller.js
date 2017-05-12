class StatAppController {
  constructor(netInvestorService, NetAcoupondService, $stateParams, FriendsModalService, sendToClientService, $state) {
    this.investorService = netInvestorService;
    this.stateParams = $stateParams;
    console.log(this.show, "组件传递过来的值");
    this.sendToClientService = sendToClientService;
    this._state = $state;
    this.FriendsModalService = FriendsModalService;
    this.NetAcoupondService = NetAcoupondService;
  }

  $onInit() {
    var that = this;
    var params = {
      dstrBondId: this.stateParams.dstrBondId,
      issuId: this.stateParams.issuId
    };
    this.investorService.appStatistics(params).then(function (data) {
      console.log(data, "统计");
      that.stat = data.data.data;
    });
    // 转发给客户
    this.sendToClient = function (item) {
      console.log(params, "转发客户参数");
      this.sendToClientService.open(item);
    };
    // 读取喇叭信息
    this.read = function (sbrbStatId) {
      var params = {
        sbrbStatId: sbrbStatId
      };
      this.investorService.readClient(params).then(function (data) {
        console.log(data, "读取信息");
        that._state.reload();
      })
    };
    // 邀请好友
    this.inviteFriendsClick = function () {
      // 获取好友和群组
      var uiModal = that.FriendsModalService.open(function (friends, groups) {
        console.log(friends, groups);

        // 点击发送 关闭弹窗
        uiModal.close();
      });
    };

    //
    this.transferFriends = function()
    {
      this.FriendsModalService.open((friend, group) => {
        this.easeMobService.sendMsg('asdf', undefined, friend.oppositeUserId);
      });
    }
  }
}
