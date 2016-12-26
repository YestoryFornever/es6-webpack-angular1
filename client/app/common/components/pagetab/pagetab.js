import $ from '../../../../jquery-vendor.js';
import bootstrap from 'bootstrap';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pagetabComponent from './pagetab.component';

let pagetabModule = angular.module('pagetab', [
  uiRouter
])

.component('pagetab', pagetabComponent)

.name;

export default pagetabModule;
