/**
 * 代理请求
 * @type {[type]}
 */
app.factory('ProxyRequestService', function($http,$q, userStatusService){

	return {
		_prefix: (function(){
			// return '/api';
			return window.Host;
		})(),
		get(url, params, header)
		{
			let deferred = $q.defer();
			$http({
				method: 'GET',
				url: this._prefix+url,
				params: params,
				headers: header||{
					lid: userStatusService.lid
				}
			}).then((response)=>{
				if(response.data.status==="0"){
					deferred.resolve(response);
				}else{
					deferred.reject(response);
				}
			},(response)=>{
				deferred.reject(response);
			});

			return deferred.promise;
		},

		post(url, data, header)
		{
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: this._prefix+url,
				data: data,
				headers: header||{
					lid: userStatusService.lid
				}
			}).then((response)=>{
				if(response.data.status==="0"){
					deferred.resolve(response);
				}else{
					deferred.reject(response);
				}
			},(response)=>{
				deferred.reject(response);
			});

			return deferred.promise;
		}
	}
});
