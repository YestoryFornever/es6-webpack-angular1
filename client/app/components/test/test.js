import angular from 'angular';
import uiRouter from 'angular-ui-router';
import testComponent from './test.component';

let testModule = angular.module('test', [
	uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.test', {
			url: 'test',
			views: {
				'main@home': {
					component: 'test'
				}
			}
		})
		.state('home.ui.detail', {
			url: '/{id}',
			views: {
				'main@home': {
					component: 'ui'
				}
			}
		});
})
.component('test', testComponent)

.name;

export default testModule;
