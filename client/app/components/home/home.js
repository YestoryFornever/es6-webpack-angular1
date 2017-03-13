import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

import PageHeader from './subs/pageheader/pageheader';
import PageFooter from './subs/pagefooter/pagefooter';

import Calculator from './subs/calculator/calculator';
import Chatroom from './subs/chatroom/chatroom';
import Bondquotation from './subs/bondquotation/bondquotation';


let homeModule = angular.module('home', [
	uiRouter,
	PageHeader,
	PageFooter,

	Calculator,
	Chatroom,
	Bondquotation,

])

.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home', {
			url: '/home',
			views: {
				'': {
					component: 'home'
				},
				'header@home': {
					component: 'pageheader'
				},
				'main@home': {
					component: 'bondquotation'
				},
				'footer@home': {
					component: 'pagefooter'
				}
			}
		});
})

.component('home', homeComponent)

.name;

export default homeModule;
