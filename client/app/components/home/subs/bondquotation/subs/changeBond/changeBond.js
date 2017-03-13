import angular from 'angular';
import uiRouter from 'angular-ui-router';
import changeBondComponent from './changeBond.component';
import changeBondService from './changeBond.service';
let changeBondModule = angular.module('changeBond', [
	uiRouter,
	changeBondService
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.changeBond', {
			url: '/changeBond',
			views: {
				'main@home': {
					component: 'changeBond'
				},
			},
		})
})
.component('changeBond', changeBondComponent)

.name;

export default changeBondModule;
