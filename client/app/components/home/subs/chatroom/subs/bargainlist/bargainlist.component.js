import template from './bargainlist.html';
import controller from './bargainlist.controller';
import './bargainlist.scss';

let bargainlistComponent = {
	restrict: 'E',
	bindings: {
		friend:"=",
		changeFriend:'&'
	},
	template,
	controller
};

export default bargainlistComponent;
