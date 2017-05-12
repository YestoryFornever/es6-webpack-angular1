/**
 * 验证信息错误显示
 * <input type="text" id="account" name="account" ng-model="$ctrl.account" validation-tooltip="$ctrl.validdationAccount($value)">
 *
 * In Controller:
 * $scope.$broadcast('account:error', '出错信息');
 * this.validdationAccount = function(value){
			if((_.trim(value)).length<=0){
				// return '用户名不能为空';
			}
		}
 */
app.directive('validationTooltip', function($parse, $q, $timeout){
	return {
		require : ['^?form', 'ngModel'],
		restrict: 'AE',
		replace: false,
		link: function(scope, element, attrs, ctrl) {
			var validationRule = $parse(attrs['validationTooltip']);
			var _form = ctrl[0];
			var _input = ctrl[1];

			var wrap = $('<div></div>');
			wrap.css({
				position: 'relative',
				display: 'inline',
			});
			var tip = $('<div class="alert alert-danger"></div>');
			tip.css({
				position: 'absolute',
				lineHeight: '.2rem',
				whiteSpace:'nowrap',
			});
			$(element).wrap(wrap);
			$(element).after(tip);

			function showTip(){
				tip.css({
					zIndex: (new Date()).getTime(),
					top: $(element).position().top+$(element).outerHeight(true),
					left: $(element).position().left+$(element).css('marginLeft')
				})
				tip.show();
				$timeout(function(){
					tip.hide();
				}, 5000);
			}
			/**
			 * 判断是否显示
			 * @return {[type]} [description]
			 */
			function _judge(){
				if ((_input.$dirty && _input.$error.customValidation)) {
					showTip();
				}else if(_form.$submitted && _input.$error.customValidation){
					showTip();
				}else{
					tip.hide();
				};
			}

			element.blur(function(){
				tip.hide();
			}).focus(function(){
				_judge();
			}).change(function(){
				_input.$setDirty(true);
			});

			scope.$watch(attrs.ngModel, function(){
				_judge();
			});

			var _oldSetSubmitted = _form.$setSubmitted;
			_form.$setSubmitted = function(b){
				_oldSetSubmitted(b);
				_judge();
			}

			scope.$on(attrs.name+':error', function(event, msg){
				tip.text(msg);
				showTip();
				_input.$setValidity('customValidation', false);
			});

			_input.$asyncValidators.customValidation = function(modelValue, viewValue){
				var deferred = $q.defer();
				$q.when().then(function(){
					return validationRule(scope, {$value: modelValue});
				}).then(function(msg){
					if (msg) {
						tip.text(msg);
						deferred.reject(msg);
					}else{
						deferred.resolve(msg);
					}
				}).catch(function(err){
					deferred.reject(err);
				});
				return deferred.promise;
			}
		}
	};
});