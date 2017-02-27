import angular from 'angular';
import uiRouter from 'angular-ui-router';
import backsystemComponent from './backsystem.component';
let backsystemModule = angular.module('backsystem', [
  uiRouter,

])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.backsystem', {
			url: 'backsystem',
			views: {
				'main@home': {
					component: 'backsystem'
				}
			}
		})
	
})
.component('backsystem', backsystemComponent)

.name;

export default backsystemModule;
