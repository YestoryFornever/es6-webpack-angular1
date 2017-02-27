var BONDCONFIG = require('../../../../../bond.config.js');
import angular from 'angular';

let chatroomServiceModule = angular.module('chatroomService', [])
.factory('chatroomService',['$http','$q',function($http,$q){
	// console.log(BONDCONFIG);
	return {
		getFriends(){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"E_project_base/authority/getFriendList",
				data: JSON.stringify({}),
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
		queryQuoteList(){
			// console.log(BONDCONFIG.JH);
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/queryNegtprcList",
				data: JSON.stringify({}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		addBatchBondQuote(quoteListChecked){//批量新增报价
			/*let quoteListChecked = [
				{"drc":"1","bondid":"19000","num":"1000000","yldrto":"0.43001","netprc":"84.115","wthrAnon":"1","wthrListg":"1","rmrk":""},
				{"drc":"1","bondid":"47056","num":"2000000","yldrto":"0.43001","netprc":"84.115","wthrAnon":"1","wthrListg":"1","rmrk":""},
				{"drc":"1","bondid":"1812","num":"3000000","yldrto":"0.43001","netprc":"84.115","wthrAnon":"1","wthrListg":"1","rmrk":""},
				{"drc":"1","bondid":"57701","num":"4000000","yldrto":"0.43001","netprc":"84.115","wthrAnon":"1","wthrListg":"1","rmrk":""}
			]*/
			// debugger;
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/addBatchBondQuote",
				data: JSON.stringify({
					'drc':'',
					'addList':quoteListChecked
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		queryBargainDetail(friend){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/queryNegtprcDtlList",
				data: JSON.stringify({
					'bondOfrid':friend.bondOfrid,
					'bondNegtprcid':friend.bondNegtprcid,
					'negtprcUserId':friend.userId
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		addBargainDetail(curBargainDetail){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/addNegtprcDetail",
				data: JSON.stringify({
					'bondOfrid':curBargainDetail.bondOfrid,//债券报价id
					'bondNegtprcid':curBargainDetail.bondNegtprcid,//债券议价id
					'negtprcUserId':curBargainDetail.userId,//议价用户
					'bondid':curBargainDetail.bondid,//债券id
					'yldrto':curBargainDetail.yield,//收益率
					'netprc':curBargainDetail.netprc,//净价
					'num':curBargainDetail.num,//数量
					'setamt':curBargainDetail.setamt,//结算金额
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		updateBargainState(curBargainDetail,state){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/updateNegtprcState",
				data: JSON.stringify({
					'bondOfrid':curBargainDetail.bondOfrid,//债券报价id
					'bondNegtprcid':curBargainDetail.bondNegtprcid,//债券议价id
					'negtprcUserId':curBargainDetail.userId,//议价用户
					'negtprcEStatus':state
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		getBargainHistory(userId){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/queryBondNegtprcDtlList",
				data: JSON.stringify({
					'negtprcUserId':userId,//议价用户
				}),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		test:function(){
			console.log(BONDCONFIG);
		}
	}
}])
.name;
export default chatroomServiceModule;