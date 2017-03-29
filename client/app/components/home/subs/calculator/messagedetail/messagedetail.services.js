app.factory('messagedetailService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {

// 4.3.8获取资讯内容列表
infoContent(obj){
			let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-xpress/sns/infoContent.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
		},
//发表评论
publishComment(obj){
	let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-xpress/sns/publishComment.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
			},
// 删除
deleteComment(obj){
			let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+'e-xpress/sns/deleteComment.json',
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
},
//赞
likes(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP() + 'e-xpress/sns/likes.json',
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response) => {
				// debugger;
				deferred.resolve(response);
			}, (response) => {
				// debugger;
				deferred.resolve(response);
			});
			return deferred.promise;
},
// 收藏功能
enshrine(obj){
let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-xpress/sns/addFavorite.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
},
// 4.11.2同来源的最新资讯
infoListBySource(obj){
let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-xpress/sns/infoListBySource.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
},
// 4.11.3资讯的上下篇
infoUpDown(obj){

	let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-xpress/sns/infoUpDown.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
},
// 获取评论列表
listComment(obj){
let deferred=$q.defer(); 
			$http({
					method:'POST',
					url:BONDCONFIG.getIP()+"e-xpress/sns/listComment.json",
					data: JSON.stringify(obj),
					headers: BONDCONFIG.JH,
				}).then((response)=>{
					// debugger;
					deferred.resolve(response);
				},(response)=>{
					// debugger;
					deferred.resolve(response);
				});
				return deferred.promise;
}
}
}]);
