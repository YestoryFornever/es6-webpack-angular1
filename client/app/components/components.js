import angular from 'angular';
import Login from './login/login';
import Home from './home/home';
import Err from './error/error';
import Calculator from './calculator/calculator';
import Chatroom from './chatroom/chatroom';
import Bondquotation from './bondquotation/bondquotation';
import Checkmarkfilter from '../common/filters/checkmark';
import Plusservice from '../common/services/plus';

let componentModule = angular.module('app.components', [
	Login,
	Home,
	Err,
	Calculator,
	Chatroom,
	Bondquotation,
	Checkmarkfilter,
	Plusservice
])
.name;

export default componentModule;
