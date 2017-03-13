import template from './quote-modal.html';
import controller from './quote-modal.controller';
import './quote-modal.scss';

let quoteModalComponent = {
	restrict: 'E',
	bindings: {
		modalInstance: "<",
		resolve: "<"
	},
	template,
	controller,
	controllerAs:'$instanceCtrl',
};

export default quoteModalComponent;
