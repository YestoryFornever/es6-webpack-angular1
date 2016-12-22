import angular from 'angular';
import PageHeader from './pageheader/pageheader';
import PageNav from './pagenav/pagenav';
import PageTab from './pagetab/pagetab';
import PagePanel from './pagepanel/pagepanel';
import PageFooter from './pagefooter/pagefooter';

let commonModule = angular.module('app.common', [
	PageHeader,
	PageNav,
	PageTab,
	PagePanel,
	PageFooter
])

.name;

export default commonModule;