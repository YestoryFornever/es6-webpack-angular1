import angular from 'angular';
import uiRouter from 'angular-ui-router';

import chatroomComponent from './chatroom.component';
import chatroomService from './chatroom.service';

import friendsModule from './subs/friendslist/friendslist';
import groupsModule from './subs/groupslist/groupslist';
import bargainlistModule from './subs/bargainlist/bargainlist';
import quoteModalModule from './subs/quote-modal/quote-modal';

let chatroomModule = angular.module('chatroom', [
	uiRouter,
	chatroomService,
	friendsModule,
	groupsModule,
	bargainlistModule,
	quoteModalModule
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom', {
			url: '/chatroom',
			views: {
				'main@home': {
					component: 'chatroom'
				},
				'list@home.chatroom': {
					component: 'bargainlist'
				}
			},
			onEnter:function(){
				console.log('enter');
			},
			onExit:function(){
				console.log('exit');
			}
		});
})
.component('chatroom', chatroomComponent)

.name;

export default chatroomModule;
