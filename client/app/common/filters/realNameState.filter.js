app.filter('realNameStateFilter', function() {
    return function(realNameState) {
        if (realNameState) {
            realNameState = realNameState == 3 ? '已认证' : realNameState;
            realNameState = realNameState == 1 ? '未认证' : realNameState;
            realNameState = realNameState == 2 ? '认证中' : realNameState;
            realNameState = realNameState == 4 ? '认证失败' : realNameState;
        }
        //realNameState = (realNameState=='3'? '已认证' : (realNameState=='1'? '未认证' :'未知'));
        return realNameState;
    };
});