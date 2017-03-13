import angular from 'angular';
import uiRouter from 'angular-ui-router';
import messageComponent from './message.component';
import messageService from './message.services';
let messageModule = angular.module('message', [
  uiRouter,
  messageService
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.message', {
			url: 'message',
			views: {
				'main@home': {
					component: 'message'
				}
			}
		})
	
})
.component('message', messageComponent)

.name;

export default messageModule;
