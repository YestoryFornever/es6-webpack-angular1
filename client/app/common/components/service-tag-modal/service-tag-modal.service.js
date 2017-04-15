app.factory('serviceTgModalService', function($uibModal) {
	return {
		open: function(item) {
			let that = this;
			return $uibModal.open({
				animation: true,
				component: 'serviceTagModal',
				windowClass: 'serviceTagCss',
				size: 'lg', //'',//'sm',
				resolve: {
					friendModal: function() {
						//that.dataFriendModal.friendObj = item ? item :{};
						return that.dataFriendModal;
					}
				}
			}).result.then(function(selectedItem) {}, that);
		}
	}
});