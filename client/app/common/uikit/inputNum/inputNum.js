app.component('inputNum', {
	restrict: 'E',
	bindings: {
		place:'@',
		// ourName:'@',
		onGetValue:"&",
	},
	templateUrl: './inputNum.html',
	controller: InputNumController
});
