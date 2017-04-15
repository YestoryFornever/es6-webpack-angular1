
app.component('acoupond', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './acoupond.html',
	controller: AcoupondController
});
