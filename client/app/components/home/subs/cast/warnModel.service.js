app.factory('warnInfoModel', function ($uibModal) {
    return {
        open: function (err) {
            let that = this;
            that.newdebtdialogModal = {
                NewdebtdialogObj: {}
            };
            return $uibModal.open({
                animation: true,
                component: 'warnModel',
                size: "sm",
                resolve: {
                    params: {
                        err: err
                    }
                }
            })
        }
    }
});