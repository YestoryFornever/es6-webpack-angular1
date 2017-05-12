app.factory('DstrMainHistoryService',function($uibModal){
	return {
		open: function (sid, rid) {
			let that = this;
			that.newdebtdialogModal = {
				NewdebtdialogObj: {}
			};
			return $uibModal.open({
				animation: true,
				component: 'dstrMainHistory',
				size: "lg",
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