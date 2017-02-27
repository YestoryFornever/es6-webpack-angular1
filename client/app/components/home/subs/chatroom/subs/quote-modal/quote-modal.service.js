var BONDCONFIG = require('../../../../../../../bond.config.js');
import angular from 'angular';

let QuoteModalServiceModule = angular.module('quoteModalService', [])
.factory('quoteModalService',['$http','$q',function($http,$q){
	return {
		searchBonds(){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"ainas/web/queryListForBond",
				data: JSON.stringify({
					creditType:"",
					creditSymbol:"",
					dealDate:"2017-2-21",
					rateType:"",
					termType:"Y",
					termStart:"0",
					termEnd:"365",
					pageNum:"1",
					pageSize:"20",
					orderCol:"sbjRtg",
					orderDirect:"desc"
				}),
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
export default QuoteModalServiceModule;