import template from './nowBond.html';
import controller from './nowBond.controller';
import './nowBond.scss';

let nowBondComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<",
		isShow:"<",
	},
	template,
	controller,
	controllerAs:'$instanceCtrl',
};

export default nowBondComponent;
