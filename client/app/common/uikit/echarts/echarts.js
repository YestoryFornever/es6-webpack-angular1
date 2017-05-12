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
			var wrap = $('<div></div>').css({
				width: scope.width||'100%',
				height: scope.height||'210'
			});
			$(element).css({
				display:'block',
				width: scope.width||'100%',
				height: scope.height||'210'
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