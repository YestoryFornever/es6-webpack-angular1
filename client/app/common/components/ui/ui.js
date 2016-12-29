import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiComponent from './ui.component';

let uiModule = angular.module('ui', [
	uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.ui', {
			url: 'ui',
			views: {
				'main@home': {
					component: 'ui'
				}
			}
		});
})
.component('ui', uiComponent)

.name;

export default uiModule;
