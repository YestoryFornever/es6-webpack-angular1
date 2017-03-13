import template from './changeBond.html';
import controller from './changeBond.controller';
import './changeBond.scss';

let changeBondComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
		// isShow:"<",
	},
	template,
	controller,
	controllerAs:'$instanceCtrl',
};

export default changeBondComponent;
