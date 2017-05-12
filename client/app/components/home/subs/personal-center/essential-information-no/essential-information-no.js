app.component('essentialInformationNo', {
    restrict: 'E',
    bindings: {},
    templateUrl: './essential-information-no.html',
    controller: function($scope, $state, $stateParams, $interval, $sce, $http, netPersonalCenterService, netUserService, userStatusService) {
        'ngInject';
        //获取当前用户名片
        netPersonalCenterService.getUserBusinessCard().then(function(result) {
            $scope.userStatusCurrent = result.data.data;
            console.log($scope.userStatusCurrent);
        });
        //获取注册手机号
        netPersonalCenterService.getLoginName().then(function(result) {
            $scope.getLoginName = result.data.data;
            $scope.getLoginName = $scope.getLoginName.substr(0, 3) + '****' + $scope.getLoginName.substr(7);
        })
        //获取未认证用户的基本信息
        netUserService.getUserInfoPageDetail()
            .then(function(res) {
                userStatusService.detail = res.data.data;
                $scope.uesrDetail = userStatusService.detail;
            })
    
    }
});