import angular from 'angular';
import uiRouter from 'angular-ui-router';
import nowBondComponent from './nowBond.component';
import nowBondService from './nowBond.service';
let nowBondModule = angular.module('nowBond', [
	uiRouter,
	nowBondService
])

.component('nowBond', nowBondComponent)

.name;

export default nowBondModule;
