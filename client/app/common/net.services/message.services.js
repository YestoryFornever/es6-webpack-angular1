/*
 * @Author: Administrator
 * @Date:   2017-03-21 19:59:55
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-04-13 13:31:38
 */
/*
 * 资讯
 */

app.factory('messageService', function($http, $q, ProxyRequestService) {
	return {
		// 4.3.1获取资讯推荐列表
		recommendedlist(obj) {
			return ProxyRequestService.post('e-xpress/sns/recomList.json', {
				uid: obj.uid,
				is_updown: obj.is_updown,
				data_type: obj.data_type,
				cur_page: obj.cur_page,
				read_cnt: obj.read_cnt,
			});
		},
		// 4.3.1获取资讯推荐列表zhi摘要
		importantList(obj) { //快讯
			return ProxyRequestService.post('e-xpress/sns/importantList.json', {
				uid: obj.uid,
			});

		},
		qinfoList(obj) { //快讯
			return ProxyRequestService.post('e-xpress/sns/qinfoList.json', {
				uid: obj.uid,
				cur_page: obj.cur_page,
				last_id: '0'
			});

		},
		// 4.3.2获取3全部4负面 5自选 6自媒体列表
		messagelist(obj) {
			return ProxyRequestService.post('e-xpress/sns/infoList.json', {
				uid: obj.uid,
				cur_page: obj.cur_page,
				catagory: obj.catagory,
			});

		},
		// 日报
		dayInfoList(obj) {
			return ProxyRequestService.post('e-xpress/sns/dayInfoList.json', {
				uid: obj.uid,
				cur_page: obj.cur_page,
			});
		},
		// 收藏列表
		collection(obj) {
			return ProxyRequestService.post('e-xpress/sns/listFavorite.json', {
				uid: obj.uid,
				cur_page: obj.cur_page,
			});
		},
		// 搜索
		searchInfoList(obj) {
			return ProxyRequestService.post('e-xpress/sns/searchInfoList.json', {
				uid: obj.uid,
				search: obj.search,
				cur_page: obj.cur_page,
			});
		},
		/**
		 * 收藏数
		 * @param  {[type]} obj [description]
		 * @return {[type]}     [description]
		 */
		favoriteCnt(obj) {
			return ProxyRequestService.post('e-xpress/sns/favoriteCnt.json', {
				uid: obj.uid,
				type: '1',
			});

		},
	}
});