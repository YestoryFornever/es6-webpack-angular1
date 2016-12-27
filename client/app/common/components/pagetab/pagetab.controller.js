class PagetabController {
	constructor(tabs) {
		this.tabs = tabs;
	}
	$onInit(){
		this.name = 'pagetab';
		this.navs = this.tabs.getTabs();
	}
}
PagetabController.$inject = ['getTabsService'];
export default PagetabController;
