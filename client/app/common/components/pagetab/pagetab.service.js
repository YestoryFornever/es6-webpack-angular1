/**
 * 标签服务
 * @type {[type]}
 */
app.factory('pagetabService', ['storageService', '$q', '$state', function (storageService, $q, $state) {
    var tabs_save_name = '_nav_tabs';
    var _tabs = storageService.get(tabs_save_name);
    if (!_tabs) {
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
        activeTab: function (tab) {
            //如果存在同名需要替换成新的
            var index = _.findIndex(this._tabs, function(o) { return o.tabKey == tab.tabKey; });
            if(index>=0){
                var old = this._tabs[index];
                this._tabs[index] = _.defaults(tab, old);
            }else{
                this._tabs.push(tab);
            }
            this.activeTabKey = tab.tabKey;

            storageService.set(tabs_save_name, this._tabs);
            storageService.set('_nav_tabs_activeTabKey', this.activeTabKey);

            // this._tabs.length>5 && this._tabs.shift();
        },
        click: function(tab){
            this.activeTab(tab);
            if (tab.click) {
                tab.click();
            };
            if (tab.routeState) {
                $state.go(tab.routeState, tab.routeParams);
            }
        },
        /**
         * 关闭TAB
         * @param  {[type]}
         * @return {[type]}
         */
        closeTab: function (tabKey, $event) {
            $event.preventDefault();
            $event.stopPropagation();

            this.closeByKey(tabKey);
            
        },
        /**
         * 通过TABKEY关闭标签
         * @param  {[type]} tabKey [description]
         * @return {[type]}        [description]
         */
        closeByKey: function(tabKey){
            let index = _.findIndex(this._tabs, function(o) { return o.tabKey == tabKey; });
            this._tabs.splice(index, 1);
            // 关闭激活标签才需处理
            if (tabKey == this.activeTabKey) {
                let total = this._tabs.length;
                index = index == 0 ? 0 : index - 1; //将要激活的tab索引
                var _tab = this._tabs[index];
                if (_tab) {
                    if (_tab.routeState) {
                        $state.go(_tab.routeState, _tab.routeParams);
                    }
                    ;
                    this.activeTab(_tab);
                } else {
                    $state.go('home');
                }
            };
            storageService.set(tabs_save_name, this._tabs);
        }
    }
}]);

