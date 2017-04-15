app.directive('gridView', function($compile){
	"ngInject";
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			fields: '<',
			items: '=',
			searchQuery: '=query',
			trClick: '&',
			trDblclick: '&',
		},
		templateUrl: './gridview.html',
		link: function(scope, element, attrs, ctrl){
			scope.$ctrl.fields = scope.fields;
			scope.$ctrl.searchQuery = scope.searchQuery;
			var searchQuery = scope.searchQuery;

			scope._thClick = function(field){
				field.thClick && field.thClick();
				if (field.order) {
					searchQuery.desc = searchQuery.desc==2?1:2;
					searchQuery.order = field.order;
				};
			};
			scope._trClick = function(item, index){
				scope.trClick({$item: item, $index: index});
			}
			scope._trDblclick = function(item, index){
				scope.trDblclick({$item: item, $index: index});
			}

			scope.showHtml = function(html){
				var el =  $compile(html)(scope);
				return el;
			}
			// scope.$watch('items', function(n){
			// 	scope.items = n;
			// });
		}
	}
}).directive('gridViewTd', function($compile, $parse){
	return {
		restrict: 'EA',
		replace: true,
		link: function(scope, element, attrs, ctrl){
			var html = $parse(attrs.gridViewTd)(scope);
			element.html(html);
			var el =  $compile(element.contents())(scope);
			element.replaceWith(el);
    		
		}
	}
});