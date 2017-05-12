app.directive('alertTip', function($compile) {
	"ngInject";
	return {
		restrict: 'EA',
		replace: true,
		scope: {

		},
		templateUrl: './alert_tip.html',
		link: function(scope, element, attrs, ctrl) {
			$(element).css({
				position: 'absolute',
			})
		}
	}
});
app.factory('alertTip', function($timeout) {
	var tiphtml = '<div class="alert " role="alert"></div>';
	var bodywidth = $(window).width();

	function generateUi(type, msg, time) {
		var tip = $(tiphtml).html(msg).addClass(type);
		tip.hide().appendTo('body');
		tip.css({
			position: 'absolute',
			top: 100,
			// left: (bodywidth-tip.outerWidth())*0.5,
			zIndex: 9999,
		});
		tip.css({
			left: (bodywidth - tip.outerWidth()) * 0.5,
		}).show();
		$timeout(function() {
			tip.remove()
		}, time || 3000);
	}
	return {
		error: function(msg, time) {
			generateUi('alert-danger', msg, time);
		},
		info: function(msg, time) {
			generateUi('alert-info', msg, time);
		},
		success: function(msg, time) {
			generateUi('alert-success', msg, time);
		},
		warning: function(msg, time) {
			generateUi('alert-warning', msg, time);
		}
	}
});