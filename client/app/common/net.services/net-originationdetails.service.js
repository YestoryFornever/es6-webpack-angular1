/*
* @Author: 机构详情
* @Date:   2017-04-13 17:26:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-13 17:35:11
*/

app.factory('originationdetailsService', function($http, $q, ProxyRequestService) {
	// console.log(BONDCONFIG);
	return {

		qinfoList(obj) { //快讯
			return ProxyRequestService.post('e-xpress/sns/qinfoList.json', {
				uid: obj.uid,
				cur_page: obj.cur_page,
				last_id: '0'
			});

		},
		// 4.1.7获取债券横条信息(发行信息)
		// getBondBarInfo(obj) {
		// 	return ProxyRequestService.post('e-bonddstr/bonddstr/getBondBarInfo', {
		// 		userId: obj.userId,
		// 		issuId: obj.issuId,
		// 	});
		// },
	}
});