class SendAlertController {
	constructor() {
		this.name = 'sendAlert';
	}
	$onInit(){
		this.info = this.resolve.dataModal;

	}
	cancel() {
		this.info.onLine =false;
		this.info.friend =false;
		this.modalInstance.close(this.info);
	}
	ok() {
		this.modalInstance.close(this.info);
	}
}
