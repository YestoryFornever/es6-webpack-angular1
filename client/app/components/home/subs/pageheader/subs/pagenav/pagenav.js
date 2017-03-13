//import $ from '../../../jquery-vendor.js';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pagenavComponent from './pagenav.component';
import pagetabService from '../pagetab/pagetab.service';

let pagenavModule = angular.module('pagenav', [
	uiRouter,
	pagetabService
])

.component('pagenav', pagenavComponent)

.name;

export default pagenavModule;
