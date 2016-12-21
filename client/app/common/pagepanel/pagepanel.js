import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pagepanelComponent from './pagepanel.component';

let pagepanelModule = angular.module('pagepanel', [
  uiRouter
])

.component('pagepanel', pagepanelComponent)

.name;

export default pagepanelModule;
