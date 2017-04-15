app.factory('FriendsModalService', function($uibModal){
	return {
		open: function(item){
			let that =this;
			that.dataFriendModal = {
				friendObj:{}
			}
			return $uibModal.open({
				animation: true,
				component:'acoupond',
				size: 'xl',//'lg',//'sm',
				resolve: {
					friendModal:function(){
						that.dataFriendModal.friendObj = item ? item :{};
						return that.dataFriendModal ;
					}
				}
			}).result.then(function (selectedItem) {},that);
		}
	}
});
