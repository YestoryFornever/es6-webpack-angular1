class ChatroomController {
	constructor($stateParams) {
		this.name = 'chatroom';
		this.$stateParams = $stateParams;
		this.name = $stateParams.id || 'chatroom';
	}
}
ChatroomController.$inject = ['$stateParams'];
export default ChatroomController;
