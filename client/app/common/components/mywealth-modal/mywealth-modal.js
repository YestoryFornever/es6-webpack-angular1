app.component('mywealthModal', {
    restrict: 'E',
    bindings: {
        modalInstance: "<",
        resolve: "<",
    },
    templateUrl: './mywealth-modal.html',
    controller: function($scope, mywealthModalService, $state, $stateParams) {
        'ngInject';
        var that = this;
        //关闭弹框
        $scope.close = function() {
            that.modalInstance.close()
        }
    }
});