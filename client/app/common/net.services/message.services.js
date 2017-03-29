/*
* @Author: Administrator
* @Date:   2017-03-21 19:59:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-21 20:10:14
*/
/*
* 资讯
*/

app.factory('messageService',['$http','$q','ProxyRequestService',function($http,$q ,ProxyRequestService){
	return {

// 4.3.1获取资讯推荐列表
recommendedlist(obj){
	return ProxyRequestService.post('e-xpress/sns/recomList.json',{
				uid:obj.uid,
				is_updown: '',
				data_type: '1',
				cur_page: '1',
				read_cnt: ''
			});
			
		},
qinfoList(obj) {//快讯
	return ProxyRequestService.post('e-xpress/sns/qinfoList.json',{
				uid:obj.uid,
				cur_page: '1',
				last_id: '0'
			});
			
		},
// 4.3.2获取3全部4负面 5自选 6自媒体列表
messagelist(obj) {
	return ProxyRequestService.post('e-xpress/sns/infoList.json',{
				uid:obj.uid,
				cur_page: '1',
				catagory:'',
			});
			
		},
// 收藏列表
collection(obj){
return ProxyRequestService.post('e-xpress/sns/listFavorite.json',{
				uid:obj.uid,
				cur_page: '1',
			});
},
// 搜索
searchInfoList(obj){
return ProxyRequestService.post('e-xpress/sns/searchInfoList.json',{
				uid:obj.uid,
				search:'',
				cur_page: '1',
			});
},
}
}]);
