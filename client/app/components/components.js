import angular from 'angular';
import Login from './login/login';
import Home from './home/home';
import Err from './error/error';
import Calculator from './calculator/calculator';
import Chatroom from './chatroom/chatroom';
import Bondquotation from './bondquotation/bondquotation';
// import Acoupondetails from './bondquotation/acoupondetails/acoupondetails';

import CheckmarkFilter from '../common/filters/checkmark.filter';
import PlusService from '../common/services/plus.service';

let componentModule = angular.module('app.components', [
	Login,
	Home,
	Err,
	Calculator,
	Chatroom,
	Bondquotation,
	// Acoupondetails,
	

	CheckmarkFilter,
	PlusService
])
.name;

export default componentModule;
