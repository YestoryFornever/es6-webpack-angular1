import angular from 'angular';
import inputNumModule from './components/inputNum/inputNum';
import mutiSelectModule from './components/mutiSelect/mutiSelect';
import bondTrialModule from './components/bondTrial/bondTrial';
let commonModule = angular.module('app.common', [
	inputNumModule,
	mutiSelectModule,
	bondTrialModule
])

.name;

export default commonModule;