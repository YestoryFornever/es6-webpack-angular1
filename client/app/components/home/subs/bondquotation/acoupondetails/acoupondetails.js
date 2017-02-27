import angular from 'angular';
import uiRouter from 'angular-ui-router';
import acoupondetailsComponent from './acoupondetails.component';
import acoupondetailsServiceModule from './acoupondetails.service';
let acoupondetailsModule = angular.module('acoupondetails', [
  uiRouter,
acoupondetailsServiceModule
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.acoupondetails', {
			url: '/acoupondetails',
			views: {
				'main@home': {
					component: 'acoupondetails'
				}
			}
		})
	
})
.component('acoupondetails', acoupondetailsComponent)

.name;

export default acoupondetailsModule;
