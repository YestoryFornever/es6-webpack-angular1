app.directive('number', function ($parse, $timeout) {
	return {
		require : ['^?form', 'ngModel'],
		restrict: 'AE',
		repalce:true,
		scope: {
			items: '<',
			model: '=ngModel',
			class:'=ngClass',
		},
		link: function(scope, element, attrs, ctrl) {
			var _ngModelCtrl = ctrl[1];
			var _form = ctrl[0];
			scope.$watch('model',(newValue,old)=>{
				newValue =  Number(newValue);
				if(newValue){
					_ngModelCtrl.$setViewValue(newValue);
				}else{
					_ngModelCtrl.$setViewValue(old);
				}
			})
		}
	};
});
