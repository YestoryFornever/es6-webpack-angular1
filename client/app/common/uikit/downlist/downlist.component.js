app.component('downlist', {
	restrict: 'E',
	bindings: {
		data: '<',
		placeholder: '@',
		model: '=ngModel'
	},
	templateUrl: './downlist.html',
	controller: function($scope, $element)
	{
		$($element).find('.dropdown-menu').click(function(e){
			e.stopPropagation();
		});

		$scope.selected = {};
		$scope.placeholder = this.placeholder||'请选择';
		$scope.listOfItems = this.data;

		$scope.$watchCollection('model', function(n, o){
			console.log(n, o);
		});

		$scope.getSelecteds = function(){
			var _items = [];
			angular.forEach($scope.listOfItems, function(item){
				if (item.children) {
					angular.forEach(item.children, function(item2){
						if (item2.checked) {
							_items.push(angular.copy(item2));
						};
					});
				};
				if (item.checked) {
					_items.push(angular.copy(item));
				};
			});
			$scope.selected.items = _items;
			$scope.$ctrl.model = _items;
			return _items;
		};
	}
});
