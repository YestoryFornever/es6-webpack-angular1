import template from './message.html';
import controller from './message.controller.js';
import './message.scss';

let messageComponent = {
	restrict: 'E',
	bindings: {},
	template,
	controller
};

export default messageComponent;
