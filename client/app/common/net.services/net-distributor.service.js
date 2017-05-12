app.factory('netDistributorService', function (ProxyRequestService) {
    return {
        applicationList(params){
            return ProxyRequestService.post('e-bonddstr/bonddstr/getSbrbList', params);
        },
        addApplication(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/addSbrb", params);
        },
        searchUser(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getRcptyInstTeamUserList", params);
        },
        outAppList(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getSbrbHisList", params);
        },
        sendApplication(params) { // 投资方发送
            return ProxyRequestService.post("e-bonddstr/bonddstr/sndrIvsrSbrb", params);
        },
        sendMyListInfo(params) { // 分销商 发送
            return ProxyRequestService.post("e-bonddstr/bonddstr/sndrDstbSbrb", params);
        },
        myApplication(params) { // 获取分销商申购统计, 我的申购一行信息
            return ProxyRequestService.post("e-bonddstr/bonddstr/getDstrSbrbStat", params);
        },
        checkedResult(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getWinbidList", params);
        },
        getPerson(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getPnp", params);
        },
        gotoAppAdmin(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/updatePnp", params);
        },
        readNewMsg(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/updateSndrNewMsgInd", params);
        },
        cancelMsg(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/cancelSbrb", params);
        },
        deleteApp(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/deleteSndrSbrb", params);
        },
        updateList(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/updateSndrSbrb", params);
        },
        outAppFile(params) {
            return ProxyRequestService.get("e-bonddstr/bonddstr/exportSbrbList", params);
        },
        updateMyList(params) { // 生成申购列表
            return ProxyRequestService.post("e-bonddstr/bonddstr/genSbrbList", params);
        },
        appStatistics(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getSbrbStatList", params);
        },
        clcIntrt(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/clcSbrbIntrt", params);
        },
        cprIntrt(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/clcCprsvPftIntrt", params);
        },
        getDownLoad(params) { // 导出
            return ProxyRequestService.get("e-bonddstr/bonddstr/exportSbrbList", params);
        },
        editSelectedWinbid(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/updateSndrWinbid", params);
        }
    }
});
