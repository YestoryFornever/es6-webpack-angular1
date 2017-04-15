let pubReportDialogComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve:"<"
	},
	templateUrl: './pub-report-dialog.html',
	controller: PubReportDialogController,
	controllerAs:'$instanceCtrl',
};
