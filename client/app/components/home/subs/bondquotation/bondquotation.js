import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bondquotationComponent from './bondquotation.component';
import bondquotationService from './bondquotation.service';

import acoupondetailsModule from './acoupondetails/acoupondetails';
// import acoupondetailsService from './acoupondetails.service';
// import Minebond from './minebond/minebond';


let bondquotationModule = angular.module('bondquotation', [
	uiRouter,
	bondquotationService,
	acoupondetailsModule
	// Minebond
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.bondquotation', {
			url: '/bondquotation',
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
