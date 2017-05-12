app.directive('uploadImg', function($parse){
	return {
		//require : ['^?form', 'ngModel'],
		restrict: 'EA',
		replace: false,
		link: function(scope, element, attrs, ctrl){
            var changeFn = $parse(attrs.uploadImg);//attrs是属性，获取所有属性。
           
            scope.inputfile=[];
            scope._images=[];
            var fileInput = $('<input type="file" multiple style="display: none" name="file"/>');
            $(element).next(fileInput);
            $(element).click(function(){
                fileInput.trigger('click');
            });
            fileInput.change(function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                createImage(files);   
            })
            function createImage(file) {
                for (var i in file) {
                    scope.inputfile.push(file[i]);   
                }
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function(e) {
                        scope._images.push(e.target.result);
                        changeFn(scope, {
                            files: scope.inputfile,
                            imgs:scope._images,
                        })

                    };
                }
            };
			
		},
	};
});
