app.factory('netCastService', function ($http, $q) {
    var resultData = {};
    /* post方法获取数据 */
    resultData.costList = function (data) {
        var deferred = $q.defer();
        /* post方法获取数据 */
        var url = "https://11.177.15.104/e-xlive/livemain/liveList.json";
        $http.post(url, data).success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
            if (status == 401 || status == -1) {
                window.location.href = "#"
            }
            else {
                alert(status + " 错误");
            }
            return false;
        });
        return deferred.promise;
    };
    resultData.costlive = function (data) {
        var deferred = $q.defer();
        /* post方法获取数据 */
        var url = "https://11.177.15.104/e-xlive/livemain/enterLive.json";
        $http.post(url, data).success(function (data) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
            if (status == 401 || status == -1) {
                window.location.href = "#"
            }
            else {
                alert(status + " 错误");
            }
            return false;
        });
        return deferred.promise;
    };
    return resultData;
});