/*
* @Author: 日历
* @Date:   2017-05-02 15:57:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-02 16:16:41
*/

app.factory('netCalendarService', function($http, $q, ProxyRequestService) {
    var resultData = {};
    //用户基本信息
   
    //修改用户基本信息 
   
    //获取短信验证码
    // resultData.smsExistGenerationV12 = function(data) {
    //     var url = "E_project_base/authority/verification/smsExistGenerationV12";
    //     return ProxyRequestService.post(url, data);
    // };
    //获取注册手机号
   
    //更新注册手机号
   
    //部门模糊查询
    // resultData.getDepartmentList = function(data) {
    //     var url = "E_project_base/authority/getDepartmentList.json";
    //     return ProxyRequestService.post(url, data);
    // };
    return resultData;
});