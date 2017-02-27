import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bondTrialComponent from './bondTrial.component';
import bondTrialService from './bondTrial.service';
let bondTrialModule = angular.module('bondTrial', [
	uiRouter,
	bondTrialService
])

.component('bondTrial', bondTrialComponent)

.name;

export default bondTrialModule;
