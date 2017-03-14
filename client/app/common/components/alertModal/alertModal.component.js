import template from './alertModal.html';
import controller from './alertModal.controller';
import './alertModal.scss';

let alertModalComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	template,
	controller
};

export default alertModalComponent;
