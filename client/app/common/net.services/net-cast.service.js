app.factory('netCastService', function (ProxyRequestService) {
    var resultData = {};
    /* post方法获取数据 */
    resultData.costList = function (data) {
        var url = "/e-xlive/livemain/liveList.json";
        return ProxyRequestService.post(url, data, '');
    };
    resultData.costlive = function (data) {
        var url = "/e-xlive/livemain/enterLive.json";
        return ProxyRequestService.post(url, data, '');
    };

    // 点播聊天信息
    resultData.endMsg = function (data) {
        var url = "/e-xlive/livemain/chatList.json";
        return ProxyRequestService.post(url, data, '');
    };

    // 观众列表
    resultData.userList = function (data) {
        var url = "/e-xlive/livemain/liveUserList.json";
        return ProxyRequestService.post(url, data, '');
    };
    // 获取机构
    resultData.userOrg = function (data) {
        var url = "/E_project_base/authority/user/getUserInfoPageDetail";
        return ProxyRequestService.post(url, data, '');
    };

    // 提问列表
    resultData.questionList = function (data) {
        var url = "/e-xlive/livemain/askList.json";
        return ProxyRequestService.post(url, data, '');
    };

    // 头像
    resultData.iconUrl = function (data) {
        var url = "/E_project_base/authority/user/getUserDetailList.json";
        return ProxyRequestService.post(url, data, '');
    };
    return resultData;
});