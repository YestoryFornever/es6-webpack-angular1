let chatModelComponent = {
	restrict: 'E',
	bindings: {
		chatOption:'@',
		userSingle:'<',//String
		userMultiple:'<',//Array
		quickInfo:'<'
	},
	templateUrl: './chat-model.html',
	controller: ChatModelController
};
