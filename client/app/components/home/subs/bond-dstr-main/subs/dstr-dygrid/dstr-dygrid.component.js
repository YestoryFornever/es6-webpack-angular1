let dstrDygridComponent = {
	restrict: 'E',
	bindings: {
		editabled:"=",
		diseditabled:"=",
		ids:"<",
		confirm:"&",
		bools:"="
	},
	templateUrl: './dstr-dygrid.html',
	controller: DstrDygridController
};
