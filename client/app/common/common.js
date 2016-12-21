import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import PageHeader from './pageheader/pageheader';
import PageNav from './pagenav/pagenav';
import PagePanel from './pagepanel/pagepanel';
import PageFooter from './pagefooter/pagefooter';

let commonModule = angular.module('app.common', [
	Navbar,
	Hero,
	User,
	PageHeader,
	PageNav,
	PagePanel,
	PageFooter
])

.name;

export default commonModule;