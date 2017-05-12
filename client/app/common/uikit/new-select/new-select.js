app.directive('newSelect', function($parse, $timeout){
	return {
		require : ['^?form', 'ngModel'],
		restrict: 'EA',
		replace: true,
		scope: {
			items: '<',
			model: '=ngModel',
			class:'=ngClass',
			title:'@',

		},
		templateUrl: './new-select.html',
		link: function(scope,element, attrs, ctrl){
			var ngModelCtrl = ctrl[1];
			element.selectpicker({
				style: 'btn-default',
				noneSelectedText:"请选择",
				size: 4
			});
			var title = scope.title || '请选择';
			var is_render = false;
			$timeout(function(){
				scope.items =	_.uniq(scope.items);
				if(!element.attr('multiple')){
					let obj = angular.copy({label:'请选择',id:''});
					scope.items.unshift(obj);
				}
				_.forEach(scope.items, function(item){
					if (item.children) {
						var optgroup = $('<optgroup></optgroup>').prop('label', item.label)
						.appendTo(element);
						_.forEach(item.children, function(_item){
							$('<option></option>').text(_item.label).prop('value',_item.id)
							.appendTo(optgroup);
						});
					}else{
						$('<option></option>').text(item.label).prop('value',item.id)
						.appendTo(element);
					}
				 });
				element.prop('title',title)
				element.val(ngModelCtrl.$viewValue);
				element.selectpicker('refresh');
			},100)
			// element.on('show.bs.select', function (e) {
			// 	if(!is_render){
			// 		scope.items =	_.uniq(scope.items);
			// 		if(!element.attr('multiple')){
			// 			let obj = angular.copy({label:'请选择',id:''});
			// 			scope.items.unshift(obj);
			// 		}
			// 		_.forEach(scope.items, function(item){
			// 			if (item.children) {
			// 				var optgroup = $('<optgroup></optgroup>').prop('label', item.label)
			// 				.appendTo(element);
			// 				_.forEach(item.children, function(_item){
			// 					$('<option></option>').text(_item.label).prop('value',_item.id)
			// 					.appendTo(optgroup);
			// 				});
			// 			}else{
			// 				$('<option></option>').text(item.label).prop('value',item.id)
			// 				.appendTo(element);
			// 			}
			// 		 });
			// 		element.val(ngModelCtrl.$viewValue);
			// 		element.selectpicker('refresh');
			// 		is_render = true;
			// 	}
			// });
			// scope.$evalAsync(function () {
   //          });
			scope.$watch(attrs.ngModelCtrl, function (newVal, oldVal) {
	            element.val(newVal);
            	element.selectpicker('refresh');
            });

			ngModelCtrl.$render = function () {
				scope.$evalAsync(function () {
					element.val(ngModelCtrl.$viewValue);
					element.selectpicker('refresh');
				});
			}

		},
	};
});
