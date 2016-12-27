import angular from 'angular';

let getTabsServiceModule = angular.module('getTabsService', [])
.service('getTabsService',function(){
	this.tabs = [
			{
				routeState:'home',
				routeLabel:'Home',
				routeClass:'active'
			},
			{
				routeState:'home.bondquotation',
				routeLabel:'债券报价',
				routeClass:''
			},
			{
				routeState:'home.chatroom',
				routeLabel:'聊天室',
				routeClass:''
			},
			{
				routeState:'home.calculator',
				routeLabel:'计算器',
				routeClass:''
			}
		];
	this.getTabs = function() {
		return this.tabs;
	}
})
.name;

export default getTabsServiceModule;