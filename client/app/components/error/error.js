import angular from 'angular';
import uiRouter from 'angular-ui-router';
import errorComponent from './error.component';

let errorModule = angular.module('error', [
	uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('error',{
			url:'/error',
			component: 'error'
		})
})
.component('error', errorComponent)

.name;

export default errorModule;
