app.component('spokesMan', {
    restrict: 'E',
    bindings: {},
    templateUrl: './spokes-man.html',
    controller: function($scope, $location,UikitPager, $timeout, $interval, netPersonalCenterService, $sce, $http,userStatusService) {
        'ngInject';
        $scope.Invitation = [];
        $scope.default={
            pageNum:'1',
            pageSize:'5',
        }
        $scope.Pager = new UikitPager($scope.default.pageSize, 5);
        $scope.Pager.onSelected = function(page) {
            $scope.default.pageNum = page; 
            $scope.InvitationRecord();
        }
        //获取代言图片
        $scope.getImgUrl = netPersonalCenterService.getExtensionV11(userStatusService.uid);
        //获取代言文案
        netPersonalCenterService.getPLiterature().then(function(result) {
            $scope.PLiteraText = result.data.data;
        });
        //获取邀请记录
        $scope.InvitationRecord=function(){
            netPersonalCenterService.InvitationRecord($scope.default).then(function(result) {
                if (result.data.data.list.length > 0) {
                    $scope.Invitation = result.data.data.list;
                    angular.forEach($scope.Invitation,function(obj, index){
                        if(!obj.accountBalance){
                            obj.accountBalance=0;
                        }
                    })
                    var totalPage = result.data.data.page.totalResult; //总页数
                    $scope.Pager.setTotal(totalPage); 
                    $scope.Pager.setPage($scope.default.pageNum);
                } 
                
            });
        };
        $scope.InvitationRecord();
        
    }
});