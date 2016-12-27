import angular from 'angular';

let getTabsServiceModule = angular.module('getTabsService', [])
.service('getTabsService',function(){
	this.getTabs = function() {
		return [
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
	}
})
.name;

export default getTabsServiceModule;