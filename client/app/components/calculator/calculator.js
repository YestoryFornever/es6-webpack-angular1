import angular from 'angular';
import uiRouter from 'angular-ui-router';
import calculatorComponent from './calculator.component';

let calculatorModule = angular.module('calculator', [
	uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.calculator', {
			url: 'calculator',
			views: {
				'main@home': {
					component: 'calculator'
				}
			}
		});
})
.component('calculator', calculatorComponent)

.name;

export default calculatorModule;
