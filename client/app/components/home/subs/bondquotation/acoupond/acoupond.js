import angular from 'angular';
import uiRouter from 'angular-ui-router';
import acoupondComponent from './acoupond.component';
import acoupondServiceModule from './acoupond.service';
let acoupondModule = angular.module('acoupond', [
  uiRouter,
acoupondServiceModule
])
.config(($stateProvider, $urlRouterProvider) => {
	"ngInject";

	$stateProvider
		.state('home.acoupond', {
			url: '/acoupond',
			views: {
				'main@home': {
					component: 'acoupond'
				}
			},
			// controller:function($stateParams){
   //              return ($stateParams.bondid)
   //          }

		})
	
})
.component('acoupond', acoupondComponent)

.name;

export default acoupondModule;
