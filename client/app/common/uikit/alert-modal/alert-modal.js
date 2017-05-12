app.component('alertModal', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './alert-modal.html',
	controller: function($scope,AlertModalService){
		'ngInject';
		var info = this.resolve.info;
		info.title = info.title||'';
		info.content = info.content||'操作成功';
		this.info = info;
	}
});

