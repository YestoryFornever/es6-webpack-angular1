import angular from 'angular';
import uiRouter from 'angular-ui-router';
import acoupondetailsComponent from './acoupondetails.component';
let acoupondetailsModule = angular.module('acoupondetails', [
  uiRouter,

])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.acoupondetails', {
			url: 'acoupondetails',
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
