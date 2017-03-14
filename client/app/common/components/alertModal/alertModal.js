import angular from 'angular';
import uiRouter from 'angular-ui-router';
import alertModalComponent from './alertModal.component';
import alertModalService from './alertModal.service';
let alertModalModule = angular.module('alertModal', [
	uiRouter,
	alertModalService
])

.component('alertModal', alertModalComponent)

.name;

export default alertModalModule;
