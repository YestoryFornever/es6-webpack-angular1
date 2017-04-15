app.component('serviceTagModal', {
    restrict: 'E',
    bindings: {
        modalInstance: "<",
        resolve: "<",
    },
    templateUrl: './service-tag-modal.html',
    controller: function($scope, serviceTgModalService, $state, $stateParams) {
        'ngInject';
        var that = this;
        //关闭弹框
        $scope.close = function() {
            that.modalInstance.close()
        }
    }
});