/*
 * @Author: Administrator
 * @Date:   2017-03-21 19:21:42
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-04-27 13:55:16
 */
/*
 * 债券分销详情
 */
app.factory('newdebtinformationdetailsService', function($http, $q, ProxyRequestService) {
	// console.log(BONDCONFIG);
	return {

		// 4.1.7获取债券横条信息(发行信息)
		getBondBarInfo(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/getBondBarInfo', {
				userId: obj.userId,
				issuId: obj.issuId,
			});
		},
		//获取债券基本信息
		getBondDetail(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/getBondDetail', {
				userId: obj.userId,
				issuId: obj.issuId,
			});
		},
		// 4.1.6获取承销团列表
		getUwrtGrpList(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/getUwrtGrpList', {
				userId: obj.userId,
				issuId: obj.issuId,
			});
		},
		// 4.1.4获取债券发行人信息
		getIssuerInfo(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/getIssuerInfo', {
				userId: obj.userId,
				issuId: obj.issuId,
			});
		},
		// 4.1.5获取债券日历
		getBondCdr(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/getBondCdr ', {
				userId: obj.userId,
				issuId: obj.issuId,
			});
		},
		// 4.5.2获取分销好友列表
		getDstrFriendList(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/getDstrFriendList ', {
				userId: obj.userId,
				issuId: obj.issuId,
				dstrBondId:obj.dstrBondId
			});
		},
		//直播接口e-xlive/livemain/liveBond
		liveBond(obj) {
			return ProxyRequestService.post('e-xlive/livemain/liveBond ', {
				bondID:obj.bondID
			});
		},
		// 4.2.2进入直播
		enterLive(obj) {
			return ProxyRequestService.post('e-xlive/livemain/enterLive ', {
				live_id:obj.live_id,
				uid:obj.uid,
				user_role:obj.user_role
			});
		},
	}

});