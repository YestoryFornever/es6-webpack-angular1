import angular from 'angular';
import uiRouter from 'angular-ui-router';
import bondquotationComponent from './bondquotation.component';
import bondquotationService from './bondquotation.service';

import acoupondetailsModule from './acoupondetails/acoupondetails';
import acoupondModule from './acoupond/acoupond';
import nowBondModule from '../nowBond/nowBond';
import changeBondModule from './subs/changeBond/changeBond';



let bondquotationModule = angular.module('bondquotation', [
	uiRouter,
	bondquotationService,
	acoupondetailsModule,
	acoupondModule,
	nowBondModule,
	changeBondModule
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.bondquotation', {
			url: '/bondquotation',
			views: {
				'main@home': {
					component: 'bondquotation'
				},
			},
		})
})
.component('bondquotation', bondquotationComponent)

.name;

export default bondquotationModule;
