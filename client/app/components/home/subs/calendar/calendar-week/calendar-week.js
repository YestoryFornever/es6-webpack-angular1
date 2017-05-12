app.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
        .state('home.calendar-week', {
            url: '/calendar-week',
            views: {
                'main@home': {
                    component: 'calendarweek'
                }
            },

        })
    
})
app.component('calendarweek', {
    restrict: 'E',
    bindings: {
         modalInstance: "<",
        resolve: "<",
    },
    templateUrl: './calendar-week.html',
    controller: function(netCalendarweekService,$scope, $location, $timeout, $interval,  $sce, $http) {
        'ngInject';
       
            //图片上传
        // $scope.addPic = function(e) {
        //     e.preventDefault();
        //     $('#onFileChange[type=file]').trigger('click');
        //     return false;
        // };
        //延迟2秒等待html加载；
        // setTimeout(function() {
        //     $("#onFileChange").change(function(e) {
        //         var files = e.target.files || e.dataTransfer.files;
        //         if (!files.length) return;
        //         createImage(files);
        //     })
        // }, 2000);
        //图片转成base64展示
      
        //删除图片
       
        //上传图片
       
    }
});