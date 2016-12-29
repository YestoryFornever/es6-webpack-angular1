import angular from 'angular';
import PageHeader from './components/pageheader/pageheader';
import PageNav from './components/pagenav/pagenav';
import PageTab from './components/pagetab/pagetab';
import PageFooter from './components/pagefooter/pagefooter';
import Todo from './components/todo/todo';
import UI from './components/ui/ui';

import GetTabsService from './services/get-tabs.service';

let commonModule = angular.module('app.common', [
	PageHeader,
	PageNav,
	PageTab,
	PageFooter,
	Todo,
	GetTabsService,
	UI
])

.name;

export default commonModule;