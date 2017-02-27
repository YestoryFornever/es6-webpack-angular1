import angular from 'angular';
import uiRouter from 'angular-ui-router';
import cashofferComponent from './cashoffer.component';
import cashofferService from './cashoffer.service';

let cashofferModule = angular.module('cashoffer', [
	uiRouter,
	cashofferService
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.cashoffer', {
			url: 'cashoffer',
			views: {
				'main@home': {
					component: 'cashoffer'
				}
			}
		});
})
.component('cashoffer', cashofferComponent)

.name;

export default cashofferModule;
