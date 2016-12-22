import angular from 'angular';
import uiRouter from 'angular-ui-router';
import chatroomComponent from './chatroom.component';

let chatroomModule = angular.module('chatroom', [
	uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom', {
			url: 'chatroom',
			views: {
				'main@home': {
					component: 'chatroom'
				}
			}
		});
})
.component('chatroom', chatroomComponent)

.name;

export default chatroomModule;
