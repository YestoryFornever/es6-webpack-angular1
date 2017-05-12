app.factory('NetHealdCalculatorService', function(ProxyRequestService) {
	var resultData = {};
    /**
     * 4.6.4	模糊查询债券（最多10条）
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    resultData.fluzzyEnqrBondListService = function(data) {
        var url = "e-bonddstr/bonddstr/fluzzyEnqrBondList";
        return ProxyRequestService.post(url, {
        	value:data.value
        });
    };
    /**
     * 4.6.16	综收计算器
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    resultData.cprsvClcService = function(data) {
        var url = "e-bonddstr/bonddstr/cprsvClc";
        return ProxyRequestService.post(url, {
			retFee:data.retFee,
			sbsrbPrc:data.sbsrbPrc,
			sbrbIntrt:data.sbrbIntrt,
			cprsvPftIntrt:data.cprsvPftIntrt,
			sbsrbNum:data.sbsrbNum,
			trm:data.trm,

        });
    };
    return resultData;
});