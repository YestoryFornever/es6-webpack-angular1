class PagetabController {
	constructor(tabs) {
		this.tabs = tabs;
		this.tabs2 = [
			{ title:'Dynamic Title 1', content:'Dynamic content 1' },
			{ title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
		]
		this.model = {
			name: 'Tabs'
		}
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
	alertMe(){
		setTimeout(function() {
			$window.alert('You\'ve selected the alert tab!');
		});
	}
}
PagetabController.$inject = ['getTabsService'];
export default PagetabController;
