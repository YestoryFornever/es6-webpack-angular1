import template from './bondTrial.html';
import controller from './bondTrial.controller';
import './bondTrial.scss';

let bondTrialComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
	},
	template,
	controller
};

export default bondTrialComponent;
