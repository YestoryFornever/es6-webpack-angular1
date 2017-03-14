import angular from 'angular';
import inputNumModule from './components/inputNum/inputNum';
import mutiSelectModule from './components/mutiSelect/mutiSelect';
import bondTrialModule from './components/bondTrial/bondTrial';

import alertModalModule from './components/alertModal/alertModal';
import alertModalService from './components/alertModal/alertModal.service';

import conntDownModule from './components/countDown/countDown';

import yldrtoFilter from './filters/yldrto.filter';
import numFilter from './filters/num.filter';
import numPointTwoFilter from './filters/numPointTwo.filter';
import numPointFourFilter from './filters/numPointFour.filter';
import addYearFilter from './filters/addYear.filter';
import arrReverse from './filters/arrReverse.filter';

import numChangeYiFilter from './filters/numChangeYi.filter';

import storageService from './services/storage.service';


let commonModule = angular.module('app.common', [
	inputNumModule,
	mutiSelectModule,
	bondTrialModule,
	alertModalModule,
	conntDownModule,

	yldrtoFilter,
	numFilter,
	numPointFourFilter,
	numPointTwoFilter,
	addYearFilter,
	numChangeYiFilter,
	arrReverse,
	
	storageService,
	alertModalService

])

.name;

export default commonModule;