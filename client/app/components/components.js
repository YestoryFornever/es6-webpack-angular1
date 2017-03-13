import angular from 'angular';
import Login from './login/login';
import Home from './home/home';
import Err from './error/error';

import CheckmarkFilter from '../common/filters/checkmark.filter';

// import NumFilter from '../common/filters/num.filter';

import yldrtoFilter from '../common/filters/yldrto.filter';
import numFilter from '../common/filters/num.filter';
import numPointTwoFilter from '../common/filters/numPointTwo.filter';
import numPointFourFilter from '../common/filters/numPointFour.filter';

import numChangeYiFilter from '../common/filters/numChangeYi.filter';


import PlusService from '../common/services/plus.service';

let componentModule = angular.module('app.components', [
	Login,
	Home,
	Err,

	numFilter,
	yldrtoFilter,
	numPointTwoFilter,
	numPointFourFilter,
	numChangeYiFilter,

	CheckmarkFilter,
	PlusService
])
.name;

export default componentModule;
