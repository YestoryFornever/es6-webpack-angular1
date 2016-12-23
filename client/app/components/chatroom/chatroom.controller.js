class ChatroomController {
	constructor($stateParams) {
		this.name = 'chatroom';
		this.$stateParams = $stateParams;
		this.name = $stateParams.id;
	}
}
ChatroomController.$inject = ['$stateParams'];
export default ChatroomController;
