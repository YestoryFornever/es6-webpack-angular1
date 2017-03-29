app.directive('mutiSelect', function($parse){
	return {
		require : ['^?form', 'ngModel'],
		restrict: 'EA',
		replace: true,
		scope: {
			items: '=',
			model: '=ngModel',
			class:'=ngClass',
		},
		templateUrl: './mutiSelect.html',
		link: function(scope){

			var list = scope.items;

			var items = [];
			angular.forEach(list, function(item){
				if(item.children){
					angular.forEach(item.children, function(_item){
						_item.grougBy = item.label;
						items.push(_item);
					});
				}else{
					items.push(item);
				}
			});
			scope._items = items;
			scope.res = {};
			scope.$watchCollection('res.selecteds', function(){
				scope.model = scope.res.selecteds;
			});
			scope.$watch('model', function(n, o){
				console.log(n, o)
				scope.res.selecteds = scope.model;
			});

			scope.group = function(item){
				return item.grougBy;
			};
		},
	};
});
