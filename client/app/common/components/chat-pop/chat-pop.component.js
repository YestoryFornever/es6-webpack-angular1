let chatPopComponent = {
	restrict: 'E',
	bindings: {
		popDrc:'<',
		popType:'<',
		popTime:'<',
		popMessage:'<'
	},
	templateUrl: './chat-pop.html',
	controller: ChatPopController
};
