import angular from 'angular';
import PageHeader from './components/pageheader/pageheader';
import PageNav from './components/pagenav/pagenav';
import PageTab from './components/pagetab/pagetab';
import PageFooter from './components/pagefooter/pagefooter';

let commonModule = angular.module('app.common', [
	PageHeader,
	PageNav,
	PageTab,
	PageFooter
])

.name;

export default commonModule;