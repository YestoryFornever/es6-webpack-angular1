/*
 * @Author: 机构详情
 * @Date:   2017-04-13 17:26:33
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-04-20 15:12:31
 */

app.factory('originationdetailsService', function($http, $q, ProxyRequestService) {
	// console.log(BONDCONFIG);
	return {

		sweepHisList(obj) { //4.3.11往期扫雷列表
			return ProxyRequestService.post('e-xpress/sns/sweepHisList.json', {
				uid: obj.uid,
				bound_org_id: obj.bound_org_id,
				cur_page: obj.cur_page
			});
		},
		getISSUERByIssuerId(obj) { //4.9.6根据发行机构id查询发行机构主体信息
			return ProxyRequestService.post('E_project_base/authority/getISSUERByIssuerId.json', {
				issuerId: obj.issuerId,

			});
		},
		orgFinance(obj) { // 4.3.15机构财务信息
			return ProxyRequestService.post('e-xpress/sns/orgFinance.json', {
				org_id: obj.org_id

			});
		},
		bondInfoByIssueId(obj) { //依据传入的机构id查询该机构发行的债券列表
			return ProxyRequestService.post('ainas/institution/bondInfoByIssueId', {
				issuerId: obj.issuerId
			});
		},
		insRankById(obj) { //根据机构id获取最新评级
			return ProxyRequestService.post('ainas/institution/insRankById', {
				issuerId: obj.issuerId
			});
		},
		calSettlementAmountCleanPriceForCM(obj) { //1.1.5计算传入机构所发行的所有有效债券的未来现金流并合并统计
			return ProxyRequestService.post('/ainas/institution/calInsCashFlow', {
				issuerId: obj.issuerId,
				analysisDay: obj.analysisDay
			});
		},

	}
});