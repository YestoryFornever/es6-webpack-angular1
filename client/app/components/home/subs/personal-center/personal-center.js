app.component('personalCenter', {
    restrict: 'E',
    bindings: {},
    templateUrl: './personal-center.html',
    controller: function($state, $stateParams, pagetabService, $scope, userStatusService) {
        //this.name = 'home';
        $scope.realCertifyState = userStatusService.realCertifyState;
        pagetabService.activeTab({
            tabKey: 'home.personal-center',
            routeState:'home.personalcenter.essentialInformationYes',
            routeParams: angular.copy($stateParams),
            routeLabel:'个人中心',
        });
    }
});