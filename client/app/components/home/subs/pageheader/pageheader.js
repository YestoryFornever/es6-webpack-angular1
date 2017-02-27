import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pageheaderComponent from './pageheader.component';

import PageNav from './subs/pagenav/pagenav';
import PageTab from './subs/pagetab/pagetab';
import pageheaderService from './pageheader.service';
import GetTabsService from '../../../../common/services/get-tabs.service';

let pageheaderModule = angular.module('pageheader', [
	uiRouter,

	PageNav,
	PageTab,
	pageheaderService,
	// GetTabsService,
])

.component('pageheader', pageheaderComponent)

.name;

export default pageheaderModule;
