class PagetabController {
	constructor(tabs) {
		this.tabs = tabs;
	}
	$onInit(){
		this.name = 'pagetab';
		this.navs = this.tabs.getTabs();
	}
	$onChanges(){
		//
	}
	$postLink(){
		//
	}
	$onDestroy(){
		//
	}
}
PagetabController.$inject = ['getTabsService'];
export default PagetabController;
