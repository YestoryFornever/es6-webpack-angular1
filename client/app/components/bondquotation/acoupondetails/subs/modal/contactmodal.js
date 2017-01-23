import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contactmodalComponent from './contactmodal.component';

let contactmodalModule = angular.module('contactmodal', [
  uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.contactmodal', {
			url: 'contactmodal',
			views: {
				'main@home': {
					component: 'contactmodal'
				}
			}
		})
	
})
.component('contactmodal', contactmodalComponent)

.name;

export default contactmodalModule;