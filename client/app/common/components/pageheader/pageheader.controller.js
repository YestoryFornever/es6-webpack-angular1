class PageheaderController {
	constructor() {}
	$onInit(){
		this.name = 'pageheader';
		this.tabs = [{
			routeState:"home.bondquotation",
			routeLabel:"债券报价",
			routeClass:"active",
		}];
	}
	addTab(nav) {
		// console.info(nav);
		let tmp = {
			routeState:nav.rstate,
			routeLabel:nav.rlabel,
			routeClass:(nav.rclass+" active")
		};
		let tmparr = [];
		for(let elem of this.tabs.values()){
			tmparr.push(elem.routeLabel);
		}
		if(!tmparr.includes(tmp.routeLabel)){
			angular.forEach(this.tabs,function(item){
				let arr = item.routeClass.split(" ");
				let index = arr.indexOf('active');
				if(index>-1){
					arr.splice(index,1);
				}
				item.routeClass = arr.join(" ");
			});
			this.tabs.push(tmp);
		}		
		this.tabs.length>5 && this.tabs.shift();
	}
	deleteTab() {
		console.info('delete');
	}
}
export default PageheaderController;
