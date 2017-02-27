import template from './mutiSelect.html';
import controller from './mutiSelect.controller';
import './mutiSelect.scss';

let mutiSelectComponent = {
	restrict: 'E',
	bindings: {
		place:'@?',
		sourceData:'<',
		source:'@',
	},
	template,
	controller
};

export default mutiSelectComponent;
