app.component('sendAlert', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './sendAlert.html',
	controller: function($scope,$state, NetBondquotationService, FriendsModalService){
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
				FriendsModalService.open(item);
			};
				
			this.modalInstance.close(item);
		}
	}
});
