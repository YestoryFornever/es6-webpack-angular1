app.component('moreSettingsYes', {
    restrict: 'E',
    bindings: {},
    templateUrl: './more-settings-yes.html',
    controller: function($scope,$location, $timeout, $interval, personalCenterService, $sce, $http) {
        'ngInject';
        $scope.isPassward=false;
        $scope.isAmendPhone=false;
    }
   
});