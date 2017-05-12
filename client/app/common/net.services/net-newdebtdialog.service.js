app.factory('NewdebtdialogModalService', function($http, $q, ProxyRequestService, $uibModal) {
	return {
		open: function(item) {
			return $uibModal.open({
				animation: true,
				component: 'newdebtdialog',
				size: 'xl', //'lg',//'sm',
				resolve: {
					newdebtdialogModal: function() {
						item = item ? item : {};
						return item;
					}
				}
			}).result.then(function(selectedItem) {});
		},
		// 4.5.1我要分销
		iWantDstr(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/iWantDstr', {
				userId: obj.userId,
				issuId: obj.issuId,
				dstrBondId: obj.dstrBondId
			});
		},
		// 4.1.7获取债券横条信息(发行信息)
		updateOfrEStatus(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/getIssuDetail', {
				userId: obj.userId,
				issuId: obj.issuId,
				dstrBondId: obj.dstrBondId,
				rcptyUserId: obj.rcptyUserId,
				rcptyTeamId: obj.rcptyTeamId,
				rcptyInstId: obj.rcptyInstId
			});
		},
		// 4.5.6我要申购
		// bondSbrbVOList:[{
		// rcptyInstId: obj.rcptyInstId,
		// rcptyTeamId: obj.rcptyTeamId,
		// rcptyUserId: obj.rcptyUserId,
		// sbrbIntrt: obj.sbrbIntrt,
		// sbrbNum: obj.sbrbNum,
		// dlvTp: obj.dlvTp,
		// sellrMod: obj.sellrMod,
		// sbrbChnl: 1,
		// rmrk: obj.rmrk,
		// }]
		addSbrb(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/iWantSbrb', {
				userId: obj.userId,
				issuId: obj.issuId,
				dstrBondId: obj.dstrBondId,
				bondSbrbVOList: obj.bondSbrbVOList



			});
		},

		// 4.5.6计算综收利率

		clcCprsvPftIntrt(obj) {
			return ProxyRequestService.post('e-bonddstr/bonddstr/clcCprsvPftIntrt', {
				sbrbIntrt: obj.sbrbIntrt,
				retFee: obj.retFee,
				trm: obj.trm,

			});
		},
		// 计算票面利率
		clcSbrbIntrt(obj) {
			console.log(obj);
			return ProxyRequestService.post('e-bonddstr/bonddstr/clcSbrbIntrt', {
				cprsvPftIntrt: obj.cprsvPftIntrt,
				retFee: obj.retFee,
				trm: obj.trm,
			});
		},
	}
});