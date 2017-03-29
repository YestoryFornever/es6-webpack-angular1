let bargainlistComponent = {
	restrict: 'E',
	bindings: {
		friend:"=",
		changeFriend:'&'
	},
	templateUrl: './bargainlist.html',
	controller: BargainlistController
};

