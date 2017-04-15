app.directive('gMouseOut',($parse)=>{
	return (scope,element,attrs)=>{
		var fn = $parse(attrs.gMouseOut);
		element.on('mouseout', _onMouseout);
		scope.$on('$destroy', function() {
			element.off('mouseout', _onMouseout);
		});
		function _onMouseout(e){
			scope.$apply(function() {
				e.preventDefault();
				fn(scope, {$event:e});
			});
		}
	};
});