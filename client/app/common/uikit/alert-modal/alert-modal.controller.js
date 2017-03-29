class AlertModalController {
	constructor(netAlertModalService) {
		this.name = 'alertModal';
		this.netAlertModalService = netAlertModalService;
	}
	$onInit(){
		this.info = this.resolve.modalData ? this.resolve.modalData.itemInfo: {tittle:'',content:'操作成功'};
	}

	ok() {

		this.modalInstance.close();
	}
	// cancel() {
	// 	this.modalInstance.dismiss('cancel');

	// }
}
