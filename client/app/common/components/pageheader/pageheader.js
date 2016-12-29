import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pageheaderComponent from './pageheader.component';

let pageheaderModule = angular.module('pageheader', [
	uiRouter
])

.component('pageheader', pageheaderComponent)

.name;

export default pageheaderModule;
