let chatModelComponent = {
	restrict: 'E',
	bindings: {
		chatOption:'@?',//暂时无用
		userSingle:'<',//String
		userMultiple:'<',//Array
		quickInfo:'<',
		msgStatistics:'=',//Object 
		isSingle:'=?',//boolean
		uniFlag:'@'
	},
	templateUrl: './chat-model.html',
	controller: ChatModelController
};
