import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';
import loginService from './login.service';

let loginModule = angular.module('login', [
	uiRouter,
	loginService
])

.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('login',{
			url:'/',
			component: 'login'
		})
})

.component('login', loginComponent)

.name;

export default loginModule;
