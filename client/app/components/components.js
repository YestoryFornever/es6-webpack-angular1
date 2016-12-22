import angular from 'angular';
import Login from './login/login';
import Home from './home/home';
import Err from './error/error';
import Calculator from './calculator/calculator';
import Chatroom from './chatroom/chatroom';
import Bondquotation from './bondquotation/bondquotation';

let componentModule = angular.module('app.components', [
	Login,
	Home,
	Err,
	Calculator,
	Chatroom,
	Bondquotation
])
.name;

export default componentModule;
