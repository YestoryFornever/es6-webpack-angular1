class FriendslistController {
	constructor(friendRelationshipService,$stateParams,pagetabService) {
		"ngInject";
		this.friendRelationshipService = friendRelationshipService;
		this.$stateParams = $stateParams;
		this.pagetabService = pagetabService;
	}
	$onInit(){
		this.pagetabService.activeTab({
			tabKey: 'home.chatroom',
			routeState:'home.chatroom.friendslist',
			routeParams:angular.copy(this.$stateParams),
			routeLabel:'消息中心',
		});
		this.getFriendList();
		this.deleteTag = {
			show:false,
			style:{
				top:0,
				left:0
			},
			readyToDelete:undefined
		};
	}
	getFriendList(){
		this.friendRelationshipService.getFriendList()
		.then(
			data=>{
				/**
				 * iconUrl:"http://11.177.15.104/upload/head/upload/2017-02-27/f0470add3d254f0499e93b0414bf8b36.jpg"
				 * loginName:"18310380672"
				 * oppositeUserId:"108801"
				 * organizationShortName:"邢台银行"
				 * position:"开发"
				 * realCertifyState:"3"
				 * userName:"王飞"
				 * userRealName:"王飞"
				 */
				this.friends = data.data.data;
			},
			data=>console.warn("获取好友列表异常")
		);
	}
	changeUser(user){
		this.switchFriend({flag:'f',v:user});
	}
	showDeleteTag(item){
		console.log(item);
		this.deleteTag.readyToDelete = item;
		this.deleteTag.show = true;
		this.deleteTag.style.top = event.clientY-72-2;
		this.deleteTag.style.left = event.clientX-2;
	}
	hideDeleteTag(){
		this.deleteTag.show = false;
	}
	deleteFriend(){//"115202"
		// console.log(this.deleteTag.readyToDelete);
		this.friendRelationshipService.deleteFriendRelationship({
			oppositeUserId:this.deleteTag.readyToDelete.oppositeUserId
		})
		.then(
			data=>{
				console.log(data.data.msg);
				this.getFriendList();
			},
			data=>{
				data.data.status!=='0'&&console.warn(data.data.msg);
			}
		);
	}
	applyFriend(){
		this.friendRelationshipService.addFriendRelationship({
			oppositeUserId:"115202"
		})
		.then(
			data=>{
				console.log(data.data.msg);
				this.getFriendList();
			},
			data=>{
				data.data.status!=='0'&&console.warn(data.data.msg);
			}
		);
	}
}
