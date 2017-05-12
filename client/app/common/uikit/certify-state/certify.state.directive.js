/**
 * 根据认证权限值状态判断是否显示
 * @param  {[type]} ){	return {		restrict: 'AE',		link: function(scope, element, attrs, ctrl){		}	}} [description]
 * @return {[type]}            [description]
 */
app.directive('certifyState', function(userStatusService){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs, ctrl){
			if (userStatusService.realCertifyState!=attrs.certifyState) {
				$(element).remove();
			};
		}
	}
});