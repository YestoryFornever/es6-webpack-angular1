app.component('personalCenter', {
    restrict: 'E',
    bindings: {},
    templateUrl: './personal-center.html',
    controller: function($state, $stateParams, pagetabService, $scope, userStatusService) {
        //this.name = 'home';
        $scope.realCertifyState = userStatusService.realCertifyState;
    }
});