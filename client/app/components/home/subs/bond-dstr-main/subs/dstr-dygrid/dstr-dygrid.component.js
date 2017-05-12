let dstrDygridComponent = {
	restrict: 'E',
	bindings: {
		editabled:"=",
		diseditabled:"=",
		ids:"<",
		bools:"=",
		trClick:"&",
		trDbclick:"&",
		fnList:"&",
		noPager:"@?"
	},
	templateUrl: './dstr-dygrid.html',
	controller: DstrDygridController
};
