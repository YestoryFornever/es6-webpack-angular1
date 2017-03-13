import angular from 'angular';

/**
 * 标签服务
 * @type {[type]}
 */
let pagetabService = angular.module('pagetabService', [])
.factory('pagetabService',['storageService','$q',function(storageService,$q){
	var _tabs = storageService.get('_nav_tabs_active');
	if(!_tabs){
		_tabs = [{
			routeState:"home.bondquotation",
			routeLabel:"债券报价",
			routeClass:"active",
		}];
	}
	return {
		_tabs: _tabs,
		activeTabKey: storageService.get('_nav_tabs_activeTabKey')||_tabs[0].activeTabKey,
		/**
		 * 激活TAB
		 * @param {Object} tab 
		 * @param {String} tab.tabKey 标签唯一索引，重名则视为同一标签
		 * @param {String} tab.routeLabel 
		 * @param {String} tab.routeState 
		 */
		activeTab: function(tab)
		{
			//如果存在同名需要替换成新的
			angular.forEach(this._tabs, function(item, i){
				if(item.tabKey == tab.tabKey){
					_tabs.splice(i, 1, tab);
				}
			});

			let index = this._tabs.indexOf(tab);
			if (index<0) {
				this._tabs.push(tab);
			}
			this.activeTabKey = tab.tabKey;
			
			storageService.set('_nav_tabs_active', this._tabs);
			storageService.set('_nav_tabs_activeTabKey', this.activeTabKey);

			// this._tabs.length>5 && this._tabs.shift();
		},
		/**
		 * 关闭TAB
		 * @param  {[type]}
		 * @return {[type]}
		 */
		closeTab: function(tab)
		{
			let index = this._tabs.indexOf(tab);
			if(index>=-1){
				this._tabs.splice(index,1);
			}
			storageService.set('_nav_tabs_active', this._tabs);
		}
	}
}]);

export default pagetabService.name;
