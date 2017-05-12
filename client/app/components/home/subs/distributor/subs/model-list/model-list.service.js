app.factory('modelListService', function ($uibModal) {
    return {
        open: function (sid, rid) {
            var that = this;
            that.newdebtdialogModal = {
                NewdebtdialogObj: {}
            };
            return $uibModal.open({
                animation: true,
                component: 'modelList',
                size: "wfxl",
                windowClass: "my-now-bond",
                resolve: {
                    params: {
                        sid: sid,
                        rid: rid
                    }
                }
            })
        }
    }
});