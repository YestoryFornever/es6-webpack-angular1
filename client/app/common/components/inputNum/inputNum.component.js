import template from './inputNum.html';
import controller from './inputNum.controller';
import './inputNum.scss';

let inputNumComponent = {
	restrict: 'E',
	bindings: {
		place:'@',
		// ourName:'@',
		onGetValue:"&",
	},
	template,
	controller
};

export default inputNumComponent;
