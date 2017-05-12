
/**
 * 时间组件
 * <input type="text" datetimepicker ng-model="data" />|{{data}}|
 * @link http://eonasdan.github.io/bootstrap-datetimepicker/Functions/#date
 */
app.directive('datetimepicker', function($parse, $interval){
	return {
		require : ['^?form', 'ngModel'],
		restrict: 'AE',
		link: function(scope, element, attrs, ctrl) {
			var ngModelCtrl = ctrl[1];

			attrs.format = attrs.format||'YYYY-MM-DD HH:mm';
			var input = $(element).datetimepicker({
				format: attrs.format,
			});
			input.on('dp.change',function(e){
				ngModelCtrl.$setViewValue(e.date.format(attrs.format));
			});
			// input.data("DateTimePicker").disable()
			
			ngModelCtrl.$render = function () {
				scope.$evalAsync(function () {
					input.val(ngModelCtrl.$viewValue);
				});
			}
		}
	};
});