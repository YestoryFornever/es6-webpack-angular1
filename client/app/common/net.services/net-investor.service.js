app.factory('netInvestorService', function (ProxyRequestService) {
    return {
        applicationList(params){
            return ProxyRequestService.post('e-bonddstr/bonddstr/getSbrbList', params);
        },
        addApplication(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/addSbrb", params);
        },
        searchUser(params) { // 搜索机构联系人名称
            return ProxyRequestService.post("e-bonddstr/bonddstr/getRcptyInstTeamUserList", params);
        },
        outAppList(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getSbrbHisList", params);
        },
        sendApplication(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/sndrIvsrSbrb", params);
        },
        myApplication(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getIvsSbrbStat", params);
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
        updateList(params) { //更新发送方申购, 更新未发送/已读+录入
            return ProxyRequestService.post("e-bonddstr/bonddstr/updateSndrSbrb", params);
        },
        outAppFile(params) {
            return ProxyRequestService.get("e-bonddstr/bonddstr/exportSbrbList", params);
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
        readClient(params) { // 读取债券申购统计
            return ProxyRequestService.post("e-bonddstr/bonddstr/rdBondSbrbStat",params);
        },
        sendClient(params) { //转发债券申购统计, 转发给客户
            return ProxyRequestService.post("e-bonddstr/bonddstr/tfrBondSbrbStat", params);
        },
        getDownLoad(params) { // 导出
            return ProxyRequestService.get("e-bonddstr/bonddstr/exportSbrbList", params);
        },
        editSelectedWinbid(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/updateSndrWinbid", params);
        }
    }
});
