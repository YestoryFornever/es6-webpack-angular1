//import $ from '../../../jquery-vendor.js';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pagenavComponent from './pagenav.component';

let pagenavModule = angular.module('pagenav', [
	uiRouter
])

.component('pagenav', pagenavComponent)

.name;

export default pagenavModule;
