app.factory('SendAlertService', function($http,$q,$uibModal){
	return {
		/**
		 * 提示框 发送给好友  挂牌到大厅
		 */
		open(item){
			return $uibModal.open({
				animation: true,
				component:'sendAlert',
				windowClass:'my-send-alert',
				size: 'xs',//'lg',//'sm',
				resolve: {
					item: item
				}
			}).result;
		},
	}
});