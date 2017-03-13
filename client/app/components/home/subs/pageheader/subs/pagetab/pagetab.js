import $ from '../../../../../../../jquery-vendor.js';
import bootstrap from 'bootstrap';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pagetabComponent from './pagetab.component';
import pagetabService from './pagetab.service';

let pagetabModule = angular.module('pagetab', [
	uiRouter,
	pagetabService,
])

.component('pagetab', pagetabComponent)

.name;

export default pagetabModule;
