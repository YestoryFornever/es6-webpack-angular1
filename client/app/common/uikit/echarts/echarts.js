/**
 * 
 */
app.directive('echarts', function($parse, $interval){
	return {
		restrict: 'AE',
		replace: true,
		scope: {
			options: '=',
			height: '@',
			width: '@'
		},
		link: function(scope, element, attrs, ctrl) {
			$(element).css({
				width: scope.width||370,
				height: scope.height||210
			});
			var myChart = echarts.init(element[0]);
			myChart.resize();

			scope.$watch('options', function(n, o){
				if (typeof(n)=='object') {
					myChart.setOption(scope.options);
					
				};
			});
			
		}
	};
});