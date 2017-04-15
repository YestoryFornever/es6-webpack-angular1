app.component('myWealth', {
    restrict: 'E',
    bindings: {},
    templateUrl: './my-wealth.html',
    controller: function($scope,mywealthModalService,$location, $timeout, $interval, personalCenterService, $sce, $http) {
        'ngInject';
        $scope.mywealthModalService =mywealthModalService;
    }
   
});