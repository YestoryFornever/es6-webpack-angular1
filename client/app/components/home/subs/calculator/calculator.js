import angular from 'angular';
import uiRouter from 'angular-ui-router';
import calculatorComponent from './calculator.component';
import Backgroundsystem from './backgroundsystem/backgroundsystem';
import Backsystem from './backsystem/backsystem';
import Cashoffer from './cashoffer/cashoffer';

let calculatorModule = angular.module('calculator', [
	uiRouter,
	Backgroundsystem,
	Backsystem,
	Cashoffer

])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.calculator', {
			url: '/calculator',
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
