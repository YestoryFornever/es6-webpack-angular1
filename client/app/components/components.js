import angular from 'angular';
import Login from './login/login';
import Home from './home/home';
import Err from './error/error';

import CheckmarkFilter from '../common/filters/checkmark.filter';
import PlusService from '../common/services/plus.service';

let componentModule = angular.module('app.components', [
	Login,
	Home,
	Err,

	CheckmarkFilter,
	PlusService
])
.name;

export default componentModule;
