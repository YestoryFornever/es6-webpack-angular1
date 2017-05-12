app.component('myWealth', {
    restrict: 'E',
    bindings: {},
    templateUrl: './my-wealth.html',
    controller: function($scope, UikitPager, $state, $stateParams, mywealthModalService, $location, $timeout, $interval, netPersonalCenterService, $sce, $http) {
        'ngInject';
        $scope.default1 = {
            pageNum: '1',
            pageSize: '10',
        }
        $scope.default2 = {
            pageNum: '1',
            pageSize: '5',
        }
        /**
         * 分页设置
         * @return {[type]} [description]
         */
        $scope.Pager1 = new UikitPager($scope.default1.pageSize, 5);
        $scope.Pager1.onSelected = function(page) {
            $scope.default1.pageNum = page;
            $scope.golbDetails();
            // $state.go($state.$current.name, $scope.searchQuery);
        }
        $scope.Pager2 = new UikitPager($scope.default2.pageSize, 5);
        $scope.Pager2.onSelected = function(page) {
            $scope.default2.pageNum = page;
            $scope.golbChangeList();
            // $state.go($state.$current.name, $scope.searchQuery);
        }
        //轮播图
        $scope.myInterval = 500;
        $scope.noWrapSlides = true;
        $scope.slides = [];
        $scope.active1 = 0;
        //兑换成功后弹窗回调刷新页面，获取最新的兑换记录值和我的金币余额。
        $scope.open = function(item) {
                //弹窗确定以后要做的事
                mywealthModalService.open(item)
                    .then((res) => {
                        netPersonalCenterService.mySummary().then(function(result) {
                            $scope.coinRemain = result.data.data.coinRemain;
                        });
                        $scope.golbChangeList();//回调商品兑换记录
                        $scope.active = 1;
                    })
            }
            //我的金币
        netPersonalCenterService.mySummary().then(function(result) {
            $scope.coinRemain = result.data.data.coinRemain;
        });
        //金币记录 
        $scope.golbDetails = function() {
            netPersonalCenterService.golbDetails($scope.default1).then(function(result) {
                $scope.goldRecord = result.data.data;
                var totalPage = result.data.page.totalResult; //总页数
                $scope.Pager1.setTotal(totalPage);
                $scope.Pager1.setPage($scope.default1.pageNum);
            });
        };
        $scope.golbDetails();
        //商城礼品兑换记录
        $scope.golbChangeList = function() {
            netPersonalCenterService.golbExchangeList($scope.default2).then(function(result) {
                $scope.recordConversion = result.data.data;
                var totalPage = result.data.page.totalResult; //总页数
                $scope.Pager2.setTotal(totalPage);
                $scope.Pager2.setPage($scope.default2.pageNum);
                console.log($scope.recordConversion);
            });
        }
        $scope.golbChangeList();
        //金币轮播图
        netPersonalCenterService.golbBanner({
            'imageType': '106'
        }).then(function(result) {
            if (result.data.data.length > 0) {
                $scope.slidesBanner = result.data.data
            }
        });
        //商城礼品列表 展示全部
        netPersonalCenterService.golbGiftList({
            'pageNum': '1',
            "pageSize": '999'
        }).then(function(result) {
            $scope.golbExchangeList = result.data.data;
        });
        //点击金币记录按钮滑到金币记录位置
        $scope.goldFun = function() {
            var oDiv = document.getElementById("jilu");
            oDiv.scrollIntoView(true);
            $scope.active = 0;
        };
        //点击兑换记录按钮滑到兑换记录位置
        $scope.giftFun = function() {
            var oDiv = document.getElementById("duihuan");
            oDiv.scrollIntoView(true);
            $scope.active = 1; //切换到兑换记录tab
        };
        //刷新金币列表
        $scope.goldShuaXin = function() {
            $scope.golbDetails();
        }

    }

});