// import 'normalize.css';
// import 'font-awesome/css/font-awesome.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'angular-material/angular-material.min.css';
// import '../resource/css/global.css';

// import angular from 'angular';
// import uiRouter from 'angular-ui-router';
// import 'angular-animate/angular-animate.min.js';
// import 'angular-aria/angular-aria.min.js';
// import ngMaterial from 'angular-material';
// import uiBootstrap from 'angular-ui-bootstrap';
// import uiSlimscroll from 'angular-slimscroll';
// import uiSelect from 'ui-select';
// import angularIscroll  from 'angular-iscroll';

// import Common from './common/common';
// import Components from './components/components';

// import AppComponent from './app.component';

// console.log(1);
window.app = angular.module('website', [
	'ui.router',
	'ui.router.state.events',
	'ngMaterial',
	'ui.bootstrap',
	'ui.select',
	'ui.slimscroll',
	'ngSanitize'
])
.config(($locationProvider, $urlRouterProvider, $stateProvider) => {
	// @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
	// #how-to-configure-your-server-to-work-with-html5mode
	// $locationProvider.html5Mode(true).hashPrefix('!');
	$urlRouterProvider.otherwise('/home/message/');
}).run(($rootScope, $state, userStatusService) =>{
	$rootScope.$state = $state;
	$rootScope.userStatusService = userStatusService;
	$rootScope.window = window;
	// $rootScope.CoAuth = CoAuth;
	// $rootScope.WindowInfo = WindowInfo;
});