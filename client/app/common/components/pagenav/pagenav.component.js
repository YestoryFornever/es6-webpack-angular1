import template from './pagenav.html';
import controller from './pagenav.controller';
import './pagenav.scss';

let pagenavComponent = {
	restrict: 'E',
	bindings: {
		nav:'<',
		onAddTab:'&'
	},
	template,
	controller
};

export default pagenavComponent;
