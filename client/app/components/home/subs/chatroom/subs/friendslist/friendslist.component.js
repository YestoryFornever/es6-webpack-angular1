let friendslistComponent = {
	restrict: 'E',
	bindings: {
		switchFriend:'&switchChat'
	},
	templateUrl: './friendslist.html',
	controller: FriendslistController
};
