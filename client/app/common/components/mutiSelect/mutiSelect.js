import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mutiSelectComponent from './mutiSelect.component';

let mutiSelectModule = angular.module('mutiSelect', [
	uiRouter
])

.component('mutiSelect', mutiSelectComponent)

.name;

export default mutiSelectModule;
