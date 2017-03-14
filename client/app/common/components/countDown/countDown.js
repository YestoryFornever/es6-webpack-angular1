import angular from 'angular';
import uiRouter from 'angular-ui-router';
import countDownComponent from './countDown.component';
import countDownService from './countDown.service';
let countDownModule = angular.module('countDown', [
	uiRouter,
	countDownService
])

.component('countDown', countDownComponent)

.name;

export default countDownModule;
