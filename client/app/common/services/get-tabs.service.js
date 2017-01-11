import angular from 'angular';

let getTabsServiceModule = angular.module('getTabsService', [])
.service('getTabsService',function(){
	this.tabs = [
			/*{
				routeState:'home',
				routeLabel:'Home',
				routeClass:'active'
			},*/
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
			},
			{
				routeState:'home.ui',
				routeLabel:'material UI',
				routeClass:''
			},
			{
				routeState:'home.test',
				routeLabel:'测试页签',
				routeClass:''
			}
		];
	this.getTabs = function() {
		return this.tabs;
	}
})
.name;

export default getTabsServiceModule;