import template from './countDown.html';
import controller from './countDown.controller';
import './countDown.scss';

let countDownComponent = {
	restrict: 'E',
	bindings: {
		format: '@',
		ctrl: '=',
	},
	template,
	controller
};

export default countDownComponent;

/**
 * <count-down format='mm:ss' ctrl="$ctrl.ctrl"></count-down>
 * ctrl.time = 5000 设置时间
 * ctrl.onZero = fn //为零时触发调用
 * ctrl.onStop = fn(time) //停止时触发，time为停止时的剩余时间
 * 
 * ctrl.stop() 停止
 * ctrl.start() 开始
 * ctrl.reduction() 还原
 */