
app.component('acoupond', {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	templateUrl: './acoupond.html',
	controller: function($scope, NetAcoupondService, $state, $stateParams, userStatusService){
		/**
		 * 获取好友列表
		 */
		NetAcoupondService.myFriends({})
		.then((res)=>{
			this.friendLists = res.data.data;
		});
		/**
		 * 获取群组列表
		 */
		NetAcoupondService.groupMy({
			userId: userStatusService.uid,
			usrAhr: ''
		}).then((res)=>{
			this.grouplists = res.data.data;
		});
		/**
		 * 选择的好友数
		 * @type {Number}
		 */
		this.count_friend = 0;
		this.countByFriend = function(){console.log(11111)
			var i=0;
			angular.forEach(this.friendLists, function(item){
				if(item.is_seleced)i++;
			});
			this.count_friend = i;
		}
		/**
		 * 选择的群组数
		 * @type {Number}
		 */
		this.count_group = 0;
		this.countByGroup = function(){
			var i=0;
			angular.forEach(this.grouplists, function(item){
				if(item.is_seleced)i++;
			});
			this.count_group = i;
		}
		/**
		 * 关闭窗口
		 * @return {[type]} [description]
		 */
		this.closeDialog = function() { //关闭弹窗
			this.modalInstance.close();

		}
		/**
		 * 发送事件
		 * @return {[type]} [description]
		 */
		this.sendOffer = function(){
			var friendLists = _.filter(this.friendLists, function(item){
				return item.is_seleced;
			});
			var grouplists = _.filter(this.grouplists, function(item){
				return item.is_seleced;
			});
			if (this.resolve && this.resolve.onSend) {
				this.resolve.onSend(friendLists, grouplists);
			};
		}
		
	}
});
