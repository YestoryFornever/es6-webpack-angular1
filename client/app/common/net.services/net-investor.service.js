app.factory('netInvestorService', function (ProxyRequestService) {
    return {
        applicationList(params){
            return ProxyRequestService.post('e-bonddstr/bonddstr/getSbrbList', params);
        },
        addApplication(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/addSbrb", params);
        },
        searchUser(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getInstTeamUserList", params);
        },
        outAppList(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/getSbrbHisList", params);
        },
        sendApplication(params) {
            return ProxyRequestService.post("e-bonddstr/bonddstr/sndrSbrb", params);
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
        }
    }
});
