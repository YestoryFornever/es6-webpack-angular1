import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bargainlistComponent from './bargainlist.component';
import bargainlistService from './bargainlist.service';

let bargainlistModule = angular.module('bargainlist', [
	uiRouter,
	bargainlistService
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.chatroom.bargainlist', {
			url: '/bargain',
			views: {
				'list@home.chatroom': {
					component: 'bargainlist'
				}
			},
			cache:false
		});
})
.component('bargainlist', bargainlistComponent)

.name;

export default bargainlistModule;
