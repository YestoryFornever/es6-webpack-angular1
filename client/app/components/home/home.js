import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
	uiRouter,
])

.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home', {
			url: '/',
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
