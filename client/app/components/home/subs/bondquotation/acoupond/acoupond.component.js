import template from './acoupond.html';
import controller from './acoupond.controller';
import './acoupond.scss';

let acoupondComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	template,
	controller
};

export default acoupondComponent;
