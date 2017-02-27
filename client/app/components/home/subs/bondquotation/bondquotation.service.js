var BONDCONFIG = require('../../../../../bond.config.js');
import angular from 'angular';

let bondquotationServiceModule = angular.module('bondquotationService', [])
.factory('bondquotationService',['$http','$q',function($http,$q){
	console.log(BONDCONFIG);
	return {
		// 获取报价列表
		queryQuoteList(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/queryQuoteList",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		//获取方案列表
		queryScmList(obj){
			console.log(obj)
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/queryScmList",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		//删除自选方案
		deleteScm(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/deleteScm",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 新增自选方案
		addScm(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondScm/addScm",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 债券搜索
		searchBondBreed(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/searchBondBreed",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				// console.l og(response)
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 获取详情
		queryBondBaseInfo(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/bond/queryBondBaseInfo",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		},
		// 更新报价状态
		updateQuoteState(obj){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/updateQuoteState",
				data: JSON.stringify(obj),
				headers: BONDCONFIG.JH,
			}).then((response)=>{
				deferred.resolve(response);
			},(response)=>{
				deferred.resolve(response);
			});
			return deferred.promise;
		}

	}
}])
.name;
export default bondquotationServiceModule;