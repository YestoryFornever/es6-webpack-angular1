class PagetabController {

	constructor(pageheaderService,$state,$stateParams,$uibModal,$mdDialog, pagetabService) {
		this.$stateParams = $stateParams;
		this.$uibModal = $uibModal;
		this.$mdDialog = $mdDialog;
		this.pagetabService = pagetabService;
	}

	$onInit(){
		this.name = 'pagetab';
	}
	close(tab){
		console.log(tab);
		let index = this.bondDetail.indexOf(tab);
		if(index>=-1){
			this.bondDetail.splice(index,1);
		}
	}
	

	/*$doCheck(){
		console.log(this.tabs);
	}
	$onChanges(){}
	$postLink(){}
	$onDestroy(){}*/
}

PagetabController.$inject = ['pageheaderService','$state','$stateParams','$uibModal','$mdDialog', 'pagetabService'];

export default PagetabController;
