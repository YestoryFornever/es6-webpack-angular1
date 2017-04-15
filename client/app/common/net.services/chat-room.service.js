app.factory('chatroomService',['$http','$q','ProxyRequestService',function($http,$q,ProxyRequestService){
	// console.log(BONDCONFIG);
	return {
		/**
		 * [addBatchBondQuote description]
		 * @param {[type]} quoteListChecked [description]
		 */
		addBatchBondQuote(params){//批量新增报价
			return ProxyRequestService.post(
				'e-bondquote/bondOfr/addBatchBondQuote',
				JSON.stringify(params),
				BONDCONFIG.JH
			);
		},
		queryBargainDetail(params){
			return ProxyRequestService.post(
				'e-bondquote/bondNegtprc/queryNegtprcDtlList',
				JSON.stringify(params),
				BONDCONFIG.JH
			);
		},
		publishBargain(params){
			return ProxyRequestService.post(
				'e-bondquote/bondNegtprc/addNegtprcDetail',
				JSON.stringify(params),
				BONDCONFIG.JH
			);
		},
		updateBargainState(params){
			return ProxyRequestService.post(
				"e-bondquote/bondNegtprc/updateNegtprcState",
				JSON.stringify(params),
				BONDCONFIG.JH,
			);
		},
		sendBondQuote(params){
			return ProxyRequestService.post(
				"e-bondquote/bondNegtprc/sendBondQuote",
				JSON.stringify(params),
				BONDCONFIG.JH,
			);
		},
		getBargainHistory(params){
			return ProxyRequestService.post(
				"e-bondquote/bondNegtprc/queryBondNegtprcDtlList",
				JSON.stringify(params),
				BONDCONFIG.JH,
			);
		},
		opYield(params){
			return ProxyRequestService.post(
				"ainas/bond/calSettlementAmountYieldForCM",
				JSON.stringify(params),
				BONDCONFIG.JH,
			);
		},
		opNetprc(params){
			return ProxyRequestService.post(
				"ainas/bond/calSettlementAmountCleanPriceForCM",
				JSON.stringify(params),
				BONDCONFIG.JH,
			);
		},
		opNum(params){
			return ProxyRequestService.post(
				"ainas/bond/calSettlementAmountYieldForCM",
				JSON.stringify(params),
				BONDCONFIG.JH,
			);
		},
		updateMsgNum(params){
			return ProxyRequestService.post(
				"e-bondquote/bondNegtprc/updateMsgNum",
				JSON.stringify(params),
				BONDCONFIG.JH,
			);
		},
	}
}]);
