/*
* @Author: Administrator
* @Date:   2017-03-21 19:21:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-05 19:02:29
*/
/*
* 资讯详情
*/
app.factory('messagedetailService', function($http,$q,ProxyRequestService){
	// console.log(BONDCONFIG);
	return {

// 4.3.8获取资讯内容列表
infoContent(obj){
	return ProxyRequestService.post('e-xpress/sns/infoContent.json',{
				uid:obj.uid,
				info_id:obj.info_id,
				view_source:'2',
				flag:'1'
			});
		},
// 收藏功能
enshrine(obj){
return ProxyRequestService.post('e-xpress/sns/addFavorite.json',{
			act:obj.act,
			uid:obj.uid,
			p_type:'1',
			p_id:obj.p_id
				
			});
},
// 4.11.2同来源的最新资讯
infoListBySource(obj){
	return ProxyRequestService.post('e-xpress/sns/infoListBySource.json',{
			uid:obj.uid,
			soruce_id:obj.soruce_id
		
			});
},
// 4.11.3资讯的上下篇
infoUpDown(obj){
	return ProxyRequestService.post('e-xpress/sns/infoUpDown.json',{
			uid:obj.uid,
			info_id:obj.info_id
		
			});
},
// 获取评论列表
listComment(obj){
	return ProxyRequestService.post('e-xpress/sns/listComment.json',{
			uid:obj.uid,
			info_id:obj.info_id,
			type:'1',
			cur_page:'1'
			});
},
//发表评论
publishComment(obj){
return ProxyRequestService.post('e-xpress/sns/publishComment.json',{
			type:obj.type,
			info_id:obj.info_id,
			uid:obj.uid,
			content:obj.content,
			add_weibo:'1',
			visible_status:'1',
			// ats:[{}],
			comm_id:obj.comm_id
			});
},
//删除评论
deleteComment(obj){
return ProxyRequestService.post('e-xpress/sns/deleteComment.json',{
			cid:obj.cid,
			uid:obj.uid,

			});
},
// 4.4.1点赞、取消
likes(obj){
return ProxyRequestService.post('e-xpress/sns/likes.json',{
			act:obj.act,
			type:obj.type,
			uid:obj.uid,
			info_id:obj.info_id,
			uid:obj.uid
			});
},
}
});
