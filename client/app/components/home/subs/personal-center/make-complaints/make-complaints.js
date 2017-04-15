app.component('makeComplaints', {
    restrict: 'E',
    bindings: {},
    templateUrl: './make-complaints.html',
    controller: function($scope,$location, $timeout, $interval, personalCenterService, $sce, $http) {
        'ngInject';
        $scope.inputfile=[];
        $scope.images=[];
        //图片上传
        $scope.addPic=function(e){
            e.preventDefault();
            $('input[type=file]').trigger('click');
            return false;
        };
        $scope.onFileChange=function() {
            alert(111);
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)return;
            $scope.createImage(files);
        };
        $scope.createImage=function(file) {
            for( var i in file){
              $scope.inputfile.push(file[i]);
            }
            if(typeof FileReader==='undefined'){
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            let image = new Image();         
            let leng=file.length;
            for(var i=0;i<leng;i++){
                var reader = new FileReader();
                reader.readAsDataURL(file[i]); 
                reader.onload =function(e){
                    $scope.images.push(e.target.result);                               
                };                    
            }     
                            
        };
        $scope.delImage=function(index){
            $scope.images.shift(index);
        };
    }
});