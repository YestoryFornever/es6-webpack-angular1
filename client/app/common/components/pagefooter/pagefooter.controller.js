class PagefooterController {
	constructor($http, $timeout) {
		this.$timeout = $timeout;
	}
	$onInit(){
		this.name = 'pagefooter';
		this.updateClock();
	}
	updateClock(){
		this.clock = new Date();
		this.$timeout(()=>{
			this.updateClock();
		},60000);
	}
}
PagefooterController.$inject = ['$http','$timeout'];
export default PagefooterController;
