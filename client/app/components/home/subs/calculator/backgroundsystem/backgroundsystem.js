import angular from 'angular';
import uiRouter from 'angular-ui-router';
import backgroundsystemComponent from './backgroundsystem.component';
import backgroundsystemService from './backgroundsystem.services';
let backgroundsystemModule = angular.module('backgroundsystem', [
  uiRouter,
  backgroundsystemService
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
