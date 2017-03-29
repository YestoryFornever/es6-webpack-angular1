
/**
 * 弹出框  == alert
 * @type {[type]}
 */
app.factory('netAlertModalService',['$http','$q','$uibModal',function($http,$q, $uibModal){
	
	return {
		/**
		 * /
		 * @param  {[object]} item
		 * @param  {[string]} item.tittle
		 * @param  {[string]} item.content
		 * @return {[type]}      [description]
		 */
		openBox(item){
			this.$uibModal = $uibModal;
			this.dataModal ={
				itemInfo:{},
			}
			let that =this;
			that.$uibModal.open({
				animation: true,
				component:'alertModal',
				windowClass:'my-alert-modal',
				size: 'xxx',//'lg',//'sm',
				resolve: {
					modalData:function(){
						if(item){
							that.dataModal['itemInfo'] = item;
						}
						return that.dataModal;
					}
				}
			}).result.then(function (selectedItem) {},that);
		}
	}
}]);