let chatPopComponent = {
	restrict: 'E',
	bindings: {
		popDrc:'<',
		popType:'<',
		popTime:'<',
		popMessage:'<',
		popUserIcon:'<'
	},
	templateUrl: './chat-pop.html',
	controller: ChatPopController
};
