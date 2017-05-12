/**
 * 提示框 发送议价给好友或挂牌到大厅的弹窗
 */
app.factory('SendAlertService', function($http,$q,$uibModal, NetAcoupondService, easeMobService){
	return {
		/**
		 * 提示框 发送议价给好友或挂牌到大厅的弹窗
		 */
		open(item){
			return $uibModal.open({
				animation: true,
				component:'sendAlert',
				windowClass:'my-send-alert',
				size: 'xs',//'lg',//'sm',
				resolve: {
					item: item
				}
			}).result;
		},
		/**
		 * 发送议价给好友
		 * @param  {[Array]} friends 好友列表
		 * @param  {[Object]} item    债券详情
		 * @return {[type]}         [description]
		 */
		sendBargainingToFriend(friends, item){
			var oppositeUserIds = [];
			angular.forEach(friends, function (friend) {
				oppositeUserIds.push(friend.oppositeUserId);
			})
			return NetAcoupondService.sendBondPrice({
				bondOfrid: item.bondOfrid,
				negtprcUserId: oppositeUserIds.join(','),
			}).then((res)=>{
				var bondNegtprcids = res.data.data.split(',');
				angular.forEach(bondNegtprcids, function(bondNegtprcid, i){
					var data = {
						ext_msg_type: '20',
						ext_message: '您收到一条新的报价',
						bondid: item.bondid,
						bondShrtnm: item.bondShrtnm,
						bondCd: item.bondCd,
						drc: item.drc,
						netprc: item.netprc,
						yldrto: item.yldrto,
						num: item.num,
						bondOfrid: item.bondOfrid,
						bondNegtprcid: bondNegtprcid,
						ofrUserId: item.ofrUserId
					};
					easeMobService.sendMsg(null, data, friends[i].oppositeUserId);
				});
				
			});
		},
		/**
		 * 发送议价给群组
		 * @param  {[Array]} friends 好友列表
		 * @param  {[Object]} item    债券详情
		 * @return {[type]}         [description]
		 */
		sendBargainingToGroup(groups, item){
			return $q.when().then(()=>{
				var res = null;
				angular.forEach(groups, function(group, i){
					var data = {
						ext_msg_type: 20,
						ext_message: '您收到一条新的报价',
						bondid: item.bondid,
						bondShrtnm: item.bondShrtnm,
						bondCd: item.bondCd,
						drc: item.drc,
						netprc: item.netprc,
						yldrto: item.yldrto,
						num: item.num,
						bondOfrid: item.bondOfrid,
						// bondNegtprcid: bondNegtprcid, //群组没有议价ID
						ofrUserId: item.ofrUserId,
					};
					res = easeMobService.sendMsgToGroup(null, data, group.ringlGroupid);
				});
				return res;
			});
		},
	}
});