class AlertModalController {
	constructor(AlertModalService) {
		this.name = 'alertModal';
		this.AlertModalService = AlertModalService;
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
AlertModalController.$inject = ['AlertModalService'];
export default AlertModalController;
