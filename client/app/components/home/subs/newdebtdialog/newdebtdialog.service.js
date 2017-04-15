
// app.factory('NewdebtdialogModalService', function($uibModal){
// 	return {
// 		open: function(item){
// 			return $uibModal.open({
// 				animation: true,
// 				component:'newdebtdialog',
// 				size: 'xl',//'lg',//'sm',
// 				resolve: {
// 					newdebtdialogModal:function(){
// 						item = item ? item :{};
// 						return item ;
// 					}
// 				}
// 			}).result.then(function (selectedItem) {});
// 		},
// 		// 4.5.1我要分销
// 		iWantDstr(obj) {
// 			return ProxyRequestService.post('e-bonddstr/bonddstr/iWantDstr', {
// 				userId: obj.userId,
// 				issuId: obj.issuId,
// 			});
// 		},
// 	}
// });