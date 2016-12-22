import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import pageHeader from '../../common/pageheader/pageheader.component';
import pagePanel from '../../common/pagepanel/pagepanel.component';
import pageFooter from '../../common/pagefooter/pagefooter.component';

let homeModule = angular.module('home', [
	uiRouter,
])

.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'': {
					component: 'home'
				},
				'header@home': {
					component: 'header'
				},
				'main@home': {
					component: 'main'
				},
				'footer@home': {
					component: 'footer'
				}
			}
		})
		.state('home.a1', {
			url: 'a1',
			views: {
				'main@home': {
					component: 'footer'
				}
			}
		})
		.state('home.a2', {
			url: 'a2',
			views: {
				'main@home': {
					component: 'header'
				}
			}
		});
})

.component('home', homeComponent)
.component('header',pageHeader)
.component('main',pagePanel)
.component('footer',pageFooter)

.name;

export default homeModule;
