app.factory('sendToClientService', function ($uibModal) {
    return {
        open: function (item) {
            let that = this;
            that.newdebtdialogModal = {
                NewdebtdialogObj: {}
            };
            return $uibModal.open({
                animation: true,
                component: 'editModel',
                size: "md",
                resolve: {
                    params: {
                        item:item
                    }
                }
            })
        }
    }
});