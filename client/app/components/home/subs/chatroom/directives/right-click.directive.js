app.directive('gRight',($parse)=>{
	return (scope,element,attrs)=>{
		var fn = $parse(attrs.gRight);
		element.on('contextmenu', _onRight);
		scope.$on('$destroy', function() {
			element.off('contextmenu', _onRight);
		});
		function _onRight(e){
			scope.$apply(function() {
				e.preventDefault();
				fn(scope, {$event:e});
			});
		}
	};
});