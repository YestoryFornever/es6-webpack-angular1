import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bondquotationComponent from './bondquotation.component';

let bondquotationModule = angular.module('bondquotation', [
	uiRouter
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.bondquotation', {
			url: 'bondquotation',
			views: {
				'main@home': {
					component: 'bondquotation'
				}
			}
		})
})
.component('bondquotation', bondquotationComponent)

.name;

export default bondquotationModule;
