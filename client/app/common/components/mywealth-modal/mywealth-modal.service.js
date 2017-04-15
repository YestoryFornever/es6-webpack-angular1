app.factory('mywealthModalService', function($uibModal) {
	return {
		open: function(item) {
			let that = this;
			return $uibModal.open({
				animation: true,
				component: 'mywealthModal',
				windowClass: "mywealthModalCss",
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