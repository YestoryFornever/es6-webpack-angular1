app.factory('mywealthModalService', function($q,$uibModal) {
	return {
		open: function(item) {
			let that = this;
            that.info =item;
            let deferred = $q.defer();
			$uibModal.open({
				animation: true,
				component: 'mywealthModal',
				windowClass: "mywealthModalCss",
				size: 'lg', //'',//'sm',
				resolve: {
                        info:that.info//取open函数传的值
				}
			}).result.then(function(selectedItem) {
                deferred.resolve(that.info);
            });
            return deferred.promise;
		}
	}
});