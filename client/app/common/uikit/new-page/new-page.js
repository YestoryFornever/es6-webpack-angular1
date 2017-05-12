app.component('newPage', {
	restrict: 'EA',
	require: {
		ngModel: '^ngModel'
	},
	bindings: {
		previousText:'=',
		totalItems:'=',
		nextText:'=',
		maxSize:'@',
		itemsPerPage:'=',
		ngChange:'&',
	},
	templateUrl: './new-page.html',
	controller: function($scope,$state,$stateParams, UikitPager){
		'ngInject';
		this.$onInit = function(){
			var ngModel = this.ngModel;
			$scope.Pager = new UikitPager(10, 5);
			ngModel.$render = function(){
				$scope.$ctrl.pageNum = parseInt(ngModel.$viewValue);
				$scope.Pager.setPage(ngModel.$viewValue);
			}

			
			$scope.Pager.onSelected = function(page){
				ngModel.$setViewValue(page);
				console.log(page)
			}
			$scope.$watch('$ctrl.totalItems', function(n){
				$scope.Pager.setTotal(n);
			});
			

			$scope.change = function(){
				ngModel.$setViewValue($scope.$ctrl.pageNum);
			};
			$scope.fn = function(){
				$scope.$ctrl.pageNum= $scope.toWhichPage> $scope.numPages ? $scope.numPages:$scope.toWhichPage;
				ngModel.$setViewValue($scope.$ctrl.pageNum);
			}
		}
	},
});
