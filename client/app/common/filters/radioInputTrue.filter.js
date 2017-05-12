app.filter('radioInputTrueFilter', function() {
    return function(settingState) {
        if (settingState) {
            settingState = settingState == 2 ? false : settingState;
            settingState = settingState == 1 ? true  : settingState;
        }
        //realNameState = (realNameState=='3'? '已认证' : (realNameState=='1'? '未认证' :'未知'));
        return settingState;
    };
});  