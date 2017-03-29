/**
 * 存储服务
 * @type {[type]}
 */
app.factory('storageService',['$http','$q',function($http,$q){
	return {
		set: function(key, value)
		{
			value = JSON.stringify([value]);
			window.localStorage[key] = value;
		},

		get: function(key)
		{
			var value = window.localStorage[key];
			if (value) {
				value = JSON.parse(value);
			};
			
			return (value && value[0])?value[0]:null;
		}
	}
}]);
