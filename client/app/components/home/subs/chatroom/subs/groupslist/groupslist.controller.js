class GroupslistController {
	constructor($stateParams,pagetabService) {
		"ngInject";
		this.$stateParams = $stateParams;
		this.pagetabService = pagetabService;
		this.name = 'groupslist';
	}
	$onInit(){
		this.pagetabService.activeTab({
			tabKey: 'home.chatroom',
			routeState:'home.chatroom.groupslist',
			routeParams:angular.copy(this.$stateParams),
			routeLabel:'消息中心',
		});
	}
}

