import angular from 'angular';
import uiRouter from 'angular-ui-router';
import friendslistComponent from './friendslist.component';
import friendslistService from './friendslist.service';
let friendslistModule = angular.module('friendslist', [
	uiRouter,
	friendslistService
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom.friendslist', {
			url: '/friend',
			views: {
				'list@home.chatroom': {
					component: 'friendslist'
				}
			}
		});
})
.component('friendslist', friendslistComponent)

.name;

export default friendslistModule;
