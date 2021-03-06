app.factory('quoteModalService',['$http','$q',function($http,$q){
	return {
		queryQuoteList(){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondOfr/queryQuoteList",
				data: JSON.stringify({
					queryFlag:"B",
					ofrEStatus:"1"
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
}]);
