app.directive("changeVideoDoc", function () {
    return {
        restrict: "A",
        link: function (scope, elements, attrs) {
            var attrsArray = attrs.changeVideoDoc.split(",");
            elements.bind("click", function () {
                var zVideo = $(attrsArray[0]);
                var zDoc = $(attrsArray[1]);
                var pzVideo = $(attrsArray[0]).parent();
                var pzDoc = $(attrsArray[1]).parent();
                pzVideo.append(zDoc);
                pzDoc.append(zVideo);
            })
        }
    }
});