class PageheaderController {
	constructor() {}
	$onInit(){
		this.name = 'pageheader';
		this.tabs = [{
			routeState:"home.bondquotation",
			routeLabel:"Õ®È¯±¨¼Û",
			routeClass:"",
		}];
	}
	addTab(nav) {
		// console.info(nav);
		let tmp = {
			routeState:nav.rstate,
			routeLabel:nav.rlabel,
			routeClass:nav.rclass
		};
		let tmparr = [];
		for(let elem of this.tabs.values()){
			tmparr.push(elem.routeLabel);
		}
		!tmparr.includes(tmp.routeLabel) &&	this.tabs.push(tmp);
		this.tabs.length>5 && this.tabs.shift(); 
	}
	deleteTab() {
		console.info('delete');
	}
}
export default PageheaderController;
