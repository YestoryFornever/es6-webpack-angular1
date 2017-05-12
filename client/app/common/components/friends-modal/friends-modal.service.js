/**
 * var uiModal = FriendsModalService.open(function(friends, groups){
		uiModal.close();
	});
 */
app.factory('FriendsModalService', function($uibModal){
	return {
		_modal: null,
		/**
		 * [open description]
		 * @param  {[type]}   item [description]
		 * @param  {Function} callback   [description]
		 * @return {[type]}        [description]
		 */
		open: function(callback){
			return $uibModal.open({
				animation: true,
				component:'acoupond',
				size: 'lg',//'lg',//'sm',
				resolve: {
					onSend: function(){
						return function(friends, groups){
							if(callback)callback(friends, groups);
						};
					}
				}
			});
		},
	}
});
