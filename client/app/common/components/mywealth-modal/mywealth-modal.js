app.component('mywealthModal', {
    restrict: 'E',
    bindings: {
        modalInstance: "<",
        resolve: "<",
    },
    templateUrl: './mywealth-modal.html',
    controller: function($scope, mywealthModalService, $state, $stateParams, userStatusService, netPersonalCenterService, alertTip) {
        'ngInject';
        var that = this;
        $scope.isDisabled = false;
         //获取注册手机号 
        netPersonalCenterService.getLoginName().then(function(result) {
            $scope.getLoginNames = result.data.data;
        });
        //关闭弹框
        $scope.cancel = function() {
            that.modalInstance.dismiss('cancel');
        }
        $scope.close = function() {
            that.modalInstance.close();
        }
        $scope.$broadcast('account:error', '出错信息');
        $scope.valid_numP=function(val,form){
            if(!val.match(/(^1[3|5|7|8|4][0-9]{9}$)/)){
                $scope.isDisabled=true;
                return '联系电话格式不对'; 
            }else{
                $scope.isDisabled=false;  
            }
        }
        //取出从商品列表传过来的单个列表参数
        if (that.resolve.info.goodsType == 101) {
            that.resolve.info.goodsType = "实物";
        } else if (that.resolve.info.goodsType == 102) {
            that.resolve.info.goodsType = "虚拟物";
        }
        $scope.uesrI={
            userName:'',
            workAddress:'',
        }
        $scope.infoGift = that.resolve.info;
        $scope.uesrInform = userStatusService.detail;
        if($scope.uesrInform){
            $scope.uesrI.userName=$scope.uesrInform.userName;
            $scope.uesrI.workAddress=$scope.uesrInform.workAddress;
        }
        $scope.golbGiftchangeFun = function() {
            $scope.isDisabled = true;
            $scope.default = {
                goodsOnlineId: $scope.infoGift.goodsOnlineId,
                number: '1',
                receiptName: $scope.uesrI.userName,
                receiptPhone: $scope.getLoginNames,
                receiptAddress: $scope.uesrI.workAddress,
            };
            netPersonalCenterService.golbGiftchange($scope.default).then(function(result) {
                alertTip.success("商品兑换成功");
                $scope.close(); 
                $scope.isDisabled = false;
            }).catch(function(err) { //除去状态0的状态码 
               alertTip.error(err.data.msg); 
               $scope.close();  
               $scope.isDisabled = false;
            });
        };


    }
});