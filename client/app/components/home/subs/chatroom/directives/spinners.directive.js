app.directive('gSpinner',['$parse','transferService', function($parse,transferService){
	return {
		restrict: 'E',
		template:`
			<div class="g-spinner-spin">
				<span class="g-spinner-up"></span>
				<span class="g-spinner-down"></span>
			</div>
			<div class="g-spinner-input">
				<input ng-model="gModel"/>
			</div>
		`,
		scope:{
			gModel:'=gModel',
			degree:'@',
			gBlur:'&',
			gFocus:'&',
			gClick:'&'
		},
		link: function(scope, element, attrs) {
			let $input = element.find('.g-spinner-input input');
			$input.on('focus',focus).on('blur',blur);
			let $upbtn = element.find('.g-spinner-up').on('click',add);
			let $downbtn = element.find('.g-spinner-down').on('click',minus);
			function focus () {
				scope.gFocus();
			}
			function blur () {
				scope.gBlur();
			}
			function add(){
				scope.gClick();
				scope.$apply(()=>{
					scope.gModel = transferService.decimals(Number(scope.gModel) + Number(scope.degree),4);
				});
				scope.gBlur();
			}
			function minus(){
				scope.gClick();
				scope.$apply(()=>{
					scope.gModel = transferService.decimals(Number(scope.gModel) -  Number(scope.degree),4);
				});
				scope.gBlur();
			}
			scope.$on('$destroy', function() {
				$upbtn.off('click',add);
				$downbtn.off('click',minus);
			}); 
		}
	};
}]);