class PageheaderController {
	constructor($state,pageheaderService) {
		this.$state = $state;
		this.pageheaderService = pageheaderService;
	}
	$onInit(){
		this.name = 'pageheader';
		this.tabs = [{
			routeState:"home.bondquotation",
			routeLabel:"债券报价",
			routeClass:"active",
		}];
	}
	logout(){
		let promise = this.pageheaderService.logout();
		promise.then((data)=>{
			console.log(data);
			if(data.data.status!=="0"){alert(data.data.msg);}
			this.$state.go('login');
		},(data)=>{
			console.warn("用户登录异常");
		});
	}
	addTab(nav) {
		// console.info(nav);
		this.tabs.forEach((item)=>{
			let arr = item.routeClass.split(" ");
			let index = arr.indexOf('active');
			if(index>-1){
				arr.splice(index,1);
			}
			item.routeClass = arr.join(" ");
			if(item.routeLabel===nav.rlabel){
				item.routeClass+=" active";
			}
		});
		let tmparr = [];
		for(let elem of this.tabs.values()){
			tmparr.push(elem.routeLabel);
		}
		if(!tmparr.includes(nav.rlabel)){
			this.tabs.push({
				routeState:nav.rstate,
				routeLabel:nav.rlabel,
				routeClass:(nav.rclass+" active")
			});
		}
		this.tabs.length>5 && this.tabs.shift();
	}
	deleteTab() {
		console.info('delete');
	}
}
PageheaderController.$inject = ['$state','pageheaderService'];
export default PageheaderController;
