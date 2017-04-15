app.component('spokesMan', {
    restrict: 'E',
    bindings: {},
    templateUrl: './spokes-man.html',
    controller: function($scope,$location, $timeout, $interval, personalCenterService, $sce, $http) {
        'ngInject';
    }
});