import angular from 'angular';
import uiRouter from 'angular-ui-router';
import inputNumComponent from './inputNum.component';

let inputNumModule = angular.module('inputNum', [
	uiRouter
])

.component('inputNum', inputNumComponent)

.name;

export default inputNumModule;
