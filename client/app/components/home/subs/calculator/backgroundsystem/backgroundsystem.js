import angular from 'angular';
import uiRouter from 'angular-ui-router';
import backgroundsystemComponent from './backgroundsystem.component';
let backgroundsystemModule = angular.module('backgroundsystem', [
  uiRouter,

])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.backgroundsystem', {
			url: 'backgroundsystem',
			views: {
				'main@home': {
					component: 'backgroundsystem'
				}
			}
		})
	
})
.component('backgroundsystem', backgroundsystemComponent)

.name;

export default backgroundsystemModule;
