app.component('home', {
	restrict: 'E',
	bindings: {},
	templateUrl: './home.html',
	controller: function($scope){
		this.name = 'home';
		// $scope.$evalAsync(function(){
		// 	function resize(){
		// 		var windowHeight = $(window).height();
		// 		var headHeight = $('.pageheader').height();
		// 		var footHeight = $('.pagefooter').height();
		// 		var uiview_height = windowHeight-headHeight-footHeight;
		// 		$scope.uiview_height = uiview_height;
		// 	}
		// 	$(window).resize(resize);
		// 	resize();
		// })
		
	}
});
