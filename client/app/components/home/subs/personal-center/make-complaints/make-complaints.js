app.component('makeComplaints', {
    restrict: 'E',
    bindings: {},
    templateUrl: './make-complaints.html',
    controller: function($scope, $location, $timeout, $interval, netPersonalCenterService, $sce, $http, alertTip) {
        'ngInject';
        $scope.inputfile = [];
        $scope._images = [];
        $scope.isDisabled = false;
        $scope.default = {
            feedbackContent: ""
        }; //用户反馈信息
        //图片上传
        $scope.imgs = {
                img1: '',
                img2: '',
                img3: '',
                img4: '',
                img5: '',
                img6: '',
            }
            //图片上传
        $scope.addPic = function(e) {
            e.preventDefault();
            $('#onFileChange[type=file]').trigger('click');
            return false;
        };
        //延迟2秒等待html加载；
        setTimeout(function() {
            $("#onFileChange").change(function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                createImage(files);
            })
        }, 2000);
        //图片转成base64展示
        function createImage(file) {
            for (var i in file) {
                $scope.inputfile.push(file[i]);
            }
            if (typeof FileReader === 'undefined') {
                alertTip.warning('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            var image = new Image();
            var leng = file.length;
            for (var i = 0; i < leng; i++) {
                var reader = new FileReader();
                reader.readAsDataURL(file[i]);
                reader.onload = function(e) {
                    $scope._images.push(e.target.result);
                    console.log($scope._images.length);
                };
            }
        };
        //删除图片
        $scope.delImage = function(index) {
            $scope._images.shift(index);
        };
        //上传图片
        $scope.userFeedback = function() {
            $scope.isDisabled = true;
            $scope.imgs.img1 = $scope.inputfile[0];
            $scope.imgs.img2 = $scope.inputfile[1];
            $scope.imgs.img3 = $scope.inputfile[2];
            $scope.imgs.img4 = $scope.inputfile[3];
            $scope.imgs.img5 = $scope.inputfile[4];
            $scope.imgs.img6 = $scope.inputfile[5];
            var data = new FormData(); //以下为像后台提交图片数据
            data.append('feedbackContent', $scope.default.feedbackContent);
            if ($scope.imgs.img1) {
                data.append('photo1', $scope.imgs.img1);
            } else {
                data.append('photo1', '');
            }
            if ($scope.imgs.img2) {
                data.append('photo2', $scope.imgs.img2);
            } else {
                data.append('photo2', '');
            }
            if ($scope.imgs.img3) {
                data.append('photo3', $scope.imgs.img3);
            } else {
                data.append('photo3', '');
            }
            if ($scope.imgs.img4) {
                data.append('photo4', $scope.imgs.img4);
            } else {
                data.append('photo4', '');
            }
            if ($scope.imgs.img5) {
                data.append('photo5', $scope.imgs.img5);
            } else {
                data.append('photo5', '');
            }
            if ($scope.imgs.img6) {
                data.append('photo6', $scope.imgs.img6);
            } else {
                data.append('photo6', '');
            }
            netPersonalCenterService.submitUserFeedback(data).then(function(result) {
                alertTip.success('吐槽成功');
                //置空数据
                $scope.default.feedbackContent='';
                $scope.inputfile=[];
                $scope._images = [];
                $scope.isDisabled = false;
            }).catch(function(err) { //除去状态0的状态码 
                alertTip.error(err.data.msg);
            });
        };
    }
});