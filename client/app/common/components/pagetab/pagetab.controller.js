class PagetabController {
	constructor() {}
	$onInit(){
		this.name = 'pagetab';
	}
	setActive(tab){
		angular.forEach(this.tabs,function(item){
			let arr = item.routeClass.split(" ");
			let index = arr.indexOf('active');
			if(index>-1){
				arr.splice(index,1);
			}
			item.routeClass = arr.join(" ");
		});
		if(tab){
			tab.routeClass+=" active";
		}
	}
	/*$doCheck(){
		console.log(this.tabs);
	}
	$onChanges(){}
	$postLink(){}
	$onDestroy(){}*/
}
// PagetabController.$inject = ['getTabsService'];
export default PagetabController;
