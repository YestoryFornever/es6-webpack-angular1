import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pagefooterComponent from './pagefooter.component';

let pagefooterModule = angular.module('pagefooter', [
  uiRouter
])

.component('pagefooter', pagefooterComponent)

.name;

export default pagefooterModule;
