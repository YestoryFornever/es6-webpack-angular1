app.component('newdebtdialog', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './newdebtdialog.html',
	controller: NewdebtdialogController,
});
