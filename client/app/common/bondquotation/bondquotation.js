import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bondquotationComponent from './bondquotation.component';
import Acoupondetails from './acoupondetails/acoupondetails';

let bondquotationModule = angular.module('bondquotation', [
	uiRouter,
	Acoupondetails
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
