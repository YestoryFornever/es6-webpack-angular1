import angular from 'angular';
import uiRouter from 'angular-ui-router';
import MinebondComponent from './minebond.component';
import MinebondService from './minebond.service';

let MinebondModule = angular.module('minebond', [
	uiRouter,
	MinebondService
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.minebond', {
			url: '/minebond',
			views: {
				'main@home': {
					component: 'minebond'
				}
			}
		})
})
.component('minebond', MinebondComponent)

.name;

export default MinebondModule;
