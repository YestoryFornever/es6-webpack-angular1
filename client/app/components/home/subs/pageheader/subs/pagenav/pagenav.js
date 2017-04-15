app.component('pagenav', {
	restrict: 'E',
	bindings: {
		nav:'<',
	},
	templateUrl: './pagenav.html',
	controller: PagenavController
});
