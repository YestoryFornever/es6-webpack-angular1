app.component('essentialInformationyes', {
    restrict: 'E',
    bindings: {},
    templateUrl: './essential-information-yes.html',
    controller: function($scope,$location, $timeout, $interval, personalCenterService, $sce, $http) {
        'ngInject';
        $scope.isName=false;
        $scope.isOrganization=false;
        $scope.isDepartment=false;
        $scope.isPosition=false;
        $scope.isContactNum=false;
        $scope.isWorkNum=false;
        $scope.isOrgEmail=false;
        $scope.isOrgAddress=false;
        $scope.isHeaderImg=false;
    }  
});