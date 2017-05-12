app.component('moreSettingsYes', {
    restrict: 'E',
    bindings: {},
    templateUrl: './more-settings-yes.html',
    controller: function($scope, $location, $timeout, userStatusService, $interval, netPersonalCenterService, $sce, $http, netUserService, alertTip) {
        'ngInject';
        $scope.isAmendPhone = false;
        $scope.imgcode = false;
        $scope.isDisabled = false;
        $scope.disabled1 = false;
        $scope.timeStart = true;
        $scope.timestop = false;
        $scope.o_pass = 1;
        $scope.login_ph = 1;
        $scope.newSeting = [];
        $scope.ctrl = {
            time: 59 * 1000,
        };
        $scope.default = {
                settingId: '',
                settingState: '',
            }
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
            phone: $scope.newPhone.newLoginphone,
            tpyzm: '',
        };
        //获取隐私设置列表
        netPersonalCenterService.getPrivacySettingList().then(function(result) {
            if (result.data.data.length > 0) {
                angular.forEach(result.data.data, function(obj, index) {
                    if (obj.settingType != 5 && obj.settingType != 6 && obj.settingType != 7) {
                        $scope.newSeting.push(obj);
                        //定义一个比较器  根据数组其中一个值排列数组
                        function compare(propertyName) {
                            return function(object1, object2) {
                                var value1 = object1[propertyName];
                                var value2 = object2[propertyName];
                                if (value2 > value1) {
                                    return -1;
                                } else if (value2 < value1) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        }
                        $scope.newSeting.sort(compare("settingType"));
                        console.log($scope.newSeting);
                        angular.forEach($scope.newSeting,function(obj,index){
                            if(obj.settingType==4 || obj.settingType==8){
                                if(obj.settingState==1){
                                    obj.settingState=true;
                                }else{ 
                                    obj.settingState=false;
                                }
                            }
                        })
                    };
                })
            }

        }).catch(function(err) { //除去状态0的状态码 
            alert(err.data.msg);
        });
        //更新隐私设置
        $scope.updatePrivacy = function() {
            netPersonalCenterService.updatePrivacySetting($scope.default).then(function(result) {
                $timeout(function() {
                    alertTip.success('隐私设置成功')
                }, 300);
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
        //select更改
        $scope.phoneLook = function(list) {
            $scope.default.settingId = list.settingId;
            $scope.default.settingState = list.settingState;
            $scope.updatePrivacy();
        };
        //input更改 
        $scope.inputChange = function(list2) {
            if (list2.settingState == false) {
                $scope.default.settingState = "2";
            } else {
                $scope.default.settingState = "1";
            }
            $scope.default.settingId = list2.settingId;
            $scope.default.settingState;
            $scope.updatePrivacy();
        };
        //获取注册手机号
        netPersonalCenterService.getLoginName().then(function(result) {
            $scope.getLoginName = result.data.data;
            $scope.getLoginName = $scope.getLoginName.substr(0, 3) + '****' + $scope.getLoginName.substr(7);
        }).catch(function(err) { //除去状态0的状态码 
            alertTip.error(err.data.msg);
        });
        //更改密码 
        $scope.updatePassword = function() {
            if ($scope.defaultPassword.newPassword != $scope.aa.newPasswordSure) {
                alertTip.success("两次输入密码不一致");
                return false;
            }
            $scope.isDisabled = true;
            netPersonalCenterService.updateLoginPassword($scope.defaultPassword).then(function(result) {
                alertTip.success('密码更新成功');
                $scope.isPassward = false;
                $scope.isDisabled = false;
                $scope.defaultPassword.oldPassword = '';
                $scope.defaultPassword.newPassword = '';
                $scope.aa.newPasswordSure = '';
                $scope.o_pass = 1;
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
                $scope.isDisabled = false;
            });
        };
        //取消修改密码
        $scope.oPassRemove = function() {
            $scope.isPassward = false;
            $scope.o_pass = 1;
            $scope.defaultPassword.oldPassword = "";
            $scope.defaultPassword.newPassword = "";
            $scope.aa.newPasswordSure = "";
        };
        //下一步验证原密码的正确性
        $scope.nextDept = function() {
            netPersonalCenterService.checkLoginPassword({
                "password": $scope.aa.loginPassword
            }).then(function(result) {
                $scope.isAmendPhone_next = true;
                $scope.isAmendPhone=false;
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
            console.log($scope.newPhone.newLoginphone);
            if ($scope.newPhone.newLoginphone!="") {

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
        $scope.$broadcast('account:error', '出错信息');
        $scope.newPhone=function(val,form){
            if(!val.match(/(^1[3|5|7|8|4][0-9]{9}$)/)){
                $scope.disabled1=true; 
                return '手机号码格式不对';  
            }else{
                $scope.disabled1=false;  
            }
        }
        //更新注册手机号
        $scope.backNewPhone = function() {
            var data = {
                loginWay: '1',
                shortMessageAuthKey: String($scope.newPhone.phoneCode),
                newLoginName: String($scope.newPhone.newLoginphone),
            };
            $scope.disabled1 = true;
            netPersonalCenterService.updateLoginName(data).then(function(result) {
                alertTip.success('手机号更新成功');
                $scope.login_ph = 1;
                $scope.isAmendPhone = false;
                $scope.isAmendPhone_next = false;
                $scope.disabled1 = false;
                $scope.aa.loginPassword = "";
                $scope.newPhone.newLoginphone = "";
                $scope.messagePhone.tpyzm = "";
                $scope.newPhone.phoneCode = "";
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
                $scope.disabled1 = false;
            });
        };

        $scope.loginPhRemove = function() {
            $scope.login_ph = 1;
            $scope.isAmendPhone = false;
            $scope.isAmendPhone_next = false;
            $scope.aa.loginPassword = "";
            $scope.newPhone.newLoginphone = "";
            $scope.messagePhone.tpyzm = "";
            $scope.newPhone.phoneCode = "";
        }

    }

});