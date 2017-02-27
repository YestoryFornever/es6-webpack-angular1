import angular from 'angular';
import uiRouter from 'angular-ui-router';
import groupslistComponent from './groupslist.component';
import groupslistService from './groupslist.service';
let groupslistModule = angular.module('groupslist', [
	uiRouter,
	groupslistService
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom.groupslist', {
			url: '/group',
			views: {
				'list@home.chatroom': {
					component: 'groupslist'
				}
			}
		});
})
.component('groupslist', groupslistComponent)

.name;

export default groupslistModule;
