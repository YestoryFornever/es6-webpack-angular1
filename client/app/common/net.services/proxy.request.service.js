/**
 * 代理请求
 * @type {[type]}
 */
app.factory('ProxyRequestService', function($http, $q, userStatusService, alertTip) {

	return {
		_prefix: (function() {
			// return '/api';
			return window.Host;
		})(),
		get(url, params, header) {
			let deferred = $q.defer();
			$http({
				method: 'GET',
				url: this._prefix + url,
				params: params,
				headers: header || {
					lid: userStatusService.lid
				}
			}).then((response) => {
				if (response.data.status == 0) {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, (response) => {
				deferred.reject(response);
			}).finally();;

			return deferred.promise;
		},

		post(url, data, header) {
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: this._prefix + url,
				data: data,
				headers: header || {
					lid: userStatusService.lid
				}
			}).then((response) => {
				if (response.data.status == 0) {
					deferred.resolve(response);
				} else {
					var errorsCodes = ['990500'];
					if (errorsCodes.indexOf(response.data.status) >= 0) {
						// alertTip.error(response.data.msg);
						console.error('API Error:', response.data.msg, response);
					}
					deferred.reject(response);
				}
			}, (response) => {
				console.error('HTTP Error:', response.status, response.statusText, response.data);
				alertTip.error('网络异常，请重试！！！');
				deferred.reject(response);
			}).finally();

			return deferred.promise;
		},
		upImg(url, data, header) {
			let deferred = $q.defer();
			$http({
				method: 'POST',
				url: this._prefix + url,
				data: data,
				headers: header || {
					lid: userStatusService.lid,
					'Content-Type': undefined,
				},
				transformRequest: angular.identity
			}).then((response) => {
				if (response.data.status === "0") {
					deferred.resolve(response);
				} else {
					deferred.reject(response);
				}
			}, (response) => {
				deferred.reject(response);
			});
			return deferred.promise;
		}
	}
});