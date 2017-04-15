app.factory('BondDstrMainService',function(ProxyRequestService){
	return {
		//主承
		getBondSbrbStat(params){//获取债券申购统计4.3.1
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getBondSbrbStat',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		updateBondSbrbStat(params){//更新债券申购统计4.3.2
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/updateBondSbrbStat',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		immClsBid(params){//立即截标4.3.4
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/immClsBid',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		getCustSbrbStat(params){//获取客户申购统计4.3.5
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getCustSbrbStat',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		getCustSbrbList(params){//获取客户申购列表4.3.6
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getCustSbrbList',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		getSndrInstTeamUserList(params){//获取发送方机构团队人员列表4.3.8
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getSndrInstTeamUserList',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		addCustSbrb(params){//添加客户申购(批量)4.3.9
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/addCustSbrb',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		getCustSbrbWinbidList(params){
			return ProxyRequestService.post(//获取客户申购中标结果4.3.15
				'e-bonddstr/bonddstr/getCustSbrbWinbidList',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		//公共部分
		getPnp(params){//获取负责人4.5.3
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/getPnp',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
		},
		updatePnp(params){//更新负责人4.5.4
			return ProxyRequestService.post(
				'e-bonddstr/bonddstr/updatePnp',
				JSON.stringify(params),
				BONDCONFIG.JH
			)
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