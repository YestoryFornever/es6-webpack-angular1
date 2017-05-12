
/**
 * 弹出框  == alert
 * @type {[type]}
 */
app.factory('AlertModalService',function($http,$q, $uibModal){
	return {
		/**
		 * 
		 * @param  {[string]} tittle
		 * @param  {[string]} content
		 * @param  {[string]} show
		 * @return {[type]}      [description]
		 */
		open(title, content,show){
			this.info = {
				title: title||'',
				content: content|| '',
				show:show || ''
			}
			let deferred = $q.defer();
			let that =this;
			$uibModal.open({
				animation: true,
				component:'alertModal',
				windowClass:'my-alert-modal',
				size: 'xxx',//'lg',//'sm',
				resolve: {
					info:that.info
				}
			}).result.then((ss)=>{
				deferred.resolve(that.info);
			});
			return deferred.promise;
		}
	}
});