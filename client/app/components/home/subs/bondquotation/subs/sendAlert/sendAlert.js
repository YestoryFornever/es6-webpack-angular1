app.component('sendAlert', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './sendAlert.html',
	controller: function($scope,$state, $q, NetBondquotationService, FriendsModalService, SendAlertService){
		"ngInject";
		var item = this.resolve.item;
		this.onLine = false;
		this.friend = false;

		this.cancel = function() {
			this.modalInstance.close(item);
		}
		this.ok = function() {
			if (this.onLine) {
				item.num = item.num/10000;
				item.yldrto = item.yldrto*100;
				return NetBondquotationService.updateBondQuote(item)
				.then((res)=>{
					$state.reload(true);
					this.modalInstance.close(item);
				});
			};

			if (this.friend) {
				var uiModal = FriendsModalService.open(function(friends,groups){
					$q.all([
						SendAlertService.sendBargainingToFriend(friends, item),
						SendAlertService.sendBargainingToGroup(groups, item)
					]).then((res)=>{
						uiModal.close();
					});
				});
			};
				
			this.modalInstance.close(item);
		}
	}
});
