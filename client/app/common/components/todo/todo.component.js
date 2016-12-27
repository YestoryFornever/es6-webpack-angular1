import template from './todo.html';
import controller from './todo.controller';
import './todo.scss';

let todoComponent = {
	restrict: 'E',
	bindings: {
		todo: '=',
	},
	template,
	controller
};

export default todoComponent;
