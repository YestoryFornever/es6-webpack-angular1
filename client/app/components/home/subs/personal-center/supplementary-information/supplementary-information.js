app.component('supplementaryInformation', {
    restrict: 'E',
    bindings: {},
    templateUrl: './supplementary-information.html',
    controller: function($scope,$location, $timeout, $interval, personalCenterService, $sce, $http) {
        'ngInject';
        $scope.isNickName=false;
        $scope.isAutograph=false;
        $scope.isSex=false;
        $scope.isBirthday=false;
        $scope.isHometown=false;  
        $scope.isCard=false;
    }
    
});