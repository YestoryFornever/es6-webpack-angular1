app.factory('addModelService', function ($uibModal) {
    return {
        open: function (sid, rid) {
            let that = this;
            that.newdebtdialogModal = {
                NewdebtdialogObj: {}
            };
            return $uibModal.open({
                animation: true,
                component: 'outList',
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