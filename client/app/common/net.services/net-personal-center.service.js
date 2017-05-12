app.factory('netPersonalCenterService', function($http, $q, ProxyRequestService) {
    var resultData = {};
    //用户基本信息
    resultData.essentialService = function(data) {
        var url = "E_project_base/authority/user/getUserInfoPageDetail.json";
        return ProxyRequestService.post(url, data);
    };
    //修改用户基本信息 
    resultData.updateUserRealInfo = function(data) {
        var url = "E_project_base/authority/card/updateWebUserRealInfoV11.json";
        return ProxyRequestService.post(url, data);
    };
    //修改用户头像
    resultData.updateUserIcon = function(data) {
        var url = "E_project_base/authority/user/updateUserIcon.json";
        return ProxyRequestService.upImg(url, data);
    };
    //用户名和机构权限接口
    resultData.getWebFieldStatus = function(data) {
        var url = "E_project_base/authority/card/getWebFieldStatus";
        return ProxyRequestService.post(url, data);
    };
    //机构模糊查询接口
    resultData.getOrganizationList = function(data) {
        var url = "E_project_base/authority/getOrganizationList.json";
        return ProxyRequestService.post(url, data);
    };
    //修改用户的个人签名
    resultData.updateUserSignature = function(data) {
        var url = "E_project_base/authority/user/updateUserSignature.json";
        return ProxyRequestService.post(url, data);
    };
    //修改用户补充信息
    resultData.updateWebUserExtraInfo = function(data) {
        var url = "E_project_base/authority/user/updateWebUserExtraInfoV11";
        return ProxyRequestService.post(url, data);
    };
    //获取当前用户名片
    resultData.getUserBusinessCard = function(data) {
        var url = "E_project_base/authority/card/getUserBusinessCard.json";
        return ProxyRequestService.post(url, data);
    };
    //修改更新用户名片
    resultData.addUserBusinessCard = function(data) {
        var url = "E_project_base/authority/card/addUserBusinessCard.json";
        return ProxyRequestService.upImg(url, data);
    };
    //我要吐槽接口
    resultData.submitUserFeedback = function(data) {
        var url = "E_project_base/authority/submitUserFeedback.json";
        return ProxyRequestService.upImg(url, data);
    };
    //我的代言人 二维码 get
    resultData.getExtensionV11 = function(userid) {
        return ProxyRequestService._prefix + 'E_project_base/authority/verification/getExtensionV11?uid=' + userid;
    };
    //我的代言人 文案 
    resultData.getPLiterature = function(data) {
        var url = "E_project_base/authority/verification/getPLiterature.json";
        return ProxyRequestService.post(url, data);
    };
    //获取邀请记录
    resultData.InvitationRecord = function(data) {
        var url = "E_project_base/authority/InvitationRecord.json";
        return ProxyRequestService.post(url, data);
    };
    //我的金币
    resultData.mySummary = function(data) {
        var url = "goldcoin-web-server/coin/user/summary";
        return ProxyRequestService.post(url, data);
    };
    //金币记录
    resultData.golbDetails = function(data) {
        var url = "goldcoin-web-server/coin/user/details";
        return ProxyRequestService.post(url, data);
    };
    //金币记录
    resultData.golbExchangeList = function(data) {
        var url = "goldcoin-web-server/coin/goodsexchanges/list";
        return ProxyRequestService.post(url, data);
    };
    //金币轮播图
    resultData.golbBanner = function(data) {
        var url = "goldcoin-web-server/coin/configimage/banner";
        return ProxyRequestService.post(url, data);
    };
    //金币商城礼品列表
    resultData.golbGiftList = function(data) {
        var url = "goldcoin-web-server/coin/goodsonline/list";
        return ProxyRequestService.post(url, data);
    };
    //金币商城礼品兑换
    resultData.golbGiftchange = function(data) {
        var url = "goldcoin-web-server/coin/goodsexchanges/change";
        return ProxyRequestService.post(url, data);
    };
    //更多设置的隐私信息获取
    resultData.getPrivacySettingList = function(data) {
        var url = "E_project_base/authority/getPrivacySettingList.json";
        return ProxyRequestService.post(url, data);
    };
    //更新隐私设置
    resultData.updatePrivacySetting = function(data) {
        var url = "E_project_base/authority/updatePrivacySetting.json";
        return ProxyRequestService.post(url, data);
    };
    //更新密码
    resultData.updateLoginPassword = function(data) {
        var url = "E_project_base/authority/user/updateLoginPassword.json";
        return ProxyRequestService.post(url, data);
    };
    //获取当前用户名片
    resultData.getUserBusinessCard = function(data) {
        var url = "E_project_base/authority/card/getBusinessCardCertify.json";
        return ProxyRequestService.post(url, data);
    };
    //验证登录密码
    resultData.checkLoginPassword = function(data) {
        var url = "E_project_base/authority/user/checkLoginPassword.json";
        return ProxyRequestService.post(url, data);
    };
    //获取短信验证码
    resultData.smsExistGenerationV12 = function(data) {
        var url = "E_project_base/authority/verification/smsExistGenerationV12";
        return ProxyRequestService.post(url, data);
    };
    //获取注册手机号
    resultData.getLoginName = function(data) {
        var url = "E_project_base/authority/login/getLoginName.json";
        return ProxyRequestService.post(url, data);
    };
    //更新注册手机号
    resultData.updateLoginName = function(data) {
        var url = "E_project_base/authority/login/updateLoginName.json";
        return ProxyRequestService.post(url, data);
    };
    //部门模糊查询
    resultData.getDepartmentList = function(data) {
        var url = "E_project_base/authority/getDepartmentList.json";
        return ProxyRequestService.post(url, data);
    };
    return resultData;
});