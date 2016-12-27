import template from './pagetab.html';
import controller from './pagetab.controller';
import './pagetab.scss';

let pagetabComponent = {
  restrict: 'E',
  bindings: {
  	test:'@'
  },
  template,
  controller
};

export default pagetabComponent;
