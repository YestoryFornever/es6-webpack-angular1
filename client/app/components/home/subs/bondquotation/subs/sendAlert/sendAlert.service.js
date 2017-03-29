app.factory('SendAlertService',['$http','$q','bondquotationService','$uibModal',function($http,$q,bondquotationService,$uibModal){
	return {
		/**
		 * 提示框 发送给好友  挂牌到大厅
		 */
		openFirendOrOnLine(item){
			let that =this;
			let deferred = $q.defer();
			that.dataModal={};
			$uibModal.open({
				animation: true,
				component:'sendAlert',
				windowClass:'my-send-alert',
				size: 'xs',//'lg',//'sm',
				resolve: {
					dataModal:function(){
						return that.dataModal ;
					}
				}
			}).result.then(function (res) {
				deferred.resolve(that.dataModal)
			},that);
			return deferred.promise;
		}
	}
}]);