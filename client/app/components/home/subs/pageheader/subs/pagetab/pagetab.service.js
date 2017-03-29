

/**
 * 标签服务
 * @type {[type]}
 */
app.factory('pagetabService',['storageService','$q', '$state', function(storageService,$q, $state){
	var _tabs = storageService.get('_nav_tabs_active');
	if(!_tabs){
		_tabs = [];
	}
	return {
		_tabs: _tabs,
		activeTabKey: storageService.get('_nav_tabs_activeTabKey'),
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
			if (tab.routeState) {
				$state.go(tab.routeState);
			};
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
		closeTab: function(tab, $event)
		{
			$event.preventDefault();
			$event.stopPropagation();

			let index = this._tabs.indexOf(tab);
			this._tabs.splice(index,1);
			// 关闭激活标签才需处理
			if (tab.tabKey==this.activeTabKey) {
				let total = this._tabs.length;
				index = index==0?0:index-1; //将要激活的tab索引
				var _tab = this._tabs[index]; 
				if (_tab) {
					if (_tab.routeState) {
						$state.go(_tab.routeState);
					};
					this.activeTab(_tab);
				}else{
					$state.go('home');
				}
			};
			storageService.set('_nav_tabs_active', this._tabs);
		}
	}
}]);

