app.factory('changeUserService', function ($uibModal) {
    return {
        open: function () {
            let that = this;
            that.newdebtdialogModal = {
                NewdebtdialogObj: {}
            };
            return $uibModal.open({
                animation: true,
                component: 'changeUser'
            })
        }
    }
});