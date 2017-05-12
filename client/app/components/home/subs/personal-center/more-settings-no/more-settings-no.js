app.component('moreSettingsNo', {
    restrict: 'E',
    bindings: {},
    templateUrl: './more-settings-no.html',
    controller: function($scope, $location, $timeout, userStatusService, $interval, netPersonalCenterService, $sce, $http, netUserService, alertTip) {
        'ngInject';
        $scope.isAmendPhone_next = false;
        $scope.imgcode = false;
        $scope.timeStart = true;
        $scope.timestop = false;
        $scope.am_ph = 1;
        $scope.am_pass=1;
        $scope.ctrl = {
            time: 59 * 1000,
        };
        //更新密码默认值
        $scope.defaultPassword = {
            oldPassword: '',
            newPassword: '',
        }
        $scope.aa = {
            newPasswordSure: "",
            loginPassword: "",
        };
        //更新手机号默认值
        $scope.newPhone = {
                newLoginphone: '',
                phoneCode: '',
            }
            //短信验证码默认值
        $scope.messagePhone = {
            phone: $scope.newPhone.newLoginName,
            tpyzm: '',
        };
        //获取注册手机号 
        netPersonalCenterService.getLoginName().then(function(result) {
            $scope.getLoginNames = result.data.data;
            $scope.getLoginNames = $scope.getLoginNames.substr(0, 3) + '****' + $scope.getLoginNames.substr(7);
        });
        //更改密码
        $scope.updatePassword = function() {
            if ($scope.defaultPassword.newPassword != $scope.aa.newPasswordSure) {
                alertTip.warning("新密码前后输入不一致");
                return false;
            }
            netPersonalCenterService.updateLoginPassword($scope.defaultPassword).then(function(result) {
                alertTip.success('密码更新成功');
                $scope.am_pass=1;
                $scope.isPassward = false;
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消修改密码
        $scope.amPwRemove=function(){
            $scope.isPassward=false;
            $scope.am_pass=1;
            $scope.defaultPassword.oldPassword="";
            $scope.defaultPassword.newPassword="";
            $scope.aa.newPasswordSure="";
        };
        //下一步验证原密码的正确性
        $scope.nextDept = function() {
            netPersonalCenterService.checkLoginPassword({
                "password": $scope.aa.loginPassword
            }).then(function(result) {
                $scope.isAmendPhone_next = true;
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //刷新图片验证码
        $scope.backImgCode = function() {
            $scope.imgCodeurl = netUserService.picGenerationV12($scope.newPhone.newLoginphone);
        };
        //获取短信验证码
        $scope.getcode = function() {
            $scope.newPhone.newLoginphone=_.trim($scope.newPhone.newLoginphone);
            if ($scope.newPhone.newLoginName != "") {
                if ($scope.imgcode == false) {
                    $scope.imgcode = true;
                    $scope.imgCodeurl = netUserService.picGenerationV12($scope.newPhone.newLoginphone);
                } else {
                    if ($scope.messagePhone.tpyzm) {
                        $scope.messagePhone.phone = String($scope.newPhone.newLoginphone);
                        netPersonalCenterService.smsExistGenerationV12($scope.messagePhone).then(function(result) {
                            alertTip.success('短信已发送');
                            $scope.timeStart = false;
                            $scope.timestop = true;
                            $scope.ctrl.start();
                        }).catch(function(err) { //除去状态0的状态码 
                            alertTip.error(err.data.msg);
                            $scope.imgCodeurl = netUserService.picGenerationV12($scope.newPhone.newLoginphone);
                        });
                    } else {
                        alertTip.warning('图片验证码不能为空');
                    }
                }
            } else {
                alertTip.warning('新手机号不能为空');
            }
        };
        //倒计时结束后的操作
        $scope.ctrl.onStop = function(time) {
                $scope.timeStart = true;
                $scope.timestop = false;
            }
            //更新注册手机号
        $scope.backNewPhone = function() {
            var data = {
                loginWay: '1',
                shortMessageAuthKey: String($scope.newPhone.phoneCode),
                newLoginName: String($scope.newPhone.newLoginphone),
            };
            netPersonalCenterService.updateLoginName(data).then(function(result) {
                alertTip.success('手机号更新成功');
                $scope.am_ph = 1;
                $scope.isAmendPhone = false;
                $scope.isAmendPhone_next = false;
                $scope.aa.loginPassword = "";
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //取消更改注册手机号
        $scope.amPhRemove = function() {
            $scope.am_ph = 1;
            $scope.isAmendPhone = false;
            $scope.isAmendPhone_next = false;
            $scope.aa.loginPassword = "";
            $scope.newPhone.newLoginphone = "";
            $scope.messagePhone.tpyzm = "";
            $scope.newPhone.phoneCode = "";
        };
    }
});