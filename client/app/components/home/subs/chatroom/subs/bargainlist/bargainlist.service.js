app.factory('bargainlistService',['$http','$q',function($http,$q){
	return {
		queryBondNegtprcList(){
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: BONDCONFIG.getIP()+"e-bondquote/bondNegtprc/queryBondNegtprcList",
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
	}
}]);
