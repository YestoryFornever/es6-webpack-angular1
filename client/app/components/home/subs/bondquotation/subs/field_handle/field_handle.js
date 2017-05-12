app.component('fieldHandleComponent', {
	restrict: 'E',
	bindings: {
		item:'='
	},
	templateUrl: './field_handle.html',
	controller: function($scope, $q, $state,FriendsModalService, $uibModal, userStatusService, SendAlertService,nowBondService, NetBondquotationService, NetChangeBondService, NetAcoupondService, netBondTrialService, easeMobService){
		"ngInject";
		$scope.netBondTrialService =netBondTrialService;
		$scope.FriendsModalService =FriendsModalService;
		// console.log(netBondTrialService)

		/**
		 * 挂牌到大厅或发送给好友
		 * @return {[type]} [description]
		 */
		$scope.openFirendOrOnLine = function(item){
			SendAlertService.open(item);
		}

		/**
		 * 发送报价给好友
		 * @return {[type]} [description]
		 */
		$scope.sendToFriend = function(item){
			var uiModal = FriendsModalService.open(function(friends, groups){
				console.log(item, friends, groups);
				$q.all([
					SendAlertService.sendBargainingToFriend(friends, item),
					SendAlertService.sendBargainingToGroup(groups, item)
				]).then((res)=>{
					uiModal.close();
				});
			});
		}

		$scope.openChange = function(item){//修改报价
			$uibModal.open({
				animation: true,
				component:"changeBond",
				windowClass:'my-change-bond',
				size: 'xl',
				resolve: {
					item: item
				}
			}).result;
		}
		/**
		 * 撤销报价
		 */
		$scope.bondDown = function(item,ev){
			ev.stopPropagation();
			item.ofrEStatus = 2;
			NetBondquotationService.updateQuoteState({
				bondOfrid: item.bondOfrid,
				ofrEStatus: item.ofrEStatus,
			}).then((res)=>{
				console.log(123)
				$state.go('home.bondquotation',{},  {reload: true});
			});
		}
		/**
		 * 重新报价
		 * 打开发送报价弹窗
		 */
		$scope.sendQuote = function(item,ev){
			ev.stopPropagation();
			nowBondService.openNowBondModal(item);
		}

		//End Controller
	}
	


});