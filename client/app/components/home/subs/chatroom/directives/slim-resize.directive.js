app.directive('slimResize',['$parse', function($parse){
	return {
		restrict: 'A',
		scope:{},
		link: function(scope, element, attrs) {
			let _w = $(window),_rule = (!!attrs.slimResize?$(document.getElementById(attrs.slimResize)):element.parent());
			_w.on('resize', _onRefresh);
			scope.$on('$destroy', function() {
				_w.off('resize', _onRefresh);
			});
			_onRefresh();
			function _onRefresh(){
				let option = scope.$eval(element.attr('slimscroll').replace(/{{.*?}}/g,'250'))||{};
				option.height = _rule.height();
				setTimeout(()=>{
					element.slimScroll({ destroy: true });
					element.slimScroll(option);
				},20);
			}
		}
	};
}]);