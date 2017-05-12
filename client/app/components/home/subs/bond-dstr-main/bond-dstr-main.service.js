app.factory('BondDstrMainService',function(ProxyRequestService){
	return {
		//主承
		getBondSbrbStat(params){//获取债券申购统计4.3.1*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getBondSbrbStat',params,BONDCONFIG.JH
			)
		},
		updateBondSbrbStat(params){//更新债券申购统计4.3.2*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/sendBondSbrbStat',params,BONDCONFIG.JH
			)
		},
		immClsBid(params){//立即截标4.3.4*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/immClsBid',params,BONDCONFIG.JH
			)
		},
		rsmSbrb(params){//恢复申购4.3.5
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/rsmSbrb',params,BONDCONFIG.JH
			)
		},
		getCustSbrbStat(params){//获取客户申购统计4.3.5*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getCustSbrbStat',params,BONDCONFIG.JH
			)
		},
		getCustSbrbList(params){//获取客户申购列表4.3.6*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getCustSbrbList',params,BONDCONFIG.JH
			)
		},
		getSndrInstTeamUserList(params){//获取发送方机构团队人员列表4.3.8*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getSndrInstTeamUserList',params,BONDCONFIG.JH
			)
		},
		addCustSbrb(params){//添加客户申购(批量)4.3.9*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/addCustSbrb',params,BONDCONFIG.JH
			)
		},
		updateCustSbrb(params){//4.3.10	更新客户申购--录入的*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/updateCustSbrb',params,BONDCONFIG.JH
			)
		},
		whlAlrdyRead(params){//4.3.11	全部已读*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/whlAlrdyRead',params,BONDCONFIG.JH
			)
		},
		updateCustSbrbEstatus(params){//4.3.12	更新客户申购状态*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/updateCustSbrbEstatus',params,BONDCONFIG.JH
			)
		},
		bondallocationlist(params){ //中标分配列表
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/bondallocationlist',params,BONDCONFIG.JH
			)
		},
		alctWinBid(params){//4.3.13	分配中标
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/alctWinBid',params,BONDCONFIG.JH
			)
		},
		sendAllWinbidList(params){//4.3.14	发送中标结果
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/sendAllWinbidList',params,BONDCONFIG.JH
			)
		},
		sendPartWinbidList(params){//4.3.14	发送中标结果
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/sendPartWinbidList',params,BONDCONFIG.JH
			)
		},
		getCustSbrbWinbidList(params){
			return ProxyRequestService.post(//获取客户申购中标结果列表 4.3.15*
				'e-bonddstr/bonddstr/getCustSbrbWinbidList',params,BONDCONFIG.JH
			)
		},
		exportPrimUdwrCustSbrbList(params){
			return ProxyRequestService.get(//4.3.16	导出主承销商客户申购列表
				'e-bonddstr/bonddstr/exportPrimUdwrCustSbrbList',params
			)
		},
		getCustSbrbHisList(params){
			return ProxyRequestService.post(//4.3.17	获取客户申购历史列表*
				'e-bonddstr/bonddstr/getCustSbrbHisList',params,BONDCONFIG.JH
			)
		},
		updateRcptyNewMsgInd(params){
			return ProxyRequestService.post(//4.3.18	更新接收方新消息标志
				'e-bonddstr/bonddstr/updateRcptyNewMsgInd',params,BONDCONFIG.JH
			)
		},
		deleteRcptySbrb(params){
			return ProxyRequestService.post(//4.3.19	删除接受方申购*
				'e-bonddstr/bonddstr/deleteRcptySbrb',params,BONDCONFIG.JH
			)
		},
		//公共部分
		getPnp(params){//获取负责人4.5.3*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getPnp',params,BONDCONFIG.JH
			)
		},
		updatePnp(params){//更新负责人4.5.4*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/updatePnp',params,BONDCONFIG.JH
			)
		},
		clcCprsvPftIntrt(params) {//4.5.6	计算综收利率*
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/clcCprsvPftIntrt',params,BONDCONFIG.JH
			);
		},
		clcSbrbIntrt(params) {//4.5.7	计算票面利率*
			return ProxyRequestService.post('e-bonddstr/bonddstr/clcSbrbIntrt',params)
		},
		//
		test(val){
			return ProxyRequestService.get('//maps.googleapis.com/maps/api/geocode/json', {
				params: {
					address: val,
					sensor: false
				}
			});
		}
	}
});