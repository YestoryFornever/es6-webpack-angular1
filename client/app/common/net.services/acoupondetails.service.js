/*
* @Author: Administrator
* @Date:   2017-03-21 20:12:29
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-21 20:19:14
*/
/*
*个券详情
 */

app.factory('acoupondetailsService',['$http','$q','ProxyRequestService',function($http,$q,ProxyRequestService){
	return {
//获取详细的个券信息
		
detailInfo(obj) {
	return ProxyRequestService.post("ainas/web/queryDetailBondBaseInfo",{
				bondid:obj.bondid,
			});
	},
//搜索
searchBondBreed(obj){
	return ProxyRequestService.post("ainas/bond/fuzzyMatchingForBond",{
				keyword:'',
			});

	},







}






}]);