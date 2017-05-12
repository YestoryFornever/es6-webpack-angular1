/*
* @Author: Administrator
* @Date:   2017-03-21 19:59:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-21 15:08:27
*/
/*
* 资讯
*/
// app.factory('netBondTrialService',['$http','$q','$uibModal','ProxyRequestService',function($http,$q, $uibModal,ProxyRequestService){
	
// }]);

app.factory('newdebtinformationService', function($http,$q ,ProxyRequestService){
	
	return {
		// 债券类型
			bondType:
			{
				// 0:{name:'全部',truthy:true,value:''},
				3:{name:'短融',truthy:false,value:'3'},
				4:{name:'超短融',truthy:false,value:'4'},
				2:{name:'中票',truthy:false,value:'2'},
				1:{name:'PPN',truthy:false,value:'1'},
				5:{name:'公司债',truthy:false,value:'5'},
				6:{name:'非公开',truthy:false,value:'6'}
				
			},
		// 期限
			endtime:
			{
				// 0:{name:'全部',truthy:true,value:''},
				1:{name:'1M',truthy:false,value:'1M'},
				2:{name:'3M',truthy:false,value:'3M'},
				3:{name:'6M',truthy:false,value:'6M'},
				4:{name:'9M',truthy:false,value:'9M'},
				5:{name:'1Y',truthy:false,value:'1Y'},
				6:{name:'3Y',truthy:false,value:'3Y'},
				7:{name:'5Y',truthy:false,value:'5Y'},
				8:{name:'7Y',truthy:false,value:'7Y'},
				9:{name:'10Y',truthy:false,value:'10Y'},
				9:{name:'>10Y',truthy:false,value:'>10Y'},
			},
		// 主体评级
			all: 
			{
				// 0:	{name:'全部',truthy:true,value:''},
				1:	{name:'AAA',truthy:false,value:'1',},
				2:	{name:'AA+',truthy:false,value:'2'},
				3:	{name:'AA',truthy:false,value:'3'},
				4:	{name:'AA-',truthy:false,value:'4'},
				5:	{name:'A+',truthy:false,value:'5'},
				99:	{name:'其他',truthy:false,value:'99'},
			},
			//发行中
		issuelist(obj){
				return ProxyRequestService.post('e-bonddstr/bonddstr/queryBondList',{
					userId:obj.userId,
					enqrTp:obj.enqrTp,
					value:obj.value,
					dstrBondId:obj.dstrBondId,
					creditTypeList:obj.creditTypeList,
					issueTermList:obj.issueTermList,
					currIssuerCreditList:obj.currIssuerCreditList,
					pageNum:obj.pageNum,
					pageSize:obj.pageSize
				});
			},
	
	
		// issuelist(obj){
		// 		return ProxyRequestService.post('e-bonddstr/bonddstr/getSbrbList',{
		// 			userId:"47ef1ae1-9e43-4c4f-951d-523b4ab6a184",
		// 			dstrBondId:14283002,
		// 			issuId: 14002,
		// 			pageNum 1,
		// 			pageSize 10
		// 		});
		// 	},
	
}
});
